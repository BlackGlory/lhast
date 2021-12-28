import * as LHAST from '@src/lhast.js'
import { text } from './builder.js'
import { map } from './map.js'
import { isParent, isText } from './is.js'

export function concatContinuousText(root: LHAST.Root): LHAST.Root {
  return map(
    root
  , node => {
      if (isParent(node)) {
        const newChildren: LHAST.Node[] = node.children.reduce(
          (acc: LHAST.Node[], cur: LHAST.Node) => {
            const lastNode = last(acc)
            if (lastNode && isText(cur) && isText(lastNode)) {
              const newText = text(lastNode.value + cur.value)
              return [...acc.slice(0, -1), newText]
            } else {
              return [...acc, cur]
            }
          }
        , []
        )
        return { ...node, children: newChildren }
      }
      return node
    }
  ) as LHAST.Root
}

function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1]
}
