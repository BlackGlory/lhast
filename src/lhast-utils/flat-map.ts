import * as LHAST from '@src/lhast.js'
import { isParent } from './is.js'
import 'core-js/features/array/flat-map.js'

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
        , children: node.children.flatMap(x => flatMap(x, fn))
        }
      }

      return node
    })
  }
}
