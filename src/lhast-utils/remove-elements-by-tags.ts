import * as LHAST from '@src/lhast.js'
import { removeElements } from './remove-elements.js'

export function removeElementsByTags(
  tagNames: string[]
): (root: LHAST.Root) => LHAST.Root
export function removeElementsByTags(
  root: LHAST.Root
, tagNames: string[]
): LHAST.Root
export function removeElementsByTags(
  ...args:
  | [tagNames: string[]]
  | [root: LHAST.Root, tagNames: string[]]
) {
  if (args.length === 1) {
    const [tagNames] = args
    return (root: LHAST.Root) => removeElementsByTags(root, tagNames)
  }

  const [root, tagNames] = args
  const lowerCasedTagNames = tagNames.map(tagName => tagName.toLowerCase())
  return removeElements(root, x => lowerCasedTagNames.includes(x.tagName))
}
