import type { Dino, DinoPhotoSet } from '../../types'
import { model } from './model'

export const photos: DinoPhotoSet = {}

export const dino: Dino = {
  id: "gigantosaurus",
  name: "Gigantosaurus",
  meaning: "Giant lizard",
  familyId: "cetiosauridae",
  silhouette: "sauropod",
  period: "Late Jurassic · 157–152 Mya",
  diet: "Herbivore",
  lengthM: 15,
  heightM: 6,
  weightKg: 15000,
  speedKmh: 12,
  location: "England",
  description: "A shadowy giant of Jurassic England, known only from a handful of bones — some tail vertebrae, scraps of limb and a great claw that earned its species the name megalonyx. Named by Harry Govier Seeley in 1869, it was one of the first British dinosaurs recognised as a true colossus, a heavily built plant eater plodding the Late Jurassic coast on four pillar-like legs. Its remains are too incomplete to tell it apart from its relatives, so today it survives as a nomen dubium — a real animal with a name no longer certain enough to pin on any single skeleton.",
  facts: [
    "Despite the near-identical name, it is unrelated to Giganotosaurus, the giant South American meat-eater.",
    "Its species name, megalonyx, means \"great claw\" — a nod to a large claw among its few known bones.",
    "The remains are so scrappy that scientists now treat the genus as a nomen dubium, a doubtful name."
  ],
  color: "#8a9b6e",
  model,
}
