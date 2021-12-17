import * as AST from '@src/lhast.js'
import * as AST_COMPACT from '@src/lhast-compact.js'
import { validateAST, validateASTCompact  } from './validate.js'

export function isAST(data: unknown): data is AST.Root {
  try {
    validateAST(data)
    return true
  } catch (e) {
    return false
  }
}

export function isASTCompact(data: unknown): data is AST_COMPACT.Root {
  try {
    validateASTCompact(data)
    return true
  } catch {
    return false
  }
}
