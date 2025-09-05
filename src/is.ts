import * as LHAST from '@src/lhast.js'
import * as LHASTCompact from '@src/lhast-compact.js'
import { validateLHAST, validateLHASTCompact  } from './validate.js'

export function isLHAST(data: unknown): data is LHAST.Root {
  try {
    validateLHAST(data)
    return true
  } catch {
    return false
  }
}

export function isLHASTCompact(data: unknown): data is LHASTCompact.Root {
  try {
    validateLHASTCompact(data)
    return true
  } catch {
    return false
  }
}
