export type Node =
| Root
| Element
| Text

export type Root = RootContent[]

export type Element = ElementWithProperties | ElementWithoutProperties

export type ElementWithProperties = [
  tagName: string
, properties: Properties
, ...children: ElementContent[]
]

export type ElementWithoutProperties =
[
  tagName: string
, ...children: ElementContent[]
]

export type Text = string

export type RootContent =
| Element
| Text

export type ElementContent =
| Element
| Text

export type Properties = Record<string, boolean | number | string | string[]>
