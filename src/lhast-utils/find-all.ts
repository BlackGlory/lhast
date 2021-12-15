import * as LHAST from '@src/lhast.js'
import { traverseDescendantNodes } from './traverse-descendant-nodes.js'
import { filter } from 'iterable-operator'

export function* findAll<T extends LHAST.Node>(
  node: LHAST.Node
, predicate: (node: LHAST.Node) => boolean
): Iterable<T> {
  if (predicate(node)) yield node as T

  yield* filter(traverseDescendantNodes(node), node => predicate(node))
}
