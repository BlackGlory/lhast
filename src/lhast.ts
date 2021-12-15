export interface Node {
  type: string
}

export interface Parent {
  children: Node[]
}

export interface ParentOf<T extends Node[]> extends Parent {
  children: T
}

export interface Root extends Node, ParentOf<RootContent[]> {
  type: 'root'
}

export interface Element extends Node, ParentOf<ElementContent[]> {
  type: 'element'
  tagName: string
  properties: Properties
}

export interface Text extends Node {
  type: 'text'
  value: string
}

export type RootContent =
| Element
| Text

export type ElementContent =
| Element
| Text

export type Properties = Record<string, boolean | number | string | string[]>
