import { randomUUID } from 'crypto'
import type { Schema } from 'mongoose'

// Mesma convenção de ids curtos usada no admin (ex: 'p-a1b2c3d4'), para que
// os documentos criados aqui fiquem no mesmo formato dos criados lá.
export function genId(prefix: string) {
  return `${prefix}-${randomUUID().slice(0, 8)}`
}

// Expõe `id` (string) em vez de `_id`/`__v` no JSON de resposta.
export function withIdTransform(schema: Schema) {
  schema.set('toJSON', {
    virtuals: true,
    transform: (_doc, ret: Record<string, unknown>) => {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
      return ret
    },
  })
}
