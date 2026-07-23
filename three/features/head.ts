import * as THREE from 'three'
import type { DinoModelConfig } from '../../data/types'
import type { SceneKit } from '../math'

export function addHeadFeatures(
  kit: SceneKit,
  head: THREE.Group,
  c: DinoModelConfig,
  armored: boolean,
) {
  const { mesh, skin, skinDark, eyeMat } = kit
  const h = c.headSize
  const skull = mesh(new THREE.SphereGeometry(h * 0.42, 10, 8), skin)
  skull.scale.set(1.15, 0.85, 0.8)
  head.add(skull)
  let snoutLen = c.features?.frill ? h * 0.75 : h * (c.kind === 'sauropod' ? 0.5 : 0.85)
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
    const crest = mesh(new THREE.CylinderGeometry(h * 0.12, h * 0.2, h * 1.7, 10), skinDark)
    crest.position.set(-h * 0.5, h * 0.5, 0)
    crest.rotation.z = -2.3
    head.add(crest)
  }
  if (c.features?.crestBlade) {
    const crest = mesh(new THREE.ConeGeometry(h * 0.5, h * 1.3, 3), skinDark)
    crest.scale.z = 0.1
    crest.position.set(-h * 0.4, h * 0.35, 0)
    crest.rotation.z = -2.0
    head.add(crest)
  }
}
