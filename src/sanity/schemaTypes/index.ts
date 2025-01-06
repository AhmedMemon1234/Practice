import { type SchemaTypeDefinition } from 'sanity'
import { post } from '../product'
import { details } from '../details'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, details],
}
