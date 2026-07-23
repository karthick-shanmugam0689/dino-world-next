import * as THREE from 'three'
import type { DinoModelConfig } from '../../data/types'
import type { SceneKit } from '../math'

export function placeWings(
  kit: SceneKit,
  dino: THREE.Group,
  c: DinoModelConfig,
  hipY: number,
): THREE.Group[] {
  const { mesh, skin, disposables } = kit
  const wingPivots: THREE.Group[] = []
  if (c.kind !== 'pterosaur') return wingPivots

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
  return wingPivots
}
