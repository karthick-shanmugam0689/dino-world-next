import * as THREE from 'three'
import type { DinoModelConfig } from '../../data/types'
import type { SceneKit } from '../math'

export function addPlates(kit: SceneKit, dino: THREE.Group, c: DinoModelConfig, hipY: number) {
  const { mesh, skinDark } = kit
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

export function addSpikedBack(kit: SceneKit, dino: THREE.Group, c: DinoModelConfig, hipY: number) {
  const { mesh, skinDark } = kit
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
  for (const side of [1, -1]) {
    const sp = mesh(new THREE.ConeGeometry(c.bodyRadius * 0.13, c.bodyRadius * 1.4, 6), skinDark)
    sp.position.set(c.bodyLength * 0.22, hipY + c.bodyRadius * 0.3, side * c.bodyRadius * 0.6)
    sp.rotation.x = side * 1.2
    sp.rotation.z = 0.8
    dino.add(sp)
  }
}

export function addSail(kit: SceneKit, dino: THREE.Group, c: DinoModelConfig, hipY: number) {
  const { mesh, skinDark } = kit
  const sail = mesh(new THREE.CircleGeometry(1, 24, 0, Math.PI), skinDark)
  sail.scale.set(c.bodyLength * 0.42, c.bodyRadius * 1.5, 1)
  sail.position.set(-c.bodyLength * 0.02, hipY + c.bodyRadius * 0.55, 0)
  ;(sail.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide
  dino.add(sail)
}
