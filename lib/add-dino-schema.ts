import { z } from 'zod'

/** POST /api/add-dino body */
export const addDinoRequestSchema = z.object({
  dinoName: z
    .string()
    .trim()
    .min(2, 'dinoName is too short')
    .max(80, 'dinoName is too long')
    .regex(/^[\p{L}\p{N}\s.\-''']+$/u, 'dinoName has invalid characters'),
})

export type AddDinoRequest = z.infer<typeof addDinoRequestSchema>

/** Shape checklist for species folders (agents + docs). Runtime types live in data/types.ts. */
export const speciesFolderChecklist = {
  periodId: ['triassic', 'jurassic', 'cretaceous'] as const,
  kinds: ['theropod', 'sauropod', 'quadruped', 'marine', 'pterosaur'] as const,
  requiredDinoFields: [
    'id',
    'name',
    'meaning',
    'familyId',
    'periodId',
    'periodLabel',
    'diet',
    'lengthM',
    'heightM',
    'weightKg',
    'speedKmh',
    'location',
    'description',
    'facts',
    'silhouette',
    'color',
    'photos',
    'model',
  ] as const,
} as const
