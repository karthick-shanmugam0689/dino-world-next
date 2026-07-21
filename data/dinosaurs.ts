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

export const families: Family[] = [
  {
    id: 'tyrannosauridae',
    name: 'Tyrannosauridae',
    description:
      'The tyrant lizards — massive bipedal predators with enormous skulls, bone-crushing bites and famously tiny two-fingered arms. They ruled the food chains of the Late Cretaceous in North America and Asia.',
    period: 'Late Cretaceous',
    traits: ['Bipedal predators', 'Massive skulls', 'Tiny two-fingered arms', 'Bone-crushing bite'],
  },
  {
    id: 'dromaeosauridae',
    name: 'Dromaeosauridae',
    description:
      'The "running lizards", better known as raptors — small to mid-sized, fast, feathered hunters with a killer sickle claw on each foot and large brains for their size.',
    period: 'Cretaceous',
    traits: ['Feathered', 'Sickle-shaped toe claw', 'Fast and agile', 'Likely pack hunters'],
  },
  {
    id: 'ceratopsidae',
    name: 'Ceratopsidae',
    description:
      'Horned, frilled herbivores that roamed in vast herds. Their spectacular head ornaments were used for defense, display and recognizing their own kind.',
    period: 'Late Cretaceous',
    traits: ['Facial horns', 'Bony neck frill', 'Beaked mouth', 'Herding behaviour'],
  },
  {
    id: 'stegosauridae',
    name: 'Stegosauridae',
    description:
      'Plated herbivores carrying a double row of bony plates down the back and a spiked tail — the thagomizer — swung with surprising precision at attackers.',
    period: 'Late Jurassic',
    traits: ['Back plates', 'Spiked tail (thagomizer)', 'Small head', 'Slow browser'],
  },
  {
    id: 'brachiosauridae',
    name: 'Brachiosauridae',
    description:
      'Giraffe-like giants among the sauropods — front legs longer than the hind legs and necks held high, letting them browse treetops no other herbivore could reach.',
    period: 'Late Jurassic',
    traits: ['Longer front legs', 'Upright giraffe-like neck', 'Treetop browser', 'Among the largest land animals'],
  },
  {
    id: 'spinosauridae',
    name: 'Spinosauridae',
    description:
      'Crocodile-snouted predators at home in the water. Long jaws full of conical teeth for catching fish, and in Spinosaurus, a spectacular sail along the back.',
    period: 'Cretaceous',
    traits: ['Crocodile-like snout', 'Fish eaters', 'Semi-aquatic', 'Back sail or ridge'],
  },
  {
    id: 'ankylosauridae',
    name: 'Ankylosauridae',
    description:
      'Living fortresses — low, wide herbivores plated in bony armor from head to tail, finished off with a massive bone club that could break the legs of a tyrannosaur.',
    period: 'Late Cretaceous',
    traits: ['Full body armor', 'Tail club', 'Low and wide stance', 'Nearly predator-proof'],
  },
  {
    id: 'hadrosauridae',
    name: 'Hadrosauridae',
    description:
      'The duck-billed dinosaurs — social herbivores with broad beaks, batteries of hundreds of grinding teeth, and hollow head crests used as musical resonating chambers.',
    period: 'Late Cretaceous',
    traits: ['Duck-like bill', 'Hundreds of grinding teeth', 'Hollow crests for calls', 'Large herds'],
  },
  {
    id: 'coelophysidae',
    name: 'Coelophysidae',
    description:
      'The first wave of predatory dinosaurs — small, slender and hollow-boned, built for speed in a world still recovering from the greatest extinction of all time. Every later theropod, from Velociraptor to T. rex, descends from ancestors much like these.',
    period: 'Late Triassic',
    traits: ['Among the earliest theropods', 'Hollow, bird-like bones', 'Light and fast', 'Pack living'],
  },
  {
    id: 'plateosauridae',
    name: 'Plateosauridae',
    description:
      'Early long-necked plant eaters — the "prosauropods" — that pioneered the body plan the giant sauropods would later take to extremes. Still walking on two legs, they were the first dinosaurs to browse high vegetation.',
    period: 'Late Triassic',
    traits: ['First tall browsers', 'Long neck, bipedal stance', 'Ancestors of the giants', 'Huge thumb claws'],
  },
  {
    id: 'herrerasauridae',
    name: 'Herrerasauridae',
    description:
      'The oldest dinosaurs on Earth — primitive South American predators from the very dawn of the dinosaur age, so early and so strange that scientists spent decades debating whether they were true dinosaurs at all.',
    period: 'Late Triassic',
    traits: ['Among the first dinosaurs ever', 'Primitive predators', 'Double-hinged lower jaw', 'South American origins'],
  },
  {
    id: 'allosauridae',
    name: 'Allosauridae',
    description:
      'The lions of the Jurassic — big-game hunters with hatchet-like skulls, powerful three-clawed arms and an appetite for stegosaurs and young sauropods. For 10 million years, nothing on land was safer than an Allosaurus was hungry.',
    period: 'Late Jurassic',
    traits: ['Apex Jurassic predators', 'Hatchet-like skull', 'Strong three-fingered arms', 'Hunted giants'],
  },
  {
    id: 'therizinosauridae',
    name: 'Therizinosauridae',
    description:
      'One of the strangest dinosaur families ever found — feathered, pot-bellied theropods that gave up hunting for browsing leaves, keeping only their ancestors\' claws, now grown absurdly long. For decades, isolated claws were mistaken for those of a giant turtle.',
    period: 'Late Cretaceous',
    traits: ['True theropod dinosaur', 'Longest claws of any known animal', 'Herbivorous despite predator ancestry', 'Feathered body'],
  },
  {
    id: 'mosasauridae',
    name: 'Mosasauridae',
    description:
      'Giant marine lizards — not dinosaurs at all, but close relatives of today\'s monitor lizards and snakes. Mosasaurs ruled the Late Cretaceous oceans as apex predators, propelled by a shark-like tail fin and armed with a double-hinged jaw that could swallow prey almost whole.',
    period: 'Late Cretaceous',
    traits: ['Not a dinosaur — marine reptile', 'Shark-like tail fluke', 'Double-hinged jaw', 'Apex ocean predator'],
  },
  {
    id: 'plesiosauridae',
    name: 'Plesiosauridae',
    description:
      'Long-necked marine reptiles — not dinosaurs, but a separate lineage that returned to the sea while dinosaurs still ruled the land. Plesiosaurus, unearthed by Mary Anning in 1823, was one of the fossils that first convinced the world extinct monsters had truly existed.',
    period: 'Early Jurassic',
    traits: ['Not a dinosaur — marine reptile', 'Extremely long neck', 'Four large paddle-like flippers', 'First described by Mary Anning'],
  },
  {
    id: 'pteranodontidae',
    name: 'Pteranodontidae',
    description:
      'Toothless, crested pterosaurs — flying reptiles, not dinosaurs, and the closest thing the Cretaceous skies had to an albatross. Pteranodon patrolled the shores of the great inland sea that split North America in two, snatching fish from the surface as it soared.',
    period: 'Late Cretaceous',
    traits: ['Not a dinosaur — pterosaur', 'Toothless beak', 'Backward-swept head crest', 'Multi-meter wingspan'],
  },
  {
    id: 'azhdarchidae',
    name: 'Azhdarchidae',
    description:
      'Giant, long-necked pterosaurs — flying reptiles, not dinosaurs — that include the largest animals ever known to fly. Azhdarchids likely spent as much time stalking the ground on all fours as a giant stork as they did in the air, snapping up small prey with a long toothless beak.',
    period: 'Late Cretaceous',
    traits: ['Not a dinosaur — pterosaur', 'Largest known flying animals', 'Extremely long neck', 'Stalked prey on the ground'],
  },
]

export const dinosaurs: Dino[] = [
  {
    id: 'tyrannosaurus',
    name: 'Tyrannosaurus rex',
    meaning: 'Tyrant lizard king',
    familyId: 'tyrannosauridae',
    silhouette: 'trex',
    period: 'Late Cretaceous · 68–66 Mya',
    diet: 'Carnivore',
    lengthM: 12.3,
    heightM: 3.9,
    weightKg: 8800,
    speedKmh: 27,
    location: 'North America',
    description:
      'The most famous dinosaur of all. T. rex combined a five-foot skull, banana-sized serrated teeth and the strongest bite of any land animal ever — around 6 tons of force — with keen eyesight and a surprisingly large brain. Apex predator and, when convenient, an unapologetic scavenger.',
    facts: [
      'Its bite force of ~60,000 N is the strongest known of any land animal.',
      'Despite the memes, its arms could curl around 200 kg each.',
      'A T. rex reached full size in about 20 years.',
    ],
    color: '#c96a3b',
    featured: true,
    model: {
      kind: 'theropod',
      bodyLength: 6, bodyRadius: 1.5, neckLength: 1.6, neckRadius: 0.55,
      headSize: 1.5, tailLength: 5.5, legHeight: 2.6, legRadius: 0.42,
      neckAngle: 0.5, arms: 'tiny',
    },
  },
  {
    id: 'tarbosaurus',
    name: 'Tarbosaurus',
    meaning: 'Alarming lizard',
    familyId: 'tyrannosauridae',
    silhouette: 'trex',
    period: 'Late Cretaceous · 70 Mya',
    diet: 'Carnivore',
    lengthM: 10,
    heightM: 3.2,
    weightKg: 5000,
    speedKmh: 25,
    location: 'Mongolia',
    description:
      'Asia\'s answer to T. rex and its closest known relative. Tarbosaurus hunted the floodplains of the Gobi, preying on giant hadrosaurs and young sauropods with a skull built for slicing rather than pure crushing.',
    facts: [
      'Over 30 good specimens have been found in the Gobi Desert.',
      'Its arms were even smaller relative to its body than T. rex\'s.',
    ],
    color: '#b05c42',
    model: {
      kind: 'theropod',
      bodyLength: 5, bodyRadius: 1.25, neckLength: 1.4, neckRadius: 0.48,
      headSize: 1.3, tailLength: 4.6, legHeight: 2.2, legRadius: 0.36,
      neckAngle: 0.5, arms: 'tiny',
    },
  },
  {
    id: 'albertosaurus',
    name: 'Albertosaurus',
    meaning: 'Alberta lizard',
    familyId: 'tyrannosauridae',
    silhouette: 'trex',
    period: 'Late Cretaceous · 71 Mya',
    diet: 'Carnivore',
    lengthM: 9,
    heightM: 2.9,
    weightKg: 2500,
    speedKmh: 32,
    location: 'Canada',
    description:
      'A lighter, faster tyrannosaur from the north. A site in Alberta preserving over 20 individuals together suggests Albertosaurus may have hunted in packs — a terrifying thought for the hadrosaurs it chased.',
    facts: [
      'Possibly hunted in family groups — 26 individuals found at one site.',
      'Could likely outrun every other tyrannosaurid.',
    ],
    color: '#a8684f',
    model: {
      kind: 'theropod',
      bodyLength: 4.4, bodyRadius: 1.05, neckLength: 1.3, neckRadius: 0.4,
      headSize: 1.15, tailLength: 4.2, legHeight: 2.1, legRadius: 0.3,
      neckAngle: 0.5, arms: 'tiny',
    },
  },
  {
    id: 'velociraptor',
    name: 'Velociraptor',
    meaning: 'Swift thief',
    familyId: 'dromaeosauridae',
    silhouette: 'raptor',
    period: 'Late Cretaceous · 75–71 Mya',
    diet: 'Carnivore',
    lengthM: 2,
    heightM: 0.7,
    weightKg: 15,
    speedKmh: 60,
    location: 'Mongolia',
    description:
      'Smaller than the movies suggest — about the size of a turkey, and fully feathered — but every bit as sharp. Velociraptor used its famous sickle claw not to slash but to pin struggling prey, eating it alive like a modern eagle.',
    facts: [
      'A fossil preserves one locked in combat with a Protoceratops.',
      'Quill knobs on its arm bones prove it had feathers.',
      'It was about the size of a large turkey.',
    ],
    color: '#7fa15a',
    featured: true,
    model: {
      kind: 'theropod',
      bodyLength: 0.9, bodyRadius: 0.24, neckLength: 0.35, neckRadius: 0.09,
      headSize: 0.28, tailLength: 1.0, legHeight: 0.5, legRadius: 0.05,
      neckAngle: 0.7, arms: 'long', features: { sickle: true },
    },
  },
  {
    id: 'deinonychus',
    name: 'Deinonychus',
    meaning: 'Terrible claw',
    familyId: 'dromaeosauridae',
    silhouette: 'raptor',
    period: 'Early Cretaceous · 115–108 Mya',
    diet: 'Carnivore',
    lengthM: 3.4,
    heightM: 1.2,
    weightKg: 85,
    speedKmh: 50,
    location: 'North America',
    description:
      'The dinosaur that changed everything. Deinonychus was so obviously fast, agile and bird-like that it launched the "Dinosaur Renaissance" — the realization that dinosaurs were active, warm-blooded animals, not sluggish lizards.',
    facts: [
      'The raptors in Jurassic Park were actually modeled on Deinonychus.',
      'Its discovery in 1964 sparked the modern view of dinosaurs.',
    ],
    color: '#6d9161',
    model: {
      kind: 'theropod',
      bodyLength: 1.5, bodyRadius: 0.4, neckLength: 0.55, neckRadius: 0.15,
      headSize: 0.45, tailLength: 1.7, legHeight: 0.85, legRadius: 0.08,
      neckAngle: 0.7, arms: 'long', features: { sickle: true },
    },
  },
  {
    id: 'utahraptor',
    name: 'Utahraptor',
    meaning: 'Utah\'s predator',
    familyId: 'dromaeosauridae',
    silhouette: 'raptor',
    period: 'Early Cretaceous · 135–130 Mya',
    diet: 'Carnivore',
    lengthM: 5.5,
    heightM: 1.8,
    weightKg: 300,
    speedKmh: 40,
    location: 'USA (Utah)',
    description:
      'The raptor scaled up to nightmare size — as heavy as a polar bear, with 22 cm sickle claws. A single sandstone block from Utah contains a whole pack that apparently died together in quicksand while hunting.',
    facts: [
      'Its sickle claws reached 22 cm — the largest of any raptor.',
      'Described in 1993, the same year Jurassic Park premiered.',
    ],
    color: '#5f8a6b',
    model: {
      kind: 'theropod',
      bodyLength: 2.4, bodyRadius: 0.65, neckLength: 0.8, neckRadius: 0.24,
      headSize: 0.7, tailLength: 2.6, legHeight: 1.2, legRadius: 0.14,
      neckAngle: 0.6, arms: 'long', features: { sickle: true },
    },
  },
  {
    id: 'triceratops',
    name: 'Triceratops',
    meaning: 'Three-horned face',
    familyId: 'ceratopsidae',
    silhouette: 'ceratops',
    period: 'Late Cretaceous · 68–66 Mya',
    diet: 'Herbivore',
    lengthM: 9,
    heightM: 3,
    weightKg: 8000,
    speedKmh: 30,
    location: 'North America',
    description:
      'The rhinoceros of the Cretaceous, and T. rex\'s eternal sparring partner. Two meter-long brow horns and a solid bone frill made an adult Triceratops one of the few animals a tyrannosaur would think twice about — healed bite wounds on frills show some survived the encounter.',
    facts: [
      'Fossil frills show healed T. rex bite marks — some fights were survived.',
      'Its skull alone could be 2.5 meters long.',
      'It shed and regrew horn material throughout life.',
    ],
    color: '#8a7f4e',
    featured: true,
    model: {
      kind: 'quadruped',
      bodyLength: 4.6, bodyRadius: 1.5, neckLength: 1.0, neckRadius: 0.75,
      headSize: 1.5, tailLength: 2.6, legHeight: 1.7, legRadius: 0.36,
      neckAngle: 0.05, features: { horns: true, frill: true },
    },
  },
  {
    id: 'styracosaurus',
    name: 'Styracosaurus',
    meaning: 'Spiked lizard',
    familyId: 'ceratopsidae',
    silhouette: 'ceratops',
    period: 'Late Cretaceous · 75 Mya',
    diet: 'Herbivore',
    lengthM: 5.5,
    heightM: 1.8,
    weightKg: 2700,
    speedKmh: 32,
    location: 'Canada',
    description:
      'The punk rocker of the horned dinosaurs — a crown of four to six long spikes radiating from its frill, plus a 60 cm nose horn. The display was probably more about impressing rivals and mates than fighting.',
    facts: [
      'Its frill spikes could each reach over half a meter.',
      'Bonebeds suggest it moved in large herds.',
    ],
    color: '#98763f',
    model: {
      kind: 'quadruped',
      bodyLength: 2.9, bodyRadius: 0.95, neckLength: 0.7, neckRadius: 0.5,
      headSize: 1.05, tailLength: 1.7, legHeight: 1.05, legRadius: 0.24,
      neckAngle: 0.05, features: { horns: true, frill: true, frillSpikes: true },
    },
  },
  {
    id: 'stegosaurus',
    name: 'Stegosaurus',
    meaning: 'Roofed lizard',
    familyId: 'stegosauridae',
    silhouette: 'stego',
    period: 'Late Jurassic · 155–150 Mya',
    diet: 'Herbivore',
    lengthM: 9,
    heightM: 4,
    weightKg: 5000,
    speedKmh: 8,
    location: 'North America, Portugal',
    description:
      'Instantly recognizable by the seventeen bony plates along its back and the four-spiked tail it swung like a medieval mace. Its brain was famously the size of a walnut — yet Stegosaurus thrived for millions of years.',
    facts: [
      'An Allosaurus vertebra was found with a Stegosaurus spike wound in it.',
      'Its back plates may have flushed with blood to change color.',
      'The spiked tail has an official name: the thagomizer, from a Far Side cartoon.',
    ],
    color: '#5e8b7e',
    featured: true,
    model: {
      kind: 'quadruped',
      bodyLength: 4.4, bodyRadius: 1.4, neckLength: 1.1, neckRadius: 0.4,
      headSize: 0.6, tailLength: 3.2, legHeight: 1.6, legRadius: 0.32,
      neckAngle: -0.25, features: { plates: true },
    },
  },
  {
    id: 'kentrosaurus',
    name: 'Kentrosaurus',
    meaning: 'Sharp point lizard',
    familyId: 'stegosauridae',
    silhouette: 'stego',
    period: 'Late Jurassic · 152 Mya',
    diet: 'Herbivore',
    lengthM: 4.5,
    heightM: 1.8,
    weightKg: 1100,
    speedKmh: 9,
    location: 'Tanzania',
    description:
      'Stegosaurus\'s smaller African cousin traded plates for weaponry: from the hips back, its body bristled with long paired spikes, and its flexible tail could swing them through a 180-degree arc.',
    facts: [
      'Its tail could swing fast enough to shatter bone.',
      'Hundreds of bones were excavated at Tendaguru, Tanzania in the 1910s.',
    ],
    color: '#4f7d6b',
    model: {
      kind: 'quadruped',
      bodyLength: 2.3, bodyRadius: 0.7, neckLength: 0.7, neckRadius: 0.22,
      headSize: 0.35, tailLength: 1.9, legHeight: 0.85, legRadius: 0.16,
      neckAngle: -0.25, features: { spikedBack: true },
    },
  },
  {
    id: 'brachiosaurus',
    name: 'Brachiosaurus',
    meaning: 'Arm lizard',
    familyId: 'brachiosauridae',
    silhouette: 'sauropod',
    period: 'Late Jurassic · 154–150 Mya',
    diet: 'Herbivore',
    lengthM: 22,
    heightM: 12,
    weightKg: 40000,
    speedKmh: 10,
    location: 'North America',
    description:
      'A four-story building on legs. With front legs longer than its hind legs and a neck raised like a giraffe\'s, Brachiosaurus browsed treetops 12 meters up. An adult had essentially nothing to fear — predators simply gave up.',
    facts: [
      'It could reach vegetation four stories off the ground.',
      'It ate up to 400 kg of plants every day.',
      'Its nostrils sat on a bony arch on top of its head.',
    ],
    color: '#7d94b5',
    featured: true,
    model: {
      kind: 'sauropod',
      bodyLength: 8, bodyRadius: 2.4, neckLength: 8.5, neckRadius: 0.8,
      headSize: 1.1, tailLength: 6, legHeight: 3.6, legRadius: 0.6,
      neckAngle: 1.15, frontLegScale: 1.5, features: { steepNeck: true },
    },
  },
  {
    id: 'giraffatitan',
    name: 'Giraffatitan',
    meaning: 'Titanic giraffe',
    familyId: 'brachiosauridae',
    silhouette: 'sauropod',
    period: 'Late Jurassic · 150–145 Mya',
    diet: 'Herbivore',
    lengthM: 23,
    heightM: 13,
    weightKg: 34000,
    speedKmh: 10,
    location: 'Tanzania',
    description:
      'For almost a century the famous mounted skeleton in Berlin was labeled Brachiosaurus — it\'s actually this African giant. At 13 meters tall, its mounted skeleton is still the tallest in any museum in the world.',
    facts: [
      'Its Berlin skeleton holds the Guinness record for tallest mounted dinosaur.',
      'It was considered a species of Brachiosaurus until 2009.',
    ],
    color: '#6f87a8',
    model: {
      kind: 'sauropod',
      bodyLength: 8.4, bodyRadius: 2.4, neckLength: 9, neckRadius: 0.8,
      headSize: 1.1, tailLength: 6.2, legHeight: 3.7, legRadius: 0.6,
      neckAngle: 1.2, frontLegScale: 1.55, features: { steepNeck: true },
    },
  },
  {
    id: 'spinosaurus',
    name: 'Spinosaurus',
    meaning: 'Spine lizard',
    familyId: 'spinosauridae',
    silhouette: 'spino',
    period: 'Late Cretaceous · 99–93 Mya',
    diet: 'Piscivore',
    lengthM: 15,
    heightM: 4.4,
    weightKg: 7500,
    speedKmh: 20,
    location: 'North Africa',
    description:
      'Longer than T. rex and unlike any other predator: a crocodile\'s snout, a two-meter sail, dense bones for buoyancy control and a paddle-like tail. Spinosaurus spent much of its life in rivers, hunting car-sized fish.',
    facts: [
      'The longest known carnivorous dinosaur — up to 15 meters.',
      'The first dinosaur known to be genuinely semi-aquatic.',
      'The original fossils were destroyed in a WWII bombing raid.',
    ],
    color: '#4e7c99',
    featured: true,
    model: {
      kind: 'theropod',
      bodyLength: 6.5, bodyRadius: 1.4, neckLength: 2.2, neckRadius: 0.5,
      headSize: 1.6, tailLength: 6, legHeight: 2.2, legRadius: 0.38,
      neckAngle: 0.35, arms: 'long', features: { sail: true, longSnout: true },
    },
  },
  {
    id: 'baryonyx',
    name: 'Baryonyx',
    meaning: 'Heavy claw',
    familyId: 'spinosauridae',
    silhouette: 'spino',
    period: 'Early Cretaceous · 130–125 Mya',
    diet: 'Piscivore',
    lengthM: 9,
    heightM: 2.7,
    weightKg: 1900,
    speedKmh: 30,
    location: 'England, Spain',
    description:
      'Discovered by an amateur fossil hunter in a Surrey clay pit, Baryonyx was the first clear evidence of a fish-eating dinosaur — its stomach contents included half-digested fish scales and, for variety, a young Iguanodon.',
    facts: [
      'Its 31 cm hand claw gave it the name "heavy claw".',
      'Fossilized fish scales were found in its stomach.',
    ],
    color: '#5b8a8a',
    model: {
      kind: 'theropod',
      bodyLength: 4.2, bodyRadius: 0.95, neckLength: 1.6, neckRadius: 0.34,
      headSize: 1.1, tailLength: 4, legHeight: 1.7, legRadius: 0.25,
      neckAngle: 0.35, arms: 'long', features: { longSnout: true },
    },
  },
  {
    id: 'ankylosaurus',
    name: 'Ankylosaurus',
    meaning: 'Fused lizard',
    familyId: 'ankylosauridae',
    silhouette: 'ankylo',
    period: 'Late Cretaceous · 68–66 Mya',
    diet: 'Herbivore',
    lengthM: 8,
    heightM: 1.7,
    weightKg: 6000,
    speedKmh: 10,
    location: 'North America',
    description:
      'A living tank. Bony plates armored everything down to its eyelids, and its tail ended in a 50 kg club of solid bone that could swing hard enough to shatter a tyrannosaur\'s ankle. Its defense was simple: crouch and dare anything to try.',
    facts: [
      'Even its eyelids had bony armor.',
      'Its tail club could break the leg bones of a T. rex.',
      'It stood low and wide — barely taller than an adult human.',
    ],
    color: '#9c8a63',
    featured: true,
    model: {
      kind: 'quadruped',
      bodyLength: 4.6, bodyRadius: 1.5, neckLength: 0.8, neckRadius: 0.55,
      headSize: 0.9, tailLength: 3.2, legHeight: 0.95, legRadius: 0.3,
      neckAngle: 0.0, features: { armor: true, clubTail: true },
    },
  },
  {
    id: 'euoplocephalus',
    name: 'Euoplocephalus',
    meaning: 'Well-armored head',
    familyId: 'ankylosauridae',
    silhouette: 'ankylo',
    period: 'Late Cretaceous · 76–75 Mya',
    diet: 'Herbivore',
    lengthM: 5.5,
    heightM: 1.4,
    weightKg: 2500,
    speedKmh: 12,
    location: 'Canada',
    description:
      'The best-known ankylosaur scientifically — dozens of skeletons found, always alone, suggesting a solitary grump of an animal. Complex looping nasal passages hint it had an excellent sense of smell, or a resonant voice.',
    facts: [
      'Over 40 specimens have been found — nearly all of them solitary.',
      'Its convoluted nasal passages may have warmed and humidified air.',
    ],
    color: '#8f7f55',
    model: {
      kind: 'quadruped',
      bodyLength: 3.1, bodyRadius: 1.05, neckLength: 0.6, neckRadius: 0.4,
      headSize: 0.65, tailLength: 2.2, legHeight: 0.75, legRadius: 0.22,
      neckAngle: 0.0, features: { armor: true, clubTail: true },
    },
  },
  {
    id: 'parasaurolophus',
    name: 'Parasaurolophus',
    meaning: 'Near crested lizard',
    familyId: 'hadrosauridae',
    silhouette: 'hadro',
    period: 'Late Cretaceous · 76–73 Mya',
    diet: 'Herbivore',
    lengthM: 9.5,
    heightM: 3,
    weightKg: 2600,
    speedKmh: 40,
    location: 'North America',
    description:
      'The trombone of the Cretaceous. Its 1.8-meter hollow crest was a resonating chamber — scientists have reconstructed the sound, a deep haunting foghorn that could carry for kilometers across the floodplains to the rest of the herd.',
    facts: [
      'Scientists have 3D-printed its crest and played its actual call.',
      'Each individual\'s crest produced a slightly different tone.',
      'It could walk on two legs or four as it pleased.',
    ],
    color: '#b58a5e',
    featured: true,
    model: {
      kind: 'theropod',
      bodyLength: 4.4, bodyRadius: 1.2, neckLength: 1.6, neckRadius: 0.42,
      headSize: 1.0, tailLength: 4.4, legHeight: 1.9, legRadius: 0.3,
      neckAngle: 0.55, arms: 'normal', features: { crest: true, bill: true },
    },
  },
  {
    id: 'edmontosaurus',
    name: 'Edmontosaurus',
    meaning: 'Lizard from Edmonton',
    familyId: 'hadrosauridae',
    silhouette: 'hadro',
    period: 'Late Cretaceous · 73–66 Mya',
    diet: 'Herbivore',
    lengthM: 12,
    heightM: 3.4,
    weightKg: 7000,
    speedKmh: 45,
    location: 'North America',
    description:
      'A crestless giant duck-bill that lived right up to the asteroid. Several "dinosaur mummies" preserve its skin, scales and even a fleshy comb on its head — we know Edmontosaurus\'s outside better than almost any dinosaur.',
    facts: [
      'Mummified specimens preserve skin impressions and a rooster-like comb.',
      'One fossil has a healed T. rex bite in its tail — it got away.',
      'It had up to 1,000 teeth arranged in grinding batteries.',
    ],
    color: '#a4784f',
    model: {
      kind: 'theropod',
      bodyLength: 5.4, bodyRadius: 1.45, neckLength: 1.8, neckRadius: 0.5,
      headSize: 1.15, tailLength: 5.2, legHeight: 2.1, legRadius: 0.36,
      neckAngle: 0.45, arms: 'normal', features: { bill: true },
    },
  },
  {
    id: 'coelophysis',
    name: 'Coelophysis',
    meaning: 'Hollow form',
    familyId: 'coelophysidae',
    silhouette: 'raptor',
    period: 'Late Triassic · 221–196 Mya',
    diet: 'Carnivore',
    lengthM: 3,
    heightM: 1,
    weightKg: 25,
    speedKmh: 50,
    location: 'USA (New Mexico)',
    description:
      'One of the very first dinosaurs we know well — a whippet-thin sprinter from the dawn of the age of dinosaurs. At Ghost Ranch, New Mexico, hundreds of skeletons were found buried together, an entire flock caught by a flash flood 210 million years ago.',
    facts: [
      'Hundreds of skeletons were found in a single quarry at Ghost Ranch.',
      'A Coelophysis skull flew to space aboard Shuttle Endeavour in 1998.',
      'Its bones were hollow like a bird\'s — the family name means "hollow form".',
    ],
    color: '#cf8a52',
    model: {
      kind: 'theropod',
      bodyLength: 1.1, bodyRadius: 0.28, neckLength: 0.55, neckRadius: 0.1,
      headSize: 0.3, tailLength: 1.5, legHeight: 0.65, legRadius: 0.06,
      neckAngle: 0.65, arms: 'normal',
    },
  },
  {
    id: 'plateosaurus',
    name: 'Plateosaurus',
    meaning: 'Broad lizard',
    familyId: 'plateosauridae',
    silhouette: 'sauropod',
    period: 'Late Triassic · 214–204 Mya',
    diet: 'Herbivore',
    lengthM: 8,
    heightM: 3.6,
    weightKg: 2600,
    speedKmh: 18,
    location: 'Germany, Switzerland, France',
    description:
      'Europe\'s most common dinosaur fossil and the prototype of the long-necks: a two-legged browser with a small head, huge thumb claws and a neck reaching where no animal had reached before. Its descendants\' cousins would become the largest creatures ever to walk the Earth.',
    facts: [
      'Over 100 skeletons have been dug up, mostly in Germany.',
      'Unlike the later giants, it walked on two legs.',
      'Individuals of the same age could differ wildly in size — growth depended on climate.',
    ],
    color: '#96a05c',
    model: {
      kind: 'theropod',
      bodyLength: 3.2, bodyRadius: 0.95, neckLength: 2.3, neckRadius: 0.32,
      headSize: 0.6, tailLength: 3.4, legHeight: 1.6, legRadius: 0.22,
      neckAngle: 0.8, arms: 'long',
    },
  },
  {
    id: 'herrerasaurus',
    name: 'Herrerasaurus',
    meaning: 'Herrera\'s lizard',
    familyId: 'herrerasauridae',
    silhouette: 'raptor',
    period: 'Late Triassic · 231 Mya',
    diet: 'Carnivore',
    lengthM: 4.5,
    heightM: 1.1,
    weightKg: 250,
    speedKmh: 40,
    location: 'Argentina',
    description:
      'Where it all began. Herrerasaurus stalked the Ischigualasto valley 231 million years ago, when dinosaurs were still a rare experiment making up barely one animal in twenty. Named after Victorino Herrera, the Andean goat herder who first spotted its bones in the rocks.',
    facts: [
      'One of the very first dinosaurs — 231 million years old.',
      'Discovered by a goat herder whose name it now carries.',
      'Its sliding jaw joint let it grip struggling prey like a trap.',
    ],
    color: '#b56a45',
    model: {
      kind: 'theropod',
      bodyLength: 1.8, bodyRadius: 0.45, neckLength: 0.7, neckRadius: 0.16,
      headSize: 0.5, tailLength: 2.2, legHeight: 1.0, legRadius: 0.1,
      neckAngle: 0.55, arms: 'normal',
    },
  },
  {
    id: 'allosaurus',
    name: 'Allosaurus',
    meaning: 'Different lizard',
    familyId: 'allosauridae',
    silhouette: 'trex',
    period: 'Late Jurassic · 155–145 Mya',
    diet: 'Carnivore',
    lengthM: 8.5,
    heightM: 3.1,
    weightKg: 1700,
    speedKmh: 34,
    location: 'North America, Portugal',
    description:
      'The Jurassic\'s top predator — lighter and faster than the tyrannosaurs that came later, with strong three-clawed arms and a skull it may have swung like a hatchet into giant prey. Its bones are so common in the Morrison Formation that one quarry alone held 46 individuals.',
    facts: [
      'A Stegosaurus tail spike wound was found in one Allosaurus vertebra — it fought the tank and lost.',
      '"Big Al", a nearly complete skeleton, shows 19 injuries healed over a hard life.',
      'It is the official state fossil of Utah.',
    ],
    color: '#a05a52',
    featured: false,
    model: {
      kind: 'theropod',
      bodyLength: 4.2, bodyRadius: 1.0, neckLength: 1.3, neckRadius: 0.38,
      headSize: 1.05, tailLength: 4.2, legHeight: 2.0, legRadius: 0.28,
      neckAngle: 0.5, arms: 'normal',
    },
  },
  {
    id: 'therizinosaurus',
    name: 'Therizinosaurus',
    meaning: 'Scythe lizard',
    familyId: 'therizinosauridae',
    silhouette: 'therizino',
    period: 'Late Cretaceous · 70 Mya',
    diet: 'Herbivore',
    lengthM: 9,
    heightM: 5,
    weightKg: 3000,
    speedKmh: 25,
    location: 'Mongolia',
    description:
      'A theropod — the same group as T. rex — that gave up hunting for browsing treetops, keeping only its ancestors\' claws, grown to a size no other animal has matched. Feathered, pot-bellied and slow-moving, it must have looked as strange to other dinosaurs as it does to us.',
    facts: [
      'Its hand claws reached up to 70 cm along the curve — the longest of any known animal.',
      'First described in 1954 from claws alone, initially mistaken for a giant turtle-like reptile.',
      'Likely used its claws for hooking branches to feed, not for fighting.',
    ],
    color: '#5f7a4a',
    model: {
      kind: 'theropod',
      bodyLength: 4.2, bodyRadius: 1.3, neckLength: 1.7, neckRadius: 0.28,
      headSize: 0.55, tailLength: 2.6, legHeight: 2.0, legRadius: 0.34,
      neckAngle: 0.45, arms: 'long', features: { giantClaws: true },
    },
  },
  {
    id: 'mosasaurus',
    name: 'Mosasaurus',
    meaning: 'Lizard of the Meuse River',
    familyId: 'mosasauridae',
    silhouette: 'mosasaur',
    period: 'Late Cretaceous · 82–66 Mya',
    diet: 'Carnivore',
    lengthM: 13,
    heightM: 2.4,
    weightKg: 15000,
    speedKmh: 12,
    location: 'Netherlands, North America',
    description:
      'Not a dinosaur — a giant marine lizard, closer kin to monitor lizards and snakes. Mosasaurus ruled the Late Cretaceous seas as an apex predator, swallowing prey almost whole with a double-hinged jaw. Its skull was dug from a Maastricht chalk quarry in the 1770s, decades before dinosaurs were even recognized as a group.',
    facts: [
      'Named for the Meuse river near Maastricht, Netherlands, where the first skull was found.',
      'French Revolutionary forces seized the original fossil skull as war spoils in 1795.',
      'Fossilized skin impressions show it swam with a shark-like tail fin, not a simple tapering tail.',
    ],
    color: '#3f5a68',
    model: {
      kind: 'marine',
      bodyLength: 6, bodyRadius: 1.1, neckLength: 0.4, neckRadius: 0.55,
      headSize: 1.8, tailLength: 6, legHeight: 1.0, legRadius: 0.22,
      neckAngle: 0, features: { longSnout: true, tailFluke: true },
    },
    clade: 'marine-reptile',
  },
  {
    id: 'plesiosaurus',
    name: 'Plesiosaurus',
    meaning: 'Near to reptile',
    familyId: 'plesiosauridae',
    silhouette: 'plesiosaur',
    period: 'Early Jurassic · 201–194 Mya',
    diet: 'Piscivore',
    lengthM: 3.5,
    heightM: 1.0,
    weightKg: 450,
    speedKmh: 10,
    location: 'England',
    description:
      'Not a dinosaur — a marine reptile so odd that when Mary Anning unearthed the first complete skeleton in 1823, the French anatomist Georges Cuvier suspected a fraud. A tiny head sits atop a neck longer than the rest of its body, built from roughly 40 vertebrae, propelled by four broad flippers like an underwater flight.',
    facts: [
      'Discovered by pioneering fossil hunter Mary Anning at Lyme Regis, England, in 1823.',
      'Its neck alone contains around 40 vertebrae — more than almost any other animal.',
      'It likely "flew" underwater, flapping its four flippers like a penguin rather than paddling.',
    ],
    color: '#4f7a75',
    model: {
      kind: 'marine',
      bodyLength: 1.8, bodyRadius: 0.55, neckLength: 2.0, neckRadius: 0.16,
      headSize: 0.32, tailLength: 0.9, legHeight: 0.85, legRadius: 0.14,
      neckAngle: 0.3,
    },
    clade: 'marine-reptile',
  },
  {
    id: 'pteranodon',
    name: 'Pteranodon',
    meaning: 'Toothless wing',
    familyId: 'pteranodontidae',
    silhouette: 'ptero',
    period: 'Late Cretaceous · 86–84 Mya',
    diet: 'Piscivore',
    lengthM: 2.5,
    heightM: 0.8,
    weightKg: 20,
    speedKmh: 50,
    location: 'North America',
    description:
      'Not a dinosaur — a pterosaur, a separate group of flying reptiles. Pteranodon patrolled the shores of the shallow sea that once split North America in two, snatching fish from the surface. Hollow, air-filled bones kept a six-meter wingspan light enough to fly, at the cost of almost never fossilizing intact.',
    facts: [
      'Named in 1876 by O. C. Marsh during the fiercely competitive "Bone Wars" of American paleontology.',
      'Unlike earlier pterosaurs, it had no teeth at all — just a sharp beak.',
      'Its backward-pointing crest may have acted as a rudder or a counterweight for its long beak.',
    ],
    color: '#8a7f6e',
    model: {
      kind: 'pterosaur',
      bodyLength: 1.0, bodyRadius: 0.42, neckLength: 0.9, neckRadius: 0.16,
      headSize: 1.1, tailLength: 0.25, legHeight: 0.5, legRadius: 0.05,
      neckAngle: 0.35, wingSpan: 6.4, features: { bill: true, longSnout: true, crestBlade: true },
    },
    clade: 'pterosaur',
    wingSpanM: 6.4,
  },
  {
    id: 'quetzalcoatlus',
    name: 'Quetzalcoatlus',
    meaning: 'Named for the Aztec feathered serpent god Quetzalcoatl',
    familyId: 'azhdarchidae',
    silhouette: 'ptero',
    period: 'Late Cretaceous · 70–66 Mya',
    diet: 'Carnivore',
    lengthM: 3,
    heightM: 3,
    weightKg: 250,
    speedKmh: 60,
    location: 'USA (Texas)',
    description:
      'Not a dinosaur — the largest flying animal ever known, a pterosaur with a wingspan longer than a city bus. Standing on all fours, it stood as tall as a giraffe at the shoulder, and current research suggests it spent much of its life stalking small prey on the ground, more giant stork than glider. It lived right up until the asteroid, alongside the very last dinosaurs.',
    facts: [
      'Its wingspan is estimated at 10–11 meters — comparable to a small airplane.',
      'Discovered in Big Bend, Texas, in 1971, and named after the Aztec feathered serpent god.',
      'Despite its size, it likely weighed only around 250 kg thanks to hollow, air-filled bones.',
    ],
    color: '#8a8477',
    model: {
      kind: 'pterosaur',
      bodyLength: 1.3, bodyRadius: 0.5, neckLength: 2.6, neckRadius: 0.22,
      headSize: 0.95, tailLength: 0.2, legHeight: 1.7, legRadius: 0.13,
      neckAngle: 0.25, wingSpan: 10.5, features: { bill: true, longSnout: true },
    },
    clade: 'pterosaur',
    wingSpanM: 10.5,
  },
]

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

export const periods: Period[] = [
  {
    id: 'triassic',
    name: 'Triassic',
    range: '252–201 Mya',
    color: '#cf8a52',
    highlights: ['herrerasaurus', 'coelophysis', 'plateosaurus'],
    blurb:
      'After the greatest extinction of all time, a new kind of animal rises from the ashes — small, quick, and easy to underestimate. The age of dinosaurs begins.',
  },
  {
    id: 'jurassic',
    name: 'Jurassic',
    range: '201–145 Mya',
    color: '#5e8b7e',
    highlights: ['allosaurus', 'brachiosaurus', 'stegosaurus'],
    blurb:
      'The giants arrive. Sauropods stretch to the treetops, plated grazers patrol the fern plains, and dinosaurs rule every continent on a warm, green Earth.',
  },
  {
    id: 'cretaceous',
    name: 'Cretaceous',
    range: '145–66 Mya',
    color: '#7d94b5',
    highlights: ['spinosaurus', 'triceratops', 'tyrannosaurus'],
    blurb:
      'The spectacular finale — horns, crests, armor, packs of raptors and the tyrant kings. Dinosaurs are more diverse than ever… right up until a very bad day.',
  },
]

export const getDino = (id: string) => dinosaurs.find((d) => d.id === id)
export const getFamily = (id: string) => families.find((f) => f.id === id)
export const getFamilyMembers = (familyId: string) =>
  dinosaurs.filter((d) => d.familyId === familyId)
export const featuredDinos = dinosaurs.filter((d) => d.featured)

export const getPeriod = (id: string) => periods.find((p) => p.id === id)
/** Derived from the display string so the two never disagree. */
export const getPeriodId = (dino: Dino): PeriodId =>
  dino.period.includes('Triassic') ? 'triassic' : dino.period.includes('Jurassic') ? 'jurassic' : 'cretaceous'
export const getPeriodMembers = (periodId: PeriodId) =>
  dinosaurs.filter((d) => getPeriodId(d) === periodId)

export function searchAll(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return { dinos: [] as Dino[], families: [] as Family[], periods: [] as Period[] }
  return {
    dinos: dinosaurs.filter(
      (d) => d.name.toLowerCase().includes(q) || d.meaning.toLowerCase().includes(q),
    ),
    families: families.filter((f) => f.name.toLowerCase().includes(q)),
    periods: periods.filter((p) => p.name.toLowerCase().includes(q)),
  }
}
