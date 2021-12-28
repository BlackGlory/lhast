import * as LHAST from '@src/lhast.js'
import { map } from './map.js'
import { isElement } from './is.js'

export function removeProperties(
  predicate: (propertyName: string, element: LHAST.Element) => boolean
): (root: LHAST.Root) => LHAST.Root
export function removeProperties(
  root: LHAST.Root
, predicate: (propertyName: string, element: LHAST.Element) => boolean
): LHAST.Root
export function removeProperties(
  ...args: 
  | [predicate: (propertyName: string, element: LHAST.Element) => boolean]
  | [root: LHAST.Root, predicate: (propertyName: string, element: LHAST.Element) => boolean]
) {
  if (args.length === 1) {
    const [predicate] = args
    return (root: LHAST.Root) => removeProperties(root, predicate)
  }

  const [root, predicate] = args

  return map(
    root
  , node => {
      if (isElement(node)) {
        Object.keys(node.properties)
          .filter(x => predicate(x, node))
          .forEach(x => delete node.properties[x])
      }
      return node
    }
  ) as LHAST.Root
}
