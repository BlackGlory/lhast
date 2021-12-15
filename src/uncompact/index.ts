import * as LHAST from '@src/lhast.js'
import * as LHAST_COMPACT from '@src/lhast-compact.js'
import { transformRoot } from './transform.js'

export function uncompact(root: LHAST_COMPACT.Root): LHAST.Root {
  return transformRoot(root)
}
