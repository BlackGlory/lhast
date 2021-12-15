// https://github.com/syntax-tree/hast/tree/2.4.0
import { Parent as UnistParent, Literal as UnistLiteral, Node } from 'unist'
export { Node } from 'unist'

// Nodes

export interface Parent extends UnistParent {
  children: Node[]
}

interface Literal extends UnistLiteral {
  value: string
}

export interface Root extends Parent {
  type: 'root'
  children: RootContent[]
}

export interface Element extends Parent {
  type: 'element'
  tagName: string
  properties?: Properties
  content?: Root
  children: ElementContent[]
}

export interface Doctype extends Node {
  type: 'doctype'
}

export interface Comment extends Literal {
  type: 'comment'
}

export interface Text extends Literal {
  type: 'text'
}

// Attributes

export type Properties = Record<string, boolean | number | string | string[]>

// Content model

export type RootContent =
| Element
| Doctype
| Comment
| Text

export type ElementContent =
| Element
| Comment
| Text
