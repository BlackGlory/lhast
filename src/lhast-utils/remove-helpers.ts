import * as LHAST from '@src/lhast.js'
import { NodeWithHelpers } from './add-helpers.js'
import { isParent } from './is.js'

export function removeHelpersInPlace<T extends LHAST.Node>(node: NodeWithHelpers<T>): T {
  removeHelpersForTree(node)
  return node as T
}

function removeHelpersForTree<T extends LHAST.Node>(node: NodeWithHelpers<T>): void {
  delete (node as Partial<NodeWithHelpers<T>>).parent
  delete (node as Partial<NodeWithHelpers<T>>).previousSibling
  delete (node as Partial<NodeWithHelpers<T>>).nextSibling
  delete (node as Partial<NodeWithHelpers<T>>).id
  delete (node as Partial<NodeWithHelpers<T>>).index

  if (isParent(node)) {
    removeHelpersForChildren(node)
  }
}

function removeHelpersForChildren(parent: NodeWithHelpers<LHAST.Node & LHAST.Parent>): void {
  parent.children.forEach(node => {
    removeHelpersForTree(node as NodeWithHelpers<LHAST.Node>)
  })
}
