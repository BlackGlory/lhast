import * as LHAST from '@src/lhast.js'
import * as LHAST_COMPACT from '@src/lhast-compact.js'
import { transformRoot } from './transform.js'

export function compact(root: LHAST.Root): LHAST_COMPACT.Root {
  return transformRoot(root)
}
