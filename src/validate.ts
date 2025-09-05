import Ajv, { AnySchemaObject } from 'ajv/dist/2020.js'
import { lazy } from 'extra-lazy'
import * as LHAST from './lhast.js'
import * as LHASTCompact from './lhast-compact.js'
import { LHASTSchema } from './lhast-schema.js'
import { LHASTCompactSchema } from './lhast-compact-schema.js'

const getAjv = lazy(() => new Ajv.default({ strictTuples: false }))

function validate(schema: AnySchemaObject, data: unknown): void {
  const valid = getAjv().validate(schema, data)
  if (!valid) throw new Error(getAjv().errorsText())
}

export function validateLHAST(data: unknown): asserts data is LHAST.Root {
  validate(LHASTSchema, data)
}

export function validateLHASTCompact(data: unknown): asserts data is LHASTCompact.Root {
  validate(LHASTCompactSchema, data)
}
