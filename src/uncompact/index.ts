import * as LHAST from '@src/lhast.js'
import * as LHASTCompact from '@src/lhast-compact.js'
import { transformRoot } from './transform.js'

export function uncompact(root: LHASTCompact.Root): LHAST.Root {
  return transformRoot(root)
}
