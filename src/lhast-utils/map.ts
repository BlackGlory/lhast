import * as LHAST from '@src/lhast.js'
import { isParent } from './is.js'
import cloneDeep from 'lodash.clonedeep'

export function map(
  node: LHAST.Node
, fn: (node: LHAST.Node) => LHAST.Node
): LHAST.Node {
  return map(cloneDeep(node), fn)

  function map(
    node: LHAST.Node
  , fn: (node: LHAST.Node) => LHAST.Node
  ): LHAST.Node {
    const newNode = fn(node)

    if (isParent(newNode)) {
      newNode.children = newNode.children.map(x => map(x, fn))
    }

    return newNode
  }
}
