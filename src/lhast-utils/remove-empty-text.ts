import * as LHAST from '@src/lhast.js'
import { filter } from './filter.js'
import { isText } from './is.js'

export function removeEmptyText(root: LHAST.Root): LHAST.Root {
  return filter(
    root
  , node => !(isText(node) && node.value === '')
  ) as LHAST.Root
}
