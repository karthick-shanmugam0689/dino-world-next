import * as THREE from 'three'
import type { DinoModelConfig } from '../../data/types'
import type { SceneKit } from '../math'

export function placeLimbs(
  kit: SceneKit,
  dino: THREE.Group,
  c: DinoModelConfig,
  hipY: number,
  backLegH: number,
  frontLegH: number,
  shoulderLift: number,
  armored: boolean,
): { legGroups: THREE.Group[]; flipperGroups: THREE.Group[] } {
  const { mesh, skin, skinDark } = kit
  const legGroups: THREE.Group[] = []
  const flipperGroups: THREE.Group[] = []
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

  const addFlipper = (x: number, side: 1 | -1, pivotY: number, length: number, radius: number, phase: number) => {
    const pivot = new THREE.Group()
    pivot.position.set(x, pivotY, side * c.bodyRadius * 0.7)
    const paddle = mesh(new THREE.BoxGeometry(radius * 2.2, radius * 0.8, length), skin)
    paddle.position.z = side * length * 0.5
    pivot.add(paddle)
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
    addLeg(frontX, legZ, hipY + shoulderLift, frontLegH, c.legRadius, 0)
    addLeg(frontX, -legZ, hipY + shoulderLift, frontLegH, c.legRadius, Math.PI)
    addLeg(-frontX, legZ, hipY, backLegH, c.legRadius, Math.PI)
    addLeg(-frontX, -legZ, hipY, backLegH, c.legRadius, 0)
  }

  return { legGroups, flipperGroups }
}

/** Theropod forelimbs. */
export function placeArms(
  kit: SceneKit,
  dino: THREE.Group,
  c: DinoModelConfig,
  hipY: number,
): THREE.Group[] {
  const { mesh, skin, skinDark } = kit
  const armPivots: THREE.Group[] = []
  if (c.kind !== 'theropod' || c.arms === 'none') return armPivots

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
  return armPivots
}
