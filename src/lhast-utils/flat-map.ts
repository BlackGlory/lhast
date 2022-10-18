import * as LHAST from '@src/lhast.js'
import { isParent } from './is.js'
import { flatten, map, toArray } from 'iterable-operator'

export function flatMap(
  node: LHAST.Node
, fn: (node: LHAST.Node) => LHAST.Node[]
): LHAST.Node[] {
  return flatMap(node, fn)

  function flatMap(
    node: LHAST.Node
  , fn: (node: LHAST.Node) => LHAST.Node[]
  ): LHAST.Node[] {
    const newNodes = fn(node)

    return newNodes.map(node => {
      if (isParent(node)) {
        return {
          ...node
        , children: toArray(flatten(map(node.children, x => flatMap(x, fn))))
        }
      }

      return node
    })
  }
}
