import Ajv, { AnySchemaObject } from 'ajv/dist/2020.js'
import { lazy } from 'extra-lazy'
import { astSchema } from './lhast-schema.js'
import { astCompactSchema } from './lhast-compact-schema.js'

const getAjv = lazy(() => new Ajv({ strictTuples: false }))

function validate<T>(schema: AnySchemaObject, data: T): void {
  const valid = getAjv().validate(schema, data)
  if (!valid) throw new Error(getAjv().errorsText())
}

export function validateAST(data: unknown): void {
  validate(astSchema, data)
}

export function validateASTCompact(data: unknown): void {
  validate(astCompactSchema, data)
}
