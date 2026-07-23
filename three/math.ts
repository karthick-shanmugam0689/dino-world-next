import * as THREE from 'three'

export const NECK_SEGMENTS = 5
export const TAIL_SEGMENTS = 6

/** Deterministic pseudo-random in [0,1) from a 3D position — keeps sphere seams crack-free. */
export function hashPos(x: number, y: number, z: number) {
  const h = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453
  return h - Math.floor(h)
}

export type MeshFn = (g: THREE.BufferGeometry, m: THREE.Material, shadow?: boolean) => THREE.Mesh

export interface SceneKit {
  mesh: MeshFn
  skin: THREE.MeshStandardMaterial
  skinDark: THREE.MeshStandardMaterial
  eyeMat: THREE.MeshStandardMaterial
  humanMat: THREE.MeshStandardMaterial
  groundMat: THREE.MeshStandardMaterial
  disposables: Array<{ dispose(): void }>
}
