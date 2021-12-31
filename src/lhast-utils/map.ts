import * as LHAST from '@src/lhast.js'
import { isParent } from './is.js'

export function map(
  node: LHAST.Node
, fn: (node: LHAST.Node) => LHAST.Node
): LHAST.Node {
  return map(node, fn)

  function map(
    node: LHAST.Node
  , fn: (node: LHAST.Node) => LHAST.Node
  ): LHAST.Node {
    const newNode = fn(node)

    if (isParent(newNode)) {
      return {
        ...newNode
      , children: newNode.children.map(x => map(x, fn))
      } as LHAST.Node & LHAST.Parent 
    }

    return newNode
  }
}
