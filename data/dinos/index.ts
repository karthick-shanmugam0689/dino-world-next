import type { Dino, DinoPhotoSet } from '../types'
import { dino as tyrannosaurus, photos as tyrannosaurusPhotos } from './tyrannosaurus'
import { dino as tarbosaurus, photos as tarbosaurusPhotos } from './tarbosaurus'
import { dino as albertosaurus, photos as albertosaurusPhotos } from './albertosaurus'
import { dino as velociraptor, photos as velociraptorPhotos } from './velociraptor'
import { dino as deinonychus, photos as deinonychusPhotos } from './deinonychus'
import { dino as utahraptor, photos as utahraptorPhotos } from './utahraptor'
import { dino as triceratops, photos as triceratopsPhotos } from './triceratops'
import { dino as styracosaurus, photos as styracosaurusPhotos } from './styracosaurus'
import { dino as stegosaurus, photos as stegosaurusPhotos } from './stegosaurus'
import { dino as kentrosaurus, photos as kentrosaurusPhotos } from './kentrosaurus'
import { dino as brachiosaurus, photos as brachiosaurusPhotos } from './brachiosaurus'
import { dino as giraffatitan, photos as giraffatitanPhotos } from './giraffatitan'
import { dino as spinosaurus, photos as spinosaurusPhotos } from './spinosaurus'
import { dino as baryonyx, photos as baryonyxPhotos } from './baryonyx'
import { dino as ankylosaurus, photos as ankylosaurusPhotos } from './ankylosaurus'
import { dino as euoplocephalus, photos as euoplocephalusPhotos } from './euoplocephalus'
import { dino as parasaurolophus, photos as parasaurolophusPhotos } from './parasaurolophus'
import { dino as edmontosaurus, photos as edmontosaurusPhotos } from './edmontosaurus'
import { dino as coelophysis, photos as coelophysisPhotos } from './coelophysis'
import { dino as plateosaurus, photos as plateosaurusPhotos } from './plateosaurus'
import { dino as herrerasaurus, photos as herrerasaurusPhotos } from './herrerasaurus'
import { dino as allosaurus, photos as allosaurusPhotos } from './allosaurus'
import { dino as therizinosaurus, photos as therizinosaurusPhotos } from './therizinosaurus'
import { dino as mosasaurus, photos as mosasaurusPhotos } from './mosasaurus'
import { dino as plesiosaurus, photos as plesiosaurusPhotos } from './plesiosaurus'
import { dino as pteranodon, photos as pteranodonPhotos } from './pteranodon'
import { dino as quetzalcoatlus, photos as quetzalcoatlusPhotos } from './quetzalcoatlus'

export const dinosaurs: Dino[] = [
  tyrannosaurus,
  tarbosaurus,
  albertosaurus,
  velociraptor,
  deinonychus,
  utahraptor,
  triceratops,
  styracosaurus,
  stegosaurus,
  kentrosaurus,
  brachiosaurus,
  giraffatitan,
  spinosaurus,
  baryonyx,
  ankylosaurus,
  euoplocephalus,
  parasaurolophus,
  edmontosaurus,
  coelophysis,
  plateosaurus,
  herrerasaurus,
  allosaurus,
  therizinosaurus,
  mosasaurus,
  plesiosaurus,
  pteranodon,
  quetzalcoatlus,
]

export const dinoPhotos: Record<string, DinoPhotoSet> = {
  tyrannosaurus: tyrannosaurusPhotos,
  tarbosaurus: tarbosaurusPhotos,
  albertosaurus: albertosaurusPhotos,
  velociraptor: velociraptorPhotos,
  deinonychus: deinonychusPhotos,
  utahraptor: utahraptorPhotos,
  triceratops: triceratopsPhotos,
  styracosaurus: styracosaurusPhotos,
  stegosaurus: stegosaurusPhotos,
  kentrosaurus: kentrosaurusPhotos,
  brachiosaurus: brachiosaurusPhotos,
  giraffatitan: giraffatitanPhotos,
  spinosaurus: spinosaurusPhotos,
  baryonyx: baryonyxPhotos,
  ankylosaurus: ankylosaurusPhotos,
  euoplocephalus: euoplocephalusPhotos,
  parasaurolophus: parasaurolophusPhotos,
  edmontosaurus: edmontosaurusPhotos,
  coelophysis: coelophysisPhotos,
  plateosaurus: plateosaurusPhotos,
  herrerasaurus: herrerasaurusPhotos,
  allosaurus: allosaurusPhotos,
  therizinosaurus: therizinosaurusPhotos,
  mosasaurus: mosasaurusPhotos,
  plesiosaurus: plesiosaurusPhotos,
  pteranodon: pteranodonPhotos,
  quetzalcoatlus: quetzalcoatlusPhotos,
}
