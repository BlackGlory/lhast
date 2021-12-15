import * as LHAST from '@src/lhast.js'
import { isParent } from './is.js'

export function* traverseDescendantNodes(node: LHAST.Node): Iterable<LHAST.Node> {
  if (isParent(node)) {
    for (const childNode of node.children) {
      yield childNode
      if (isParent(childNode)) {
        yield* traverseDescendantNodes(childNode)
      }
    }
  }
}
