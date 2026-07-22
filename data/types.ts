export type SilhouetteKey =
  | 'trex'
  | 'raptor'
  | 'ceratops'
  | 'stego'
  | 'sauropod'
  | 'spino'
  | 'ankylo'
  | 'hadro'
  | 'mosasaur'
  | 'plesiosaur'
  | 'ptero'
  | 'therizino'

export interface DinoModelConfig {
  kind: 'theropod' | 'sauropod' | 'quadruped' | 'marine' | 'pterosaur'
  bodyLength: number
  bodyRadius: number
  neckLength: number
  neckRadius: number
  headSize: number
  tailLength: number
  /** legs (theropod/sauropod/quadruped); flipper length (marine); leg height (pterosaur) */
  legHeight: number
  /** leg/flipper thickness */
  legRadius: number
  /** resting pitch of the neck in radians (positive = raised) */
  neckAngle: number
  /** forelimb style for bipeds; quadrupeds/marine/pterosaur ignore this */
  arms?: 'none' | 'tiny' | 'normal' | 'long'
  /** quadrupeds only: front-leg length as a multiple of hind legs (brachiosaurids > 1) */
  frontLegScale?: number
  /** pterosaurs only: wingtip-to-wingtip span in meters, used for the wing geometry */
  wingSpan?: number
  features?: {
    plates?: boolean
    /** stegosaur variant: small plates over the shoulders, paired spikes over back + tail (Kentrosaurus) */
    spikedBack?: boolean
    horns?: boolean
    frill?: boolean
    frillSpikes?: boolean
    sail?: boolean
    crest?: boolean
    bill?: boolean
    longSnout?: boolean
    sickle?: boolean
    clubTail?: boolean
    armor?: boolean
    /** neck rises steeply and stays straight (giraffe/brachiosaurid) rather than curving */
    steepNeck?: boolean
    /** marine reptiles: shark-like downturned tail fluke instead of a tapering tip */
    tailFluke?: boolean
    /** pterosaurs: Pteranodon-style flattened backward-swept head crest */
    crestBlade?: boolean
    /** therizinosaurs: giant sickle claws on the hands instead of a small hand */
    giantClaws?: boolean
  }
}

export interface Family {
  id: string
  name: string
  description: string
  period: string
  traits: string[]
}

export interface Dino {
  id: string
  name: string
  meaning: string
  familyId: string
  silhouette: SilhouetteKey
  period: string
  diet: 'Carnivore' | 'Herbivore' | 'Piscivore'
  lengthM: number
  heightM: number
  weightKg: number
  speedKmh: number
  location: string
  description: string
  facts: string[]
  color: string
  featured?: boolean
  model: DinoModelConfig
  /** unset = a true dinosaur; set for famous "Mesozoic megafauna" often mistaken for one */
  clade?: 'marine-reptile' | 'pterosaur'
  /** pterosaurs only: wingtip-to-wingtip span in meters, shown as its own stat */
  wingSpanM?: number
}

export type PeriodId = 'triassic' | 'jurassic' | 'cretaceous'

export interface Period {
  id: PeriodId
  name: string
  range: string
  blurb: string
  color: string
  /** the famous dinos shown on the home-page timeline, in rough chronological order */
  highlights: string[]
}

// Reference images for each dinosaur, from Wikimedia Commons (what Wikipedia uses).
// `skeleton` = a real fossil mount / skeleton photo; `realistic` = an artist's life restoration.
// All are freely licensed (CC0 / public domain / CC BY / CC BY-SA); `source` links to the
// Commons file page (author + full license).
export interface DinoPhoto {
  image: string
  license: string
  source: string
}

export interface DinoPhotoSet {
  skeleton?: DinoPhoto
  realistic?: DinoPhoto
}
