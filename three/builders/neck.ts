import * as THREE from 'three'
import type { DinoModelConfig } from '../../data/types'
import { NECK_SEGMENTS, type SceneKit } from '../math'
import { addHeadFeatures } from '../features/head'

export function buildNeckAndHead(
  kit: SceneKit,
  dino: THREE.Group,
  c: DinoModelConfig,
  hipY: number,
  shoulderLift: number,
  armored: boolean,
): { neckSegs: THREE.Group[]; head: THREE.Group; segLen: number } {
  const { mesh, skin } = kit
  const neckSegs: THREE.Group[] = []
  const segLen = c.neckLength / NECK_SEGMENTS
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

  const head = new THREE.Group()
  head.position.x = segLen
  neckSegs[NECK_SEGMENTS - 1].add(head)
  addHeadFeatures(kit, head, c, armored)

  return { neckSegs, head, segLen }
}
