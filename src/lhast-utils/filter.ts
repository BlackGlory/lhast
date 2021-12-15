import { flatMap } from './flat-map.js'
import * as LHAST from '@src/lhast.js'

export function filter(
  node: LHAST.Node
, predicate: (node: LHAST.Node) => unknown
): LHAST.Node | undefined {
  const results = flatMap(node, node => {
    if (predicate(node)) {
      return [node]
    } else {
      return []
    }
  })

  if (results.length === 1) return results[0]
  return undefined
}
