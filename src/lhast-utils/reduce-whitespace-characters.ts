import * as LHAST from '@src/lhast.js'
import { text } from './builder.js'
import { map } from './map.js'
import { isElement, isText } from './is.js'
import { addHelpersInPlace, NodeWithHelpers } from './add-helpers.js'
import { removeHelpersInPlace } from './remove-helpers.js'

export function reduceWhitespaceCharacters(root: LHAST.Root): LHAST.Root {
  const wrappedDocument = addHelpersInPlace(root)
  const newRoot = map(
    wrappedDocument
  , node => {
      if (
        isText(node) &&
        !isDescendantOfPre(node as NodeWithHelpers<LHAST.Text>)
      ) {
        return text(node.value.trim().replace(/\s+/g, ' '))
      }
      return node
    }
  ) as NodeWithHelpers<LHAST.Root>
  return removeHelpersInPlace(newRoot)
}

function isDescendantOfPre(node: NodeWithHelpers<LHAST.Node>): boolean {
  let currentNode = node
  while (currentNode.parent) {
    if (
      isElement(currentNode.parent) &&
      currentNode.parent.tagName === 'pre'
    ) {
      return true
    }
    currentNode = currentNode.parent
  }
  return false
}
