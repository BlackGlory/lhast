import * as LHAST from '@src/lhast.js'
import { map } from './map.js'
import { isParent } from './is.js'

export function reverse(root: LHAST.Root): LHAST.Root {
  return map(
    root
  , node => {
      if (isParent(node)) {
        return {
          ...node
        , children: reverseArray(node.children)
        }
      }
      return node
    }
  ) as LHAST.Root
}

function reverseArray<T>(arr: T[]): T[] {
  const result: T[] = []
  for (const value of arr) {
    result.unshift(value)
  }
  return result
}
