import * as LHAST from '@src/lhast.js'
import { unwrapElements } from './unwrap-elements.js'

export function unwrapElementsByTags(
  tagNames: string[]
): (root: LHAST.Root) => LHAST.Root 
export function unwrapElementsByTags(
  root: LHAST.Root
, tagNames: string[]
): LHAST.Root
export function unwrapElementsByTags(
  ...args:
  | [tagNames: string[]]
  | [root: LHAST.Root, tagNames: string[]]
) {
  if (args.length === 1) {
    const [tagNames] = args 
    return (root: LHAST.Root) => unwrapElementsByTags(root, tagNames)
  } else {
    const [root, tagNames] = args
    const lowerCasedTagNames = tagNames.map(x => x.toLowerCase())
    return unwrapElements(root, x => lowerCasedTagNames.includes(x.tagName))
  }
}
