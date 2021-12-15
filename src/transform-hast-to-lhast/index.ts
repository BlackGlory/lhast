import * as LHAST from '@src/lhast.js'
import * as HAST from '@src/hast-2.4.js'
import { transformRoot } from './transform.js'

export function transform(root: HAST.Root): LHAST.Root {
  return transformRoot(root)
}
