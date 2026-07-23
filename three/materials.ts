import * as THREE from 'three'
import type { SceneKit } from './math'

export function createSceneKit(colorHex: string): SceneKit {
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

  return { mesh, skin, skinDark, eyeMat, humanMat, groundMat, disposables }
}
