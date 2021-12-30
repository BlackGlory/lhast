import * as LHAST from '@src/lhast.js'
import { text } from './builder.js'
import { map } from './map.js'
import { isElement, isText } from './is.js'
import { addHelpers, NodeWithHelpers } from './add-helpers.js'
import { removeHelpers } from './remove-helpers.js'

export function reduceWhitespaceCharacters(root: LHAST.Root): LHAST.Root {
  const wrappedDocument = addHelpers(root)
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
  return removeHelpers(newRoot)
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
