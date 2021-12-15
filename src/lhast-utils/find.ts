import * as LHAST from '@src/lhast.js'
import { traverseDescendantNodes } from './traverse-descendant-nodes.js'
import { find as findInIterable } from 'iterable-operator'

export function find<T extends LHAST.Node>(
  node: LHAST.Node
, predicate: (node: LHAST.Node) => boolean
): T | undefined {
  if (predicate(node)) return node as T

  const result = findInIterable(
    traverseDescendantNodes(node)
  , node => predicate(node)
  )
  if (result) return result as T

  return undefined
}
