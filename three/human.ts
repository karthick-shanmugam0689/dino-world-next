import * as THREE from 'three'
import type { SceneKit } from './math'

/** 1.8 m human figure for scale. */
export function buildHuman(kit: SceneKit): THREE.Group {
  const { mesh, humanMat } = kit
  const human = new THREE.Group()
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
  return human
}
