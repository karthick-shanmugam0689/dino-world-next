// Reference images for each dinosaur, from Wikimedia Commons (what Wikipedia uses).
// `skeleton` = a real fossil mount / skeleton photo; `realistic` = an artist's life restoration.
// All are freely licensed (CC0 / public domain / CC BY / CC BY-SA); `source` links to the
// Commons file page (author + full license). Generated via the Commons API, then verified to load.
export interface DinoPhoto {
  image: string
  license: string
  source: string
}

export interface DinoPhotoSet {
  skeleton?: DinoPhoto
  realistic?: DinoPhoto
}

export const dinoPhotos: Record<string, DinoPhotoSet> = {
  tyrannosaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Tyrannosaurus_skeleton.jpg/960px-Tyrannosaurus_skeleton.jpg', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Tyrannosaurus_skeleton.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Tyrannosaurus-rex-Profile-steveoc86_%28coloured%29%28mirror%29.png/960px-Tyrannosaurus-rex-Profile-steveoc86_%28coloured%29%28mirror%29.png', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Tyrannosaurus-rex-Profile-steveoc86_%28coloured%29%28mirror%29.png' },
  },
  tarbosaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Tarbosaurus_bataar_mount_-_Dinosaur_Mysteries_exhibit.jpg/960px-Tarbosaurus_bataar_mount_-_Dinosaur_Mysteries_exhibit.jpg', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Tarbosaurus_bataar_mount_-_Dinosaur_Mysteries_exhibit.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Tarbosaurus_baatar_paleoart_%282024%29.png/960px-Tarbosaurus_baatar_paleoart_%282024%29.png', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Tarbosaurus_baatar_paleoart_%282024%29.png' },
  },
  albertosaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Albertosaurus_sarcophagus_cast.jpg/960px-Albertosaurus_sarcophagus_cast.jpg', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Albertosaurus_sarcophagus_cast.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Albertosaurus_TD.png/960px-Albertosaurus_TD.png', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Albertosaurus_TD.png' },
  },
  velociraptor: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Velociraptor_skeleton_white_background.jpg/960px-Velociraptor_skeleton_white_background.jpg', license: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Velociraptor_skeleton_white_background.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Velociraptor_Restoration.png/960px-Velociraptor_Restoration.png', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Velociraptor_Restoration.png' },
  },
  deinonychus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Deinonychus_FMNH.jpg/960px-Deinonychus_FMNH.jpg', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Deinonychus_FMNH.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Deinonychus_Restoration.png/960px-Deinonychus_Restoration.png', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Deinonychus_Restoration.png' },
  },
  utahraptor: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/BYU_Utahraptor_skeletal_mount.jpg/960px-BYU_Utahraptor_skeletal_mount.jpg', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:BYU_Utahraptor_skeletal_mount.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Utahraptor_Restoration.png/960px-Utahraptor_Restoration.png', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Utahraptor_Restoration.png' },
  },
  triceratops: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/LA-Triceratops_mount-2.jpg/960px-LA-Triceratops_mount-2.jpg', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:LA-Triceratops_mount-2.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Triceratops_TD.png/960px-Triceratops_TD.png', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Triceratops_TD.png' },
  },
  styracosaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/StyracosaurCMN2.jpg/960px-StyracosaurCMN2.jpg', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:StyracosaurCMN2.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Styracosaurus_TD.png/960px-Styracosaurus_TD.png', license: 'CC0', source: 'https://commons.wikimedia.org/wiki/File:Styracosaurus_TD.png' },
  },
  stegosaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/HMNS_Stegosaurus.jpg/960px-HMNS_Stegosaurus.jpg', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:HMNS_Stegosaurus.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Stegosaurus_stenops_Life_Reconstruction.png/960px-Stegosaurus_stenops_Life_Reconstruction.png', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Stegosaurus_stenops_Life_Reconstruction.png' },
  },
  kentrosaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Fossil_Kentrosaurus_aethiopicus_in_Museum_f%C3%BCr_Naturkunde_Berlin_001.JPG/960px-Fossil_Kentrosaurus_aethiopicus_in_Museum_f%C3%BCr_Naturkunde_Berlin_001.JPG', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Fossil_Kentrosaurus_aethiopicus_in_Museum_f%C3%BCr_Naturkunde_Berlin_001.JPG' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Kentrosaurus_digital_clay_reconstruction.png', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Kentrosaurus_digital_clay_reconstruction.png' },
  },
  brachiosaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Brachiosaurus_mount.jpg/960px-Brachiosaurus_mount.jpg', license: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Brachiosaurus_mount.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Brachiosaurus_altithorax_side_profile.png/960px-Brachiosaurus_altithorax_side_profile.png', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Brachiosaurus_altithorax_side_profile.png' },
  },
  giraffatitan: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Museum_f%C3%BCr_Naturkunde_%2836556352434%29.jpg/960px-Museum_f%C3%BCr_Naturkunde_%2836556352434%29.jpg', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Museum_f%C3%BCr_Naturkunde_%2836556352434%29.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Giraffatitan_DB.jpg/960px-Giraffatitan_DB.jpg', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Giraffatitan_DB.jpg' },
  },
  spinosaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Spinosaurus_skeleton.jpg/960px-Spinosaurus_skeleton.jpg', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Spinosaurus_skeleton.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Spinosaurus_aegyptiacus_life_reconstruction.png/960px-Spinosaurus_aegyptiacus_life_reconstruction.png', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Spinosaurus_aegyptiacus_life_reconstruction.png' },
  },
  baryonyx: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Baryonyx_walkeri_mount_NMNS.jpg/960px-Baryonyx_walkeri_mount_NMNS.jpg', license: 'CC BY-SA 2.0', source: 'https://commons.wikimedia.org/wiki/File:Baryonyx_walkeri_mount_NMNS.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Baryonyx_walkeri_restoration.jpg/960px-Baryonyx_walkeri_restoration.jpg', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Baryonyx_walkeri_restoration.jpg' },
  },
  ankylosaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Ankylosaurus_skull_AMNH.jpg/960px-Ankylosaurus_skull_AMNH.jpg', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Ankylosaurus_skull_AMNH.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Ankylosaurus_magniventris_by_sphenaphinae.png/960px-Ankylosaurus_magniventris_by_sphenaphinae.png', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Ankylosaurus_magniventris_by_sphenaphinae.png' },
  },
  euoplocephalus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Euoplocephalus_TMP_1991.127.1.tif/lossy-page1-960px-Euoplocephalus_TMP_1991.127.1.tif.jpg', license: 'CC BY 2.5', source: 'https://commons.wikimedia.org/wiki/File:Euoplocephalus_TMP_1991.127.1.tif' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Euoplocephalus_BW.jpg', license: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Euoplocephalus_BW.jpg' },
  },
  parasaurolophus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/FMNH_Parasaurolophus_fossil.jpg/960px-FMNH_Parasaurolophus_fossil.jpg', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:FMNH_Parasaurolophus_fossil.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Parasaurolophuspic_steveoc.jpg/960px-Parasaurolophuspic_steveoc.jpg', license: 'CC BY 2.5', source: 'https://commons.wikimedia.org/wiki/File:Parasaurolophuspic_steveoc.jpg' },
  },
  edmontosaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Mounted_Edmontosaurus.jpg/960px-Mounted_Edmontosaurus.jpg', license: 'Public domain', source: 'https://commons.wikimedia.org/wiki/File:Mounted_Edmontosaurus.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Edmontosaurus_sp._reconstruction.PNG/960px-Edmontosaurus_sp._reconstruction.PNG', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Edmontosaurus_sp._reconstruction.PNG' },
  },
  coelophysis: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Coelophysis_bauri_mount.jpg/960px-Coelophysis_bauri_mount.jpg', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Coelophysis_bauri_mount.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Coelophysis_TD.png/960px-Coelophysis_TD.png', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Coelophysis_TD.png' },
  },
  plateosaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Plateosaurus_Skelett_2.jpg/960px-Plateosaurus_Skelett_2.jpg', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Plateosaurus_Skelett_2.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Plateosaurus_TD.png/960px-Plateosaurus_TD.png', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Plateosaurus_TD.png' },
  },
  herrerasaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Herrerasaurus_skeleton.jpg/960px-Herrerasaurus_skeleton.jpg', license: 'CC BY-SA 2.0', source: 'https://commons.wikimedia.org/wiki/File:Herrerasaurus_skeleton.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Herrerasaurus_TD.png/960px-Herrerasaurus_TD.png', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Herrerasaurus_TD.png' },
  },
  allosaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/WLA_hmns_Allosaurus_White_Background.jpg/960px-WLA_hmns_Allosaurus_White_Background.jpg', license: 'CC BY 2.5', source: 'https://commons.wikimedia.org/wiki/File:WLA_hmns_Allosaurus_White_Background.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Allosaurus_Life_Restoration.jpg/960px-Allosaurus_Life_Restoration.jpg', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Allosaurus_Life_Restoration.jpg' },
  },
  therizinosaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Therizinosaurus_arms.jpg/960px-Therizinosaurus_arms.jpg', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Therizinosaurus_arms.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Therizinosaurus_Restoration.png/960px-Therizinosaurus_Restoration.png', license: 'CC BY 4.0', source: 'https://commons.wikimedia.org/wiki/File:Therizinosaurus_Restoration.png' },
  },
  mosasaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Mosasaurus_hoffmannii_-_skeleton.jpg/960px-Mosasaurus_hoffmannii_-_skeleton.jpg', license: 'CC BY-SA 3.0', source: 'https://commons.wikimedia.org/wiki/File:Mosasaurus_hoffmannii_-_skeleton.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Mosasaurus_missouriensis_NT.png', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Mosasaurus_missouriensis_NT.png' },
  },
  plesiosaurus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Plesiosaurus_dolichodeirus_NHM.jpg/960px-Plesiosaurus_dolichodeirus_NHM.jpg', license: 'CC BY 2.0', source: 'https://commons.wikimedia.org/wiki/File:Plesiosaurus_dolichodeirus_NHM.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Plesiosaurus_dolichodeirus.png', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Plesiosaurus_dolichodeirus.png' },
  },
  pteranodon: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Pteranodon_skeletal.jpg', license: 'CC BY 2.5', source: 'https://commons.wikimedia.org/wiki/File:Pteranodon_skeletal.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Pteranodon_longiceps_mmartyniuk_wiki.png', license: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Pteranodon_longiceps_mmartyniuk_wiki.png' },
  },
  quetzalcoatlus: {
    skeleton: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Quetzaloatlus_lawsoni_skeletal_reconstruction.jpg/960px-Quetzaloatlus_lawsoni_skeletal_reconstruction.jpg', license: 'CC BY-SA 4.0', source: 'https://commons.wikimedia.org/wiki/File:Quetzaloatlus_lawsoni_skeletal_reconstruction.jpg' },
    realistic: { image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Life_restoration_of_a_group_of_giant_azhdarchids%2C_Quetzalcoatlus_northropi%2C_foraging_on_a_Cretaceous_fern_prairie.png/960px-Life_restoration_of_a_group_of_giant_azhdarchids%2C_Quetzalcoatlus_northropi%2C_foraging_on_a_Cretaceous_fern_prairie.png', license: 'CC BY 3.0', source: 'https://commons.wikimedia.org/wiki/File:Life_restoration_of_a_group_of_giant_azhdarchids%2C_Quetzalcoatlus_northropi%2C_foraging_on_a_Cretaceous_fern_prairie.png' },
  },
}
