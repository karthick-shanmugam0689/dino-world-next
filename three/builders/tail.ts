import * as THREE from 'three'
import type { DinoModelConfig } from '../../data/types'
import { TAIL_SEGMENTS, type SceneKit } from '../math'

export function buildTail(
  kit: SceneKit,
  dino: THREE.Group,
  c: DinoModelConfig,
  hipY: number,
  armored: boolean,
): THREE.Group[] {
  const { mesh, skin, skinDark } = kit
  const tailSegs: THREE.Group[] = []
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
    for (const [dx, rz] of [
      [-segLen * 0.4, 0.7],
      [-segLen * 0.9, 0.9],
    ] as const) {
      for (const side of [1, -1]) {
        const spike = mesh(new THREE.ConeGeometry(c.bodyRadius * 0.09, c.bodyRadius * 0.85, 6), skinDark)
        spike.position.set(dx, c.bodyRadius * 0.15, side * c.bodyRadius * 0.18)
        spike.rotation.set(side * 0.5, 0, rz)
        parent.add(spike)
      }
    }
  }
  return tailSegs
}
