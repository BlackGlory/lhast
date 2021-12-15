import * as AST from '@src/lhast.js'
import { Mixin } from 'hotypes'
import { isParent } from './is.js'
import cloneDeep from 'lodash.clonedeep'
import { isntUndefined } from '@blackglory/types'
import { nanoid } from 'nanoid'

type NullOrWrappedNode<T extends AST.Node | null> =
  T extends null
  ? null
  : WrappedNode<NonNullable<T>>

export type WrappedNode<
  Node extends AST.Node
, Sibling extends AST.Node | null = AST.Node | null
, Parent extends AST.Node | null = AST.Node | null
> =
  Node extends AST.Root
  ? Mixin<Node, {
      id: string
      parent: null
      index: null
      previousSibling: null
      nextSibling: null
      children: Array<WrappedNode<AST.RootContent, AST.RootContent, AST.Root>>
    }>
: Node extends AST.Element
  ? Mixin<Node, {
      id: string
      parent: NullOrWrappedNode<Parent>
      index: number
      previousSibling: NullOrWrappedNode<Sibling>
      nextSibling: NullOrWrappedNode<Sibling>
      children: Array<
        WrappedNode<
          AST.ElementContent
        , AST.ElementContent
        , AST.Element
        >
      >
    }>
: Mixin<Node, {
    id: string
    parent: NullOrWrappedNode<Parent>
    index: number | null
    previousSibling: NullOrWrappedNode<Sibling>
    nextSibling: NullOrWrappedNode<Sibling>
  }>

export function wrap<T extends AST.Node>(node: T): WrappedNode<T> {
  const clone = cloneDeep(node)
  wrapNode(clone)
  return clone as WrappedNode<T>
}

function wrapNode<
  Node extends AST.Node
, Parent extends AST.Node & AST.Parent
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
    wrappedNode.parent = parent as unknown as WrappedNode<Parent>

    if (isntUndefined(index)) {
      const previousSibling = parent.children[index - 1]
      const nextSibling = parent.children[index + 1]

      wrappedNode.index = index
      wrappedNode.previousSibling = previousSibling ?? null
      wrappedNode.nextSibling = nextSibling ?? null
    }
  }

  if (isParent(wrappedNode)) {
    wrapChildren(wrappedNode)
  }
}

function wrapChildren(parent: AST.Node & AST.Parent): void { 
  parent.children.forEach((node, i) => wrapNode(node, parent, i))
}
