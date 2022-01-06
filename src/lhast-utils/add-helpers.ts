import * as LHAST from '@src/lhast.js'
import { Mixin } from 'hotypes'
import { isParent } from './is.js'
import { isntUndefined } from '@blackglory/types'
import { nanoid } from 'nanoid'
import cloneDeep from 'lodash.clonedeep'

type NullOrNodeWithHelpers<T extends LHAST.Node | null> =
  T extends null
  ? null
  : NodeWithHelpers<NonNullable<T>>

export type NodeWithHelpers<
  Node extends LHAST.Node
, Sibling extends LHAST.Node | null = LHAST.Node | null
, Parent extends LHAST.Node | null = LHAST.Node | null
> =
  Node extends LHAST.Root
  ? Mixin<Node, {
      id: string
      parent: null
      index: null
      previousSibling: null
      nextSibling: null
      children: Array<NodeWithHelpers<LHAST.RootContent, LHAST.RootContent, LHAST.Root>>
    }>
: Node extends LHAST.Element
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          LHAST.ElementContent
        , LHAST.ElementContent
        , LHAST.Element
        >
      >
    }>
: Mixin<Node, {
    id: string
    parent: NullOrNodeWithHelpers<Parent>
    index: number | null
    previousSibling: NullOrNodeWithHelpers<Sibling>
    nextSibling: NullOrNodeWithHelpers<Sibling>
  }>

export function addHelpers<T extends LHAST.Node>(node: T): NodeWithHelpers<T> {
  return addHelpersInPlace(cloneDeep(node))
}

export function addHelpersInPlace<T extends LHAST.Node>(node: T): NodeWithHelpers<T> {
  addHelpersToTree(node)
  return node as NodeWithHelpers<T>
}

function addHelpersToTree<
  Node extends LHAST.Node
, Parent extends LHAST.Node & LHAST.Parent
>(
  node: Node
, parent?: Parent
, index?: number
): void {
  const wrappedNode = node as any
  wrappedNode.parent = null
  wrappedNode.index = null
  wrappedNode.previousSibling = null
  wrappedNode.nextSibling = null
  wrappedNode.id = nanoid()

  if (isntUndefined(parent)) {
    wrappedNode.parent = parent as unknown as NodeWithHelpers<Parent>

    if (isntUndefined(index)) {
      const previousSibling = parent.children[index - 1]
      const nextSibling = parent.children[index + 1]

      wrappedNode.index = index
      wrappedNode.previousSibling = previousSibling ?? null
      wrappedNode.nextSibling = nextSibling ?? null
    }
  }

  if (isParent(wrappedNode)) {
    addHelpersToChildren(wrappedNode)
  }
}

function addHelpersToChildren(parent: LHAST.Node & LHAST.Parent): void { 
  parent.children.forEach((node, i) => addHelpersToTree(node, parent, i))
}
