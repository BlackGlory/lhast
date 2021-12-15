import * as LHAST from '@src/lhast.js'
import { isParent } from './is.js'
import cloneDeep from 'lodash.clonedeep'
import 'core-js/features/array/flat-map.js'

export function flatMap(
  node: LHAST.Node
, fn: (node: LHAST.Node) => LHAST.Node[]
): LHAST.Node[] {
  return flatMap(cloneDeep(node), fn)

  function flatMap(
    node: LHAST.Node
  , fn: (node: LHAST.Node) => LHAST.Node[]
  ): LHAST.Node[] {
    const newNodes = fn(node)

    return newNodes.map(node => {
      if (isParent(node)) {
        node.children = node.children.flatMap(x => flatMap(x, fn))
      }

      return node
    })
  }
}
