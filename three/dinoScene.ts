import * as THREE from 'three'
import type { DinoModelConfig } from '../data/dinosaurs'

export interface DinoSceneHandle {
  dispose(): void
}

const NECK_SEGMENTS = 5
const TAIL_SEGMENTS = 6

/** Deterministic pseudo-random in [0,1) from a 3D position — keeps sphere seams crack-free. */
function hashPos(x: number, y: number, z: number) {
  const h = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453
  return h - Math.floor(h)
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

  // --- lights -------------------------------------------------------------
  scene.add(new THREE.HemisphereLight(0xbfd8c9, 0x2a2018, 1.1))
  const sun = new THREE.DirectionalLight(0xffe0b0, 2.2)
  sun.castShadow = true
  sun.shadow.mapSize.set(1024, 1024)
  scene.add(sun)

  // --- materials ----------------------------------------------------------
  const color = new THREE.Color(colorHex)
  const skin = new THREE.MeshStandardMaterial({ color, roughness: 0.85, flatShading: true })
  const skinDark = new THREE.MeshStandardMaterial({
    color: color.clone().multiplyScalar(0.62),
    roughness: 0.9,
    flatShading: true,
  })
  const eyeMat = new THREE.MeshStandardMaterial({ color: 0x14100c, roughness: 0.4 })
  const humanMat = new THREE.MeshStandardMaterial({ color: 0x39423d, roughness: 0.9, flatShading: true })
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x24301f, roughness: 1 })

  const disposables: Array<{ dispose(): void }> = [skin, skinDark, eyeMat, humanMat, groundMat]
  const geo = <T extends THREE.BufferGeometry>(g: T): T => {
    disposables.push(g)
    return g
  }
  const mesh = (g: THREE.BufferGeometry, m: THREE.Material, shadow = true) => {
    const me = new THREE.Mesh(geo(g), m)
    me.castShadow = shadow
    return me
  }

  // --- ground -------------------------------------------------------------
  const ground = new THREE.Mesh(geo(new THREE.CircleGeometry(80, 48)), groundMat)
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  // --- dinosaur -----------------------------------------------------------
  const c = config
  const armored = !!c.features?.armor
  const dino = new THREE.Group()
  scene.add(dino)

  // marine reptiles rest low, belly near the ground, rather than standing on legs
  const hipY = c.kind === 'marine' ? c.bodyRadius * 1.05 : c.legHeight + c.bodyRadius * 0.45

  // brachiosaurids stand on longer front legs, lifting the shoulders and neck base
  const backLegH = c.legHeight + c.bodyRadius * 0.3
  const frontLegScale = c.kind === 'sauropod' || c.kind === 'quadruped' ? c.frontLegScale ?? 1 : 1
  const frontLegH = backLegH * frontLegScale
  const shoulderLift = frontLegH - backLegH
  const shoulderTilt = Math.atan2(shoulderLift, c.bodyLength * 0.9)

  // armored dinos: low, wide body with a rocky displaced surface
  const bodyGeo = new THREE.SphereGeometry(1, armored ? 11 : 14, armored ? 8 : 10)
  if (armored) {
    const pos = bodyGeo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)
      // only roughen the upper shell — the belly stays smooth
      const bump = y > -0.25 ? 1 + (hashPos(x, y, z) - 0.5) * 0.16 : 1
      pos.setXYZ(i, x * bump, y * bump, z * bump)
    }
  }
  const bodyScaleX = c.bodyLength / 2
  const bodyScaleY = armored ? c.bodyRadius * 0.75 : c.bodyRadius
  const bodyScaleZ = armored ? c.bodyRadius * 1.12 : c.bodyRadius * 0.82
  const body = mesh(bodyGeo, skin)
  body.scale.set(bodyScaleX, bodyScaleY, bodyScaleZ)
  body.position.y = hipY + shoulderLift * 0.45
  body.rotation.z = shoulderTilt
  dino.add(body)

  // osteoderm studs + flank spikes for armored dinos
  if (armored) {
    const a = bodyScaleX * 0.99
    for (const theta of [0, 0.5, -0.5, 1.0, -1.0]) {
      for (let i = 0; i < 7; i++) {
        const u = THREE.MathUtils.lerp(-0.72, 0.72, i / 6)
        const rnd = hashPos(u, theta, 1)
        if (rnd > 0.88) continue
        const s = Math.sqrt(1 - u * u)
        const size = c.bodyRadius * (0.13 + rnd * 0.1)
        const stud = mesh(new THREE.ConeGeometry(size, size * 1.1, 4), skinDark)
        stud.position.set(
          a * u,
          hipY + bodyScaleY * s * Math.cos(theta) * 0.98,
          bodyScaleZ * s * Math.sin(theta) * 0.98,
        )
        stud.rotation.x = theta
        stud.rotation.y = rnd * Math.PI
        dino.add(stud)
      }
    }
    for (const side of [1, -1]) {
      for (const u of [-0.55, -0.18, 0.18, 0.55]) {
        const s = Math.sqrt(1 - u * u)
        const spike = mesh(new THREE.ConeGeometry(c.bodyRadius * 0.11, c.bodyRadius * 0.55, 5), skinDark)
        spike.position.set(a * u, hipY - bodyScaleY * 0.1, side * bodyScaleZ * s * 0.99)
        spike.rotation.x = side * 1.45
        dino.add(spike)
      }
    }
  }

  // legs — pivot groups at the hip/shoulder so they can swing
  const legGroups: THREE.Group[] = []
  const columnar = c.kind === 'sauropod'
  const addLeg = (x: number, z: number, pivotY: number, height: number, radius: number, phase: number) => {
    const pivot = new THREE.Group()
    pivot.position.set(x, pivotY, z)
    const thigh = mesh(
      new THREE.CylinderGeometry(radius * (columnar ? 1.15 : 1.35), radius * (columnar ? 1.0 : 0.85), height, 8),
      skin,
    )
    thigh.position.y = -height / 2
    pivot.add(thigh)
    const foot = mesh(new THREE.BoxGeometry(radius * 3.4, radius * 0.9, radius * 2.4), skinDark)
    foot.position.set(radius * 0.8, -height + radius * 0.4, 0)
    pivot.add(foot)
    if (c.features?.sickle) {
      const claw = mesh(new THREE.ConeGeometry(radius * 0.45, radius * 2.4, 6), skinDark)
      claw.position.set(radius * 2.3, -height + radius * 1.3, 0)
      claw.rotation.z = -0.45
      pivot.add(claw)
    }
    pivot.userData.phase = phase
    legGroups.push(pivot)
    dino.add(pivot)
  }

  // flippers — marine reptiles: flat paddles projecting sideways instead of legs
  const flipperGroups: THREE.Group[] = []
  const addFlipper = (x: number, side: 1 | -1, pivotY: number, length: number, radius: number, phase: number) => {
    const pivot = new THREE.Group()
    pivot.position.set(x, pivotY, side * c.bodyRadius * 0.7)
    const paddle = mesh(new THREE.BoxGeometry(radius * 2.2, radius * 0.8, length), skin)
    paddle.position.z = side * length * 0.5
    pivot.add(paddle)
    // droop the paddle downward at the tip; `side` compensates so both flippers droop the same way
    pivot.rotation.x = side * 0.35
    pivot.userData.phase = phase
    flipperGroups.push(pivot)
    dino.add(pivot)
  }

  const legZ = c.bodyRadius * (armored ? 0.8 : 0.55)
  if (c.kind === 'theropod' || c.kind === 'pterosaur') {
    addLeg(-c.bodyLength * 0.12, legZ, hipY, backLegH, c.legRadius, 0)
    addLeg(-c.bodyLength * 0.12, -legZ, hipY, backLegH, c.legRadius, Math.PI)
  } else if (c.kind === 'marine') {
    const frontLen = c.legHeight
    const rearLen = c.legHeight * 0.65
    addFlipper(c.bodyLength * 0.26, 1, hipY, frontLen, c.legRadius, 0)
    addFlipper(c.bodyLength * 0.26, -1, hipY, frontLen, c.legRadius, Math.PI)
    addFlipper(-c.bodyLength * 0.28, 1, hipY, rearLen, c.legRadius * 0.85, Math.PI)
    addFlipper(-c.bodyLength * 0.28, -1, hipY, rearLen, c.legRadius * 0.85, 0)
  } else {
    const frontX = c.bodyLength * 0.3
    // front legs are longer and pivot from the raised shoulder so feet still reach the ground
    addLeg(frontX, legZ, hipY + shoulderLift, frontLegH, c.legRadius, 0)
    addLeg(frontX, -legZ, hipY + shoulderLift, frontLegH, c.legRadius, Math.PI)
    addLeg(-frontX, legZ, hipY, backLegH, c.legRadius, Math.PI)
    addLeg(-frontX, -legZ, hipY, backLegH, c.legRadius, 0)
  }

  // arms — every biped gets jointed arms; length varies by group
  const armPivots: THREE.Group[] = []
  if (c.kind === 'theropod' && c.arms !== 'none') {
    const spec = {
      tiny: { len: 0.34, r: 0.07 },
      normal: { len: 0.6, r: 0.09 },
      long: { len: 0.85, r: 0.11 },
    }[c.arms ?? 'normal']
    const ua = c.bodyRadius * spec.len
    const ra = Math.max(c.bodyRadius * spec.r, 0.015)
    const fa = ua * 0.85
    for (const side of [1, -1]) {
      const shoulder = new THREE.Group()
      shoulder.position.set(c.bodyLength * 0.3, hipY + c.bodyRadius * 0.12, side * c.bodyRadius * 0.62)
      const upper = mesh(new THREE.CylinderGeometry(ra, ra * 0.8, ua, 6), skin)
      upper.position.y = -ua / 2
      shoulder.add(upper)
      const elbow = new THREE.Group()
      elbow.position.y = -ua
      const fore = mesh(new THREE.CylinderGeometry(ra * 0.8, ra * 0.6, fa, 6), skin)
      fore.position.y = -fa / 2
      elbow.add(fore)
      if (c.features?.giantClaws) {
        // therizinosaurs: three huge sickle claws fanning from the wrist instead of a small hand
        const clawLen = ua * 1.15
        for (const spread of [-0.32, 0, 0.32]) {
          const claw = mesh(new THREE.ConeGeometry(ra * 0.5, clawLen, 6), skinDark)
          claw.position.set(0, -fa - ra * 0.4, 0)
          claw.rotation.z = -0.85 + spread
          elbow.add(claw)
        }
      } else {
        const hand = mesh(new THREE.BoxGeometry(ra * 1.2, ra * 2.4, ra * 1.1), skinDark)
        hand.position.y = -fa - ra * 0.8
        hand.rotation.z = -0.35
        elbow.add(hand)
      }
      shoulder.add(elbow)
      shoulder.rotation.z = -0.35
      shoulder.rotation.x = side * -0.12
      elbow.rotation.z = 1.0
      shoulder.userData.phase = side > 0 ? Math.PI : 0
      armPivots.push(shoulder)
      dino.add(shoulder)
    }
  }

  // tail — chain of tapering segments
  const tailSegs: THREE.Group[] = []
  {
    let parent: THREE.Object3D = dino
    const segLen = c.tailLength / TAIL_SEGMENTS
    for (let i = 0; i < TAIL_SEGMENTS; i++) {
      const t = i / TAIL_SEGMENTS
      const r0 = THREE.MathUtils.lerp(c.bodyRadius * 0.7, c.bodyRadius * 0.06, t)
      const r1 = THREE.MathUtils.lerp(c.bodyRadius * 0.7, c.bodyRadius * 0.06, (i + 1) / TAIL_SEGMENTS)
      const seg = new THREE.Group()
      seg.position.x = i === 0 ? -c.bodyLength * 0.42 : -segLen
      seg.position.y = i === 0 ? hipY + c.bodyRadius * 0.1 : 0
      const m = mesh(new THREE.CylinderGeometry(r1, r0, segLen, 8), skin)
      m.rotation.z = Math.PI / 2
      m.position.x = -segLen / 2
      seg.add(m)
      seg.rotation.z = c.kind === 'quadruped' && !c.features?.clubTail ? -0.06 : 0.05
      parent.add(seg)
      parent = seg
      tailSegs.push(seg)
      // armored dinos: keep the studs going down the tail
      if (armored && i < TAIL_SEGMENTS - 2) {
        const stud = mesh(new THREE.ConeGeometry(r0 * 0.35, r0 * 0.7, 4), skinDark)
        stud.position.set(-segLen / 2, r0 * 0.8, 0)
        seg.add(stud)
      }
    }
    if (c.features?.clubTail) {
      const club = mesh(new THREE.SphereGeometry(c.bodyRadius * 0.45, 8, 6), skinDark)
      club.scale.set(1.3, 0.75, 1.45)
      club.position.x = -segLen
      parent.add(club)
    }
    if (c.features?.tailFluke) {
      // shark-like vertical fin: two flattened triangular lobes at the tail tip
      const flukeSize = c.bodyRadius * 0.9
      const upperLobe = mesh(new THREE.ConeGeometry(flukeSize * 0.55, flukeSize * 1.3, 4), skinDark)
      upperLobe.scale.z = 0.12
      upperLobe.position.set(-segLen * 0.4, flukeSize * 0.5, 0)
      parent.add(upperLobe)
      const lowerLobe = mesh(new THREE.ConeGeometry(flukeSize * 0.4, flukeSize * 0.9, 4), skinDark)
      lowerLobe.scale.z = 0.12
      lowerLobe.rotation.z = Math.PI
      lowerLobe.position.set(-segLen * 0.4, -flukeSize * 0.35, 0)
      parent.add(lowerLobe)
    }
    if (c.features?.plates || c.features?.spikedBack) {
      // thagomizer spikes on the last tail segment
      for (const [dx, rz] of [[-segLen * 0.4, 0.7], [-segLen * 0.9, 0.9]] as const) {
        for (const side of [1, -1]) {
          const spike = mesh(new THREE.ConeGeometry(c.bodyRadius * 0.09, c.bodyRadius * 0.85, 6), skinDark)
          spike.position.set(dx, c.bodyRadius * 0.15, side * c.bodyRadius * 0.18)
          spike.rotation.set(side * 0.5, 0, rz)
          parent.add(spike)
        }
      }
    }
  }

  // neck — chain of segments whose local +X runs along the neck
  const neckSegs: THREE.Group[] = []
  const segLen = c.neckLength / NECK_SEGMENTS
  {
    let parent: THREE.Object3D = dino
    for (let i = 0; i < NECK_SEGMENTS; i++) {
      const t = i / NECK_SEGMENTS
      const r0 = THREE.MathUtils.lerp(c.neckRadius, c.neckRadius * 0.55, t)
      const r1 = THREE.MathUtils.lerp(c.neckRadius, c.neckRadius * 0.55, (i + 1) / NECK_SEGMENTS)
      const segGroup = new THREE.Group()
      if (i === 0)
        segGroup.position.set(c.bodyLength * 0.4, hipY + c.bodyRadius * 0.35 + shoulderLift * 0.95, 0)
      else segGroup.position.x = segLen
      const m = mesh(new THREE.CylinderGeometry(r1, r0, segLen * 1.15, 8), skin)
      m.rotation.z = Math.PI / 2
      m.position.x = segLen / 2
      segGroup.add(m)
      parent.add(segGroup)
      parent = segGroup
      neckSegs.push(segGroup)
    }
  }

  // head, attached to the last neck segment
  const head = new THREE.Group()
  head.position.x = segLen
  neckSegs[NECK_SEGMENTS - 1].add(head)
  {
    const h = c.headSize
    const skull = mesh(new THREE.SphereGeometry(h * 0.42, 10, 8), skin)
    skull.scale.set(1.15, 0.85, 0.8)
    head.add(skull)
    let snoutLen = c.features?.frill ? h * 0.75 : h * (config.kind === 'sauropod' ? 0.5 : 0.85)
    if (c.features?.longSnout) snoutLen = h * 1.15
    const snoutH = c.features?.bill ? h * 0.24 : c.features?.longSnout ? h * 0.26 : h * 0.34
    const snoutW = c.features?.bill ? h * 0.56 : h * 0.4
    const snout = mesh(new THREE.BoxGeometry(snoutLen, snoutH, snoutW), skin)
    snout.position.set(h * 0.45, -h * 0.06, 0)
    head.add(snout)
    const jaw = mesh(new THREE.BoxGeometry(snoutLen * 0.8, h * 0.14, snoutW * 0.85), skinDark)
    jaw.position.set(h * 0.4, -h * 0.26, 0)
    jaw.rotation.z = 0.12
    head.add(jaw)
    for (const side of [1, -1]) {
      const eye = mesh(new THREE.SphereGeometry(h * 0.07, 8, 6), eyeMat, false)
      eye.position.set(h * 0.18, h * 0.14, side * h * 0.32)
      head.add(eye)
    }
    if (armored) {
      for (const side of [1, -1]) {
        const horn = mesh(new THREE.ConeGeometry(h * 0.1, h * 0.32, 5), skinDark)
        horn.position.set(-h * 0.15, h * 0.32, side * h * 0.3)
        horn.rotation.x = side * 0.7
        head.add(horn)
      }
    }
    if (c.features?.horns) {
      for (const side of [1, -1]) {
        const horn = mesh(new THREE.ConeGeometry(h * 0.08, h * 0.85, 6), skinDark)
        horn.position.set(h * 0.25, h * 0.4, side * h * 0.22)
        horn.rotation.z = -0.9
        head.add(horn)
      }
      const nose = mesh(new THREE.ConeGeometry(h * 0.07, h * 0.4, 6), skinDark)
      nose.position.set(h * 0.75, h * 0.18, 0)
      nose.rotation.z = -0.6
      head.add(nose)
    }
    if (c.features?.frill) {
      const frillRot = Math.PI / 2 - 0.5
      const frill = mesh(new THREE.CylinderGeometry(h * 0.75, h * 0.75, h * 0.1, 12), skinDark)
      frill.rotation.z = frillRot
      frill.position.set(-h * 0.35, h * 0.35, 0)
      frill.scale.z = 0.8
      head.add(frill)
      // ceratopsians get a parrot beak
      const beak = mesh(new THREE.ConeGeometry(h * 0.17, h * 0.42, 6), skinDark)
      beak.position.set(h * 0.95, -h * 0.1, 0)
      beak.rotation.z = -Math.PI / 2 - 0.3
      head.add(beak)
      if (c.features?.frillSpikes) {
        const axis = new THREE.Vector3(0, 1, 0).applyAxisAngle(new THREE.Vector3(0, 0, 1), frillRot)
        const v = new THREE.Vector3(0, 0, 1)
        const u = new THREE.Vector3().crossVectors(v, axis).normalize().negate()
        const up = new THREE.Vector3(0, 1, 0)
        for (const phi of [-1.5, -0.9, -0.3, 0.3, 0.9, 1.5]) {
          const dir = u
            .clone()
            .multiplyScalar(Math.cos(phi))
            .addScaledVector(v, Math.sin(phi))
            .normalize()
          const spike = mesh(new THREE.ConeGeometry(h * 0.07, h * 0.5, 5), skinDark)
          spike.quaternion.setFromUnitVectors(up, dir)
          spike.position.set(-h * 0.35, h * 0.35, 0).addScaledVector(dir, h * 0.78)
          head.add(spike)
        }
      }
    }
    if (c.features?.crest) {
      // thick, blunt-ended tube sweeping up and back (Parasaurolophus)
      const crest = mesh(new THREE.CylinderGeometry(h * 0.12, h * 0.2, h * 1.7, 10), skinDark)
      crest.position.set(-h * 0.5, h * 0.5, 0)
      crest.rotation.z = -2.3
      head.add(crest)
    }
    if (c.features?.crestBlade) {
      // flat, backward-swept bony blade (Pteranodon)
      const crest = mesh(new THREE.ConeGeometry(h * 0.5, h * 1.3, 3), skinDark)
      crest.scale.z = 0.1
      crest.position.set(-h * 0.4, h * 0.35, 0)
      crest.rotation.z = -2.0
      head.add(crest)
    }
  }

  // back features
  if (c.features?.plates) {
    const n = 7
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1)
      const size = Math.sin(t * Math.PI) * c.bodyRadius * 0.75 + c.bodyRadius * 0.2
      const plate = mesh(new THREE.ConeGeometry(size * 0.55, size, 4), skinDark)
      plate.scale.z = 0.22
      const x = THREE.MathUtils.lerp(c.bodyLength * 0.42, -c.bodyLength * 0.46, t)
      const spineY = hipY + Math.cos((x / (c.bodyLength / 2)) * 1.1) * c.bodyRadius * 0.95
      plate.position.set(x, spineY + size * 0.3, i % 2 === 0 ? 0.06 : -0.06)
      dino.add(plate)
    }
  }
  if (c.features?.spikedBack) {
    // small plates over the shoulders, transitioning to paired spikes over the back and hips
    const n = 7
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1)
      const x = THREE.MathUtils.lerp(c.bodyLength * 0.42, -c.bodyLength * 0.46, t)
      const spineY = hipY + Math.cos((x / (c.bodyLength / 2)) * 1.1) * c.bodyRadius * 0.95
      if (t < 0.4) {
        for (const side of [1, -1]) {
          const size = c.bodyRadius * 0.5
          const plate = mesh(new THREE.ConeGeometry(size * 0.5, size, 4), skinDark)
          plate.scale.z = 0.2
          plate.position.set(x, spineY + size * 0.15, side * c.bodyRadius * 0.16)
          plate.rotation.x = side * 0.35
          dino.add(plate)
        }
      } else {
        for (const side of [1, -1]) {
          const len = c.bodyRadius * (0.8 + t * 0.5)
          const spike = mesh(new THREE.ConeGeometry(c.bodyRadius * 0.1, len, 6), skinDark)
          spike.position.set(x, spineY, side * c.bodyRadius * 0.2)
          spike.rotation.x = side * 0.6
          spike.rotation.z = 0.15
          dino.add(spike)
        }
      }
    }
    // large paired shoulder spikes projecting back and outward
    for (const side of [1, -1]) {
      const sp = mesh(new THREE.ConeGeometry(c.bodyRadius * 0.13, c.bodyRadius * 1.4, 6), skinDark)
      sp.position.set(c.bodyLength * 0.22, hipY + c.bodyRadius * 0.3, side * c.bodyRadius * 0.6)
      sp.rotation.x = side * 1.2
      sp.rotation.z = 0.8
      dino.add(sp)
    }
  }
  if (c.features?.sail) {
    const sail = mesh(new THREE.CircleGeometry(1, 24, 0, Math.PI), skinDark)
    sail.scale.set(c.bodyLength * 0.42, c.bodyRadius * 1.5, 1)
    sail.position.set(-c.bodyLength * 0.02, hipY + c.bodyRadius * 0.55, 0)
    ;(sail.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide
    dino.add(sail)
  }

  // wings — pterosaurs: a bone spar plus a flat triangular membrane running from
  // the wingtip back to the hip, spread wide so the wingspan reads clearly next
  // to the human figure (the real headline stat for these animals).
  const wingPivots: THREE.Group[] = []
  if (c.kind === 'pterosaur') {
    const wingLen = (c.wingSpan ?? c.bodyLength * 3) / 2
    const shoulderX = c.bodyLength * 0.18
    const shoulderY = hipY + c.bodyRadius * 0.45
    const hipLocal = new THREE.Vector3(-c.bodyLength * 0.46, hipY - shoulderY, 0)
    for (const side of [1, -1] as const) {
      const shoulder = new THREE.Group()
      shoulder.position.set(shoulderX, shoulderY, side * c.bodyRadius * 0.55)
      const tip = new THREE.Vector3(-wingLen * 0.12, -wingLen * 0.16, side * wingLen)
      const spar = mesh(new THREE.CylinderGeometry(c.legRadius * 0.5, c.legRadius * 0.85, wingLen, 6), skin)
      spar.position.copy(tip).multiplyScalar(0.5)
      // orient the cylinder (default +Y axis) to run from the shoulder to the tip
      spar.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tip.clone().normalize())
      shoulder.add(spar)

      const membraneGeo = new THREE.BufferGeometry()
      const hip = new THREE.Vector3(hipLocal.x, hipLocal.y, side * c.bodyRadius * 0.4)
      const positions = new Float32Array([0, 0, 0, tip.x, tip.y, tip.z, hip.x, hip.y, hip.z])
      membraneGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      membraneGeo.setIndex(side > 0 ? [0, 1, 2] : [0, 2, 1])
      membraneGeo.computeVertexNormals()
      const membraneMat = new THREE.MeshStandardMaterial({
        color: skin.color.clone().multiplyScalar(0.9),
        roughness: 0.7,
        flatShading: true,
        side: THREE.DoubleSide,
      })
      disposables.push(membraneMat)
      const membrane = mesh(membraneGeo, membraneMat)
      shoulder.add(membrane)

      shoulder.userData.side = side
      wingPivots.push(shoulder)
      dino.add(shoulder)
    }
  }

  // rest pose for the neck. A steep neck (brachiosaurid) kicks up almost all its
  // angle at the base then runs straight, giraffe-like; otherwise the pitch is
  // spread evenly for a gentle curve.
  const steep = !!c.features?.steepNeck
  const neckBasePitch = neckSegs.map((_, i) =>
    steep ? (i === 0 ? c.neckAngle : c.neckAngle * 0.04) : c.neckAngle / NECK_SEGMENTS,
  )
  const neckTipAngle = neckBasePitch.reduce((a, b) => a + b, 0)
  // droop the head back toward level so the face looks forward, not straight up
  const headBaseDroop = steep ? -neckTipAngle * 0.72 : -c.neckAngle * 0.55
  neckSegs.forEach((s, i) => (s.rotation.z = neckBasePitch[i]))
  head.rotation.z = headBaseDroop

  // --- human for scale (1.8 m) ---------------------------------------------
  const human = new THREE.Group()
  {
    const torso = mesh(new THREE.CapsuleGeometry(0.16, 0.52, 4, 8), humanMat)
    torso.position.y = 1.16
    human.add(torso)
    const headM = mesh(new THREE.SphereGeometry(0.115, 10, 8), humanMat)
    headM.position.y = 1.68
    human.add(headM)
    for (const side of [1, -1]) {
      const leg = mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.85, 6), humanMat)
      leg.position.set(0, 0.43, side * 0.09)
      human.add(leg)
      const arm = mesh(new THREE.CylinderGeometry(0.045, 0.04, 0.6, 6), humanMat)
      arm.position.set(0, 1.12, side * 0.24)
      arm.rotation.x = side * 0.1
      human.add(arm)
    }
  }
  const wingReach = c.kind === 'pterosaur' ? (c.wingSpan ?? c.bodyLength * 3) / 2 : 0
  const dinoHalfLen = Math.max((c.bodyLength + c.tailLength + c.neckLength) / 2, wingReach)
  let humanX = Math.max(2.2, c.bodyLength * 0.55 + 1.2)
  let humanZ = Math.max(1.6, c.bodyRadius + 1.0)
  if (c.kind === 'pterosaur') humanZ = Math.max(humanZ, wingReach + 1.3)
  if (c.kind === 'marine') humanX = Math.max(humanX, c.bodyLength * 0.5 + c.legHeight + 1.4)
  human.position.set(humanX, 0, humanZ)
  scene.add(human)

  // --- camera framing -------------------------------------------------------
  const box = new THREE.Box3().setFromObject(dino)
  box.expandByObject(human)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const radius = Math.max(size.x, size.y * 1.6, size.z) * 0.62 + 1.5
  // pterosaurs spread their wingspan along Z; view from more head-on so it reads
  // across the screen instead of receding toward/away from the camera
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

  // --- interaction & animation ----------------------------------------------
  const pointer = { yaw: 0, pitch: 0, targetYaw: 0, targetPitch: 0 }
  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1
    // canvas faces the dino's right flank: mouse right = dino turns toward camera-right
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

    // walk-in-place + body bob
    for (const leg of legGroups) {
      leg.rotation.z = Math.sin(t * walkSpeed + (leg.userData.phase as number)) * walkAmp
    }
    for (const arm of armPivots) {
      arm.rotation.z = -0.35 + Math.sin(t * walkSpeed + (arm.userData.phase as number)) * 0.09
    }
    dino.position.y = Math.abs(Math.sin(t * walkSpeed)) * c.legHeight * 0.02
    body.rotation.x = Math.sin(t * walkSpeed) * 0.015

    // breathing
    const breathe = 1 + Math.sin(t * 1.4) * 0.012
    body.scale.set(bodyScaleX * breathe, bodyScaleY * breathe, bodyScaleZ * breathe)

    // tail sway
    tailSegs.forEach((seg, i) => {
      seg.rotation.y = Math.sin(t * 1.2 + i * 0.55) * 0.075
    })

    // flippers paddle gently side to side
    for (const flip of flipperGroups) {
      flip.rotation.y = Math.sin(t * 1.4 + (flip.userData.phase as number)) * 0.12
    }

    // wings hold their spread pose with a slow, gentle flap
    for (const wing of wingPivots) {
      const side = wing.userData.side as number
      wing.rotation.x = side * Math.sin(t * 1.1) * 0.14
    }

    // neck follows the pointer
    pointer.yaw += (pointer.targetYaw - pointer.yaw) * 0.07
    pointer.pitch += (pointer.targetPitch - pointer.pitch) * 0.07
    neckSegs.forEach((seg, i) => {
      seg.rotation.y = pointer.yaw / NECK_SEGMENTS
      seg.rotation.z = neckBasePitch[i] + pointer.pitch / NECK_SEGMENTS
    })
    head.rotation.y = pointer.yaw * 0.25
    head.rotation.z = headBaseDroop + pointer.pitch * 0.2 + Math.sin(t * 1.7) * 0.02

    // idle sway for the human so it feels alive too
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
