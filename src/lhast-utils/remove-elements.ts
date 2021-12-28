import * as LHAST from '@src/lhast.js'
import { filter } from './filter.js'
import { isElement } from './is.js'

export function removeElements(
  predicate: (element: LHAST.Element) => boolean
): (root: LHAST.Root) => LHAST.Root
export function removeElements(
  root: LHAST.Root
, predicate: (element: LHAST.Element) => boolean
): LHAST.Root
export function removeElements(
  ...args:
  | [predicate: (element: LHAST.Element) => boolean]
  | [root: LHAST.Root, predicate: (element: LHAST.Element) => boolean]
) {
  if (args.length === 1) {
    const [predicate] = args
    return (root: LHAST.Root) => removeElements(root, predicate)
  }

  const [root, predicate] = args
  return filter(
    root
  , node => !(isElement(node) && predicate(node))
  ) as LHAST.Root
}
