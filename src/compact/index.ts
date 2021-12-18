import * as LHAST from '@src/lhast.js'
import * as LHASTCompact from '@src/lhast-compact.js'
import { transformRoot } from './transform.js'

export function compact(root: LHAST.Root): LHASTCompact.Root {
  return transformRoot(root)
}
