import * as THREE from 'three'
import type { DinoModelConfig } from '../../data/types'
import { hashPos, type SceneKit } from '../math'

export function buildArmoredBodyGeo(armored: boolean): THREE.SphereGeometry {
  const bodyGeo = new THREE.SphereGeometry(1, armored ? 11 : 14, armored ? 8 : 10)
  if (armored) {
    const pos = bodyGeo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = pos.getZ(i)
      const bump = y > -0.25 ? 1 + (hashPos(x, y, z) - 0.5) * 0.16 : 1
      pos.setXYZ(i, x * bump, y * bump, z * bump)
    }
  }
  return bodyGeo
}

export function addArmorDecor(
  kit: SceneKit,
  dino: THREE.Group,
  c: DinoModelConfig,
  hipY: number,
  bodyScaleX: number,
  bodyScaleY: number,
  bodyScaleZ: number,
) {
  const { mesh, skinDark } = kit
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
