import * as LHAST from '@src/lhast.js'
import { traverseDescendantNodes } from './traverse-descendant-nodes.js'
import { isText, isElement } from './is.js'
import { isString } from '@blackglory/types'

// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
export function getTextContentForSearch(root: LHAST.Root): string {
  const results: string[] = []

  for (const node of traverseDescendantNodes(root)) {
    if (isText(node)) {
      results.push(node.value)
    } else if (isElement(node)) {
      if (isString(node.properties.title)) {
        results.push(node.properties.title)
      }
      if (node.tagName === 'img') {
        if (isString(node.properties.alt)) {
          results.push(node.properties.alt)
        }
      }
    }
  }

  return results
    .join(' ')
    .replace(/\s+/g, ' ')
}
