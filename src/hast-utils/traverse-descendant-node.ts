import * as HAST from '@src/hast-2.4.js'
import { isParent } from './is.js'

export function* traverseDescendantNodes(parent: HAST.Parent): Iterable<HAST.Node> {
  for (const childNode of parent.children) {
    yield childNode
    if (isParent(childNode)) {
      yield* traverseDescendantNodes(childNode)
    }
  }
}
