import * as THREE from 'three'
import type { DinoModelConfig } from '../data/types'
import { NECK_SEGMENTS, type SceneKit } from './math'
import { createSceneKit } from './materials'
import { buildHuman } from './human'
import { addArmorDecor, buildArmoredBodyGeo } from './features/armor'
import { addPlates, addSail, addSpikedBack } from './features/plates'
import { placeArms, placeLimbs } from './builders/limbs'
import { buildTail } from './builders/tail'
import { buildNeckAndHead } from './builders/neck'
import { placeWings } from './builders/wings'

export interface DinoSceneHandle {
  dispose(): void
}

/**
 * Builds a stylized low-poly dinosaur from primitives, sized in meters,
 * next to a 1.8 m human for scale. The neck tracks the mouse pointer;
 * the legs run a walk-in-place cycle.
 */
export function createDinoScene(
  canvas: HTMLCanvasElement,
  config: DinoModelConfig,
  colorHex: string,
): DinoSceneHandle {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 300)

  scene.add(new THREE.HemisphereLight(0xbfd8c9, 0x2a2018, 1.1))
  const sun = new THREE.DirectionalLight(0xffe0b0, 2.2)
  sun.castShadow = true
  sun.shadow.mapSize.set(1024, 1024)
  scene.add(sun)

  const kit: SceneKit = createSceneKit(colorHex)
  const { mesh, skin, groundMat, disposables } = kit

  const ground = new THREE.Mesh(
    (() => {
      const g = new THREE.CircleGeometry(80, 48)
      disposables.push(g)
      return g
    })(),
    groundMat,
  )
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  const c = config
  const armored = !!c.features?.armor
  const dino = new THREE.Group()
  scene.add(dino)

  const hipY = c.kind === 'marine' ? c.bodyRadius * 1.05 : c.legHeight + c.bodyRadius * 0.45
  const backLegH = c.legHeight + c.bodyRadius * 0.3
  const frontLegScale = c.kind === 'sauropod' || c.kind === 'quadruped' ? c.frontLegScale ?? 1 : 1
  const frontLegH = backLegH * frontLegScale
  const shoulderLift = frontLegH - backLegH
  const shoulderTilt = Math.atan2(shoulderLift, c.bodyLength * 0.9)

  const bodyGeo = buildArmoredBodyGeo(armored)
  disposables.push(bodyGeo)
  const bodyScaleX = c.bodyLength / 2
  const bodyScaleY = armored ? c.bodyRadius * 0.75 : c.bodyRadius
  const bodyScaleZ = armored ? c.bodyRadius * 1.12 : c.bodyRadius * 0.82
  const body = mesh(bodyGeo, skin)
  body.scale.set(bodyScaleX, bodyScaleY, bodyScaleZ)
  body.position.y = hipY + shoulderLift * 0.45
  body.rotation.z = shoulderTilt
  dino.add(body)

  if (armored) {
    addArmorDecor(kit, dino, c, hipY, bodyScaleX, bodyScaleY, bodyScaleZ)
  }

  const { legGroups, flipperGroups } = placeLimbs(
    kit,
    dino,
    c,
    hipY,
    backLegH,
    frontLegH,
    shoulderLift,
    armored,
  )
  const armPivots = placeArms(kit, dino, c, hipY)
  const tailSegs = buildTail(kit, dino, c, hipY, armored)
  const { neckSegs, head } = buildNeckAndHead(kit, dino, c, hipY, shoulderLift, armored)

  if (c.features?.plates) addPlates(kit, dino, c, hipY)
  if (c.features?.spikedBack) addSpikedBack(kit, dino, c, hipY)
  if (c.features?.sail) addSail(kit, dino, c, hipY)

  const wingPivots = placeWings(kit, dino, c, hipY)

  const steep = !!c.features?.steepNeck
  const neckBasePitch = neckSegs.map((_, i) =>
    steep ? (i === 0 ? c.neckAngle : c.neckAngle * 0.04) : c.neckAngle / NECK_SEGMENTS,
  )
  const neckTipAngle = neckBasePitch.reduce((a, b) => a + b, 0)
  const headBaseDroop = steep ? -neckTipAngle * 0.72 : -c.neckAngle * 0.55
  neckSegs.forEach((s, i) => (s.rotation.z = neckBasePitch[i]))
  head.rotation.z = headBaseDroop

  const human = buildHuman(kit)
  const wingReach = c.kind === 'pterosaur' ? (c.wingSpan ?? c.bodyLength * 3) / 2 : 0
  const dinoHalfLen = Math.max((c.bodyLength + c.tailLength + c.neckLength) / 2, wingReach)
  let humanX = Math.max(2.2, c.bodyLength * 0.55 + 1.2)
  let humanZ = Math.max(1.6, c.bodyRadius + 1.0)
  if (c.kind === 'pterosaur') humanZ = Math.max(humanZ, wingReach + 1.3)
  if (c.kind === 'marine') humanX = Math.max(humanX, c.bodyLength * 0.5 + c.legHeight + 1.4)
  human.position.set(humanX, 0, humanZ)
  scene.add(human)

  const box = new THREE.Box3().setFromObject(dino)
  box.expandByObject(human)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const radius = Math.max(size.x, size.y * 1.6, size.z) * 0.62 + 1.5
  const camDir =
    c.kind === 'pterosaur'
      ? new THREE.Vector3(0.95, 0.3, 0.5).normalize()
      : new THREE.Vector3(0.55, 0.32, 1).normalize()
  camera.position.copy(center).addScaledVector(camDir, radius * 2.35)
  camera.lookAt(center.x, center.y * 0.9, center.z)
  sun.position.copy(center).add(new THREE.Vector3(-radius, radius * 2.2, radius * 1.4))
  sun.shadow.camera.left = -dinoHalfLen * 1.6
  sun.shadow.camera.right = dinoHalfLen * 1.6
  sun.shadow.camera.top = dinoHalfLen * 1.6
  sun.shadow.camera.bottom = -dinoHalfLen * 1.6
  sun.shadow.camera.far = radius * 8
  sun.target.position.copy(center)
  scene.add(sun.target)
  scene.fog = new THREE.Fog(0x101a16, radius * 4, radius * 12)

  const pointer = { yaw: 0, pitch: 0, targetYaw: 0, targetPitch: 0 }
  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
    pointer.targetYaw = THREE.MathUtils.clamp(-nx * 0.95, -1, 1)
    pointer.targetPitch = THREE.MathUtils.clamp(-ny * 0.6, -0.7, 0.7)
  }
  const onPointerLeave = () => {
    pointer.targetYaw = 0
    pointer.targetPitch = 0
  }
  window.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerleave', onPointerLeave)

  const resize = () => {
    const parent = canvas.parentElement
    if (!parent) return
    const w = parent.clientWidth
    const h = parent.clientHeight
    if (w === 0 || h === 0) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  if (canvas.parentElement) ro.observe(canvas.parentElement)
  resize()

  const clock = new THREE.Clock()
  const walkSpeed = c.kind === 'sauropod' ? 1.1 : c.kind === 'quadruped' ? 1.8 : 2.4
  const walkAmp = c.kind === 'sauropod' ? 0.14 : c.kind === 'quadruped' ? 0.22 : 0.32
  let raf = 0

  const animate = () => {
    raf = requestAnimationFrame(animate)
    const t = clock.getElapsedTime()

    for (const leg of legGroups) {
      leg.rotation.z = Math.sin(t * walkSpeed + (leg.userData.phase as number)) * walkAmp
    }
    for (const arm of armPivots) {
      arm.rotation.z = -0.35 + Math.sin(t * walkSpeed + (arm.userData.phase as number)) * 0.09
    }
    dino.position.y = Math.abs(Math.sin(t * walkSpeed)) * c.legHeight * 0.02
    body.rotation.x = Math.sin(t * walkSpeed) * 0.015

    const breathe = 1 + Math.sin(t * 1.4) * 0.012
    body.scale.set(bodyScaleX * breathe, bodyScaleY * breathe, bodyScaleZ * breathe)

    tailSegs.forEach((seg, i) => {
      seg.rotation.y = Math.sin(t * 1.2 + i * 0.55) * 0.075
    })

    for (const flip of flipperGroups) {
      flip.rotation.y = Math.sin(t * 1.4 + (flip.userData.phase as number)) * 0.12
    }

    for (const wing of wingPivots) {
      const side = wing.userData.side as number
      wing.rotation.x = side * Math.sin(t * 1.1) * 0.14
    }

    pointer.yaw += (pointer.targetYaw - pointer.yaw) * 0.07
    pointer.pitch += (pointer.targetPitch - pointer.pitch) * 0.07
    neckSegs.forEach((seg, i) => {
      seg.rotation.y = pointer.yaw / NECK_SEGMENTS
      seg.rotation.z = neckBasePitch[i] + pointer.pitch / NECK_SEGMENTS
    })
    head.rotation.y = pointer.yaw * 0.25
    head.rotation.z = headBaseDroop + pointer.pitch * 0.2 + Math.sin(t * 1.7) * 0.02

    human.rotation.y = Math.sin(t * 0.5) * 0.08

    renderer.render(scene, camera)
  }
  animate()

  return {
    dispose() {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      ro.disconnect()
      disposables.forEach((d) => d.dispose())
      renderer.dispose()
    },
  }
}
