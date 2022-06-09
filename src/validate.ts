import Ajv, { AnySchemaObject } from 'ajv/dist/2020.js'
import { lazy } from 'extra-lazy'
import { LHASTSchema } from './lhast-schema.js'
import { LHASTCompactSchema } from './lhast-compact-schema.js'

// @ts-ignore
const getAjv = lazy(() => new Ajv({ strictTuples: false }))

function validate<T>(schema: AnySchemaObject, data: T): void {
  const valid = getAjv().validate(schema, data)
  if (!valid) throw new Error(getAjv().errorsText())
}

export function validateLHAST(data: unknown): void {
  validate(LHASTSchema, data)
}

export function validateLHASTCompact(data: unknown): void {
  validate(LHASTCompactSchema, data)
}
