# lhast
**L**ightweight **H**ypertext **A**bstract **S**yntax **T**ree.

A lightweight version of [hast v2.4] with a more compact format for serialization.

[hast v2.4]: https://github.com/syntax-tree/hast/tree/2.4.0

## Intall
```sh
npm install --save lhast
# or
yarn add lhast
```

## API
### LHAST
```ts
interface Node {
  type: string
}

interface Parent {
  children: Node[]
}

interface ParentOf<T extends Node[]> extends Parent {
  children: T
}

interface Root extends Node, ParentOf<RootContent[]> {
  type: 'root'
}

interface Element extends Node, ParentOf<ElementContent[]> {
  type: 'element'
  tagName: string
  properties: Properties
}

interface Text extends Node {
  type: 'text'
  value: string
}

type RootContent =
| Element
| Text

type ElementContent =
| Element
| Text

type Properties = Record<string, boolean | number | string | string[]>
```

### LHASTCompact
```ts
type Node =
| Root
| Element
| Text

type Root = RootContent[]

type Element = ElementWithProperties | ElementWithoutProperties

type ElementWithProperties = [
  tagName: string
, properties: Properties
, ...children: ElementContent[]
]

type ElementWithoutProperties = [
  tagName: string
, ...children: ElementContent[]
]

type Text = string

type RootContent =
| Element
| Text

type ElementContent =
| Element
| Text

type Properties = Record<string, boolean | number | string | string[]>
```

### parseDocument
```ts
function parseDocument(html: string): LHAST.Root
```

### parseFragment
```ts
function parseFragment(html: string): LHAST.Root
```

### compact
```ts
function compact(root: LHAST.Root): LHASTCompact.Root
```

### uncompact
```ts
function uncompact(root: LHAST.COMPACT.Root): LHAST.Root
```

### validateLHAST
```ts
function validateLHAST(data: unknown): void
```

### validateLHASTCompact
```ts
function validateLHASTCompact(data: unknown): void
```

### isAST
```ts
function isLHAST(data: unknown): data is LHAST.Root
```

### isLHASTCompact
```ts
function isLHASTCompact(data: unknown): data is LHASTCompact.Root
```

### LHASTSchema
```
const LHASTSchema
```

### LHASTCompactSchema
```
const LHASTCompactSchema
```

### utils
#### builder
```ts
import {} from 'lhast/utils/builder.js'
```

Each lhast node has a corresponding builder.

#### is
```ts
import {} from 'lhast/utils/is.js'
```

Each lhast node has a corresponding `is` function.

#### flatMap
```ts
import { flatMap } from 'lhast/utils/flatMap.js'

function flatMap(
  node: LHAST.Node
, fn: (node: LHAST.Node) => AST.Node[]
): LHAST.Node[]
```

#### map
```ts
import { map } from 'lhast/utils/map.js'

function map(
  node: LHAST.Node
, fn: (node: LHAST.Node) => AST.Node
): LHAST.Node
```

#### filter
```ts
import { filter } from 'lhast/utils/filter.js'

function filter(
  node: LHAST.Node
, predicate: (node: LHAST.Node) => unknown
): LHAST.Node | undefined
```

#### find
```ts
import { find } from 'lhast/utils/find.js'

function find<T extends LHAST.Node>(
  node: LHAST.Node
, predicate: (node: LHAST.Node) => boolean
): T | undefined
```

#### findAll
```ts
import { findAll } from 'lhast/utils/find-all.js'

function* findAll<T extends LHAST.Node>(
  node: LHAST.Node
, predicate: (node: LHAST.Node) => boolean
): Iterable<T>
```

#### traverseDescendantNodes
```ts
import { traverseDescendantNodes } from 'lhast/utils/traverse-descendant-nodes.js'

function traverseDescendantNodes(node: LHAST.Node): Iterable<LHAST.Node>
```

#### concatContinuousText
```ts
import { concatContinuousText } from 'lhast/utils/concat-continuous-text.js'

function concatContinuousText(root: LHAST.Root): LHAST.Root
```

#### getTextContentForSearch
```ts
import { getTextContentForSearch } from 'lhast/utils/get-text-content-for-search.js'

function getTextContentForSearch(root: LHAST.Root): string
```

#### reduceWhitespaceCharacters
```ts
import { reduceWhitespaceCharacters } from 'lhast/utils/reduce-whitespace-characters.js'

function reduceWhitespaceCharacters(root: LHAST.Root): LHAST.Root
```

#### removeElements
```ts
import { removeElements } from 'lhast/utils/remove-elements.js'

function removeElements(
  predicate: (element: LHAST.Element) => boolean
): (root: LHAST.Root) => LHAST.Root
function removeElements(
  root: LHAST.Root
, predicate: (element: LHAST.Element) => boolean
): LHAST.Root
```

#### removeElementsByTags
```ts
import { removeElementsByTags } from 'lhast/utils/remove-elements-by-tags.js'

function removeElementsByTags(tagNames: string[]): (root: LHAST.Root) => LHAST.Root
function removeElementsByTags(root: LHAST.Root, tagNames: string[]): LHAST.Root
```

#### removeEmptyText
```ts
import { removeEmptyText } from 'lhast/utils/remove-empty-text.js'

function removeEmptyText(root: LHAST.Root): LHAST.Root
```

#### removeProperties
```ts
import { removeProperties } from 'lhast/utils/remove-properties.js'

function removeProperties(
  predicate: (propertyName: string, element: LHAST.Element) => boolean
): (root: LHAST.Root) => LHAST.Root
function removeProperties(
  root: LHAST.Root
, predicate: (propertyName: string, element: LHAST.Element) => boolean
): LHAST.Root
```

#### removePropertiesByNames
```ts
import { removePropertiesByNames } from 'lhast/utils/remove-properties-by-names.js'

function removePropertiesByNames(root: LHAST.Root, propNames: string[]): LHAST.Root
function removePropertiesByNames(propNames: string[]): (root: LHAST.Root) => LHAST.Root
```

#### removePropertiesByTags
```ts
import { removePropertiesByTags } from 'lhast/utils/remove-properties-by-tags.js'

function removePropertiesByTags(
  tagToPropNames: Record<string, string[]>
): (root: LHAST.Root) => LHAST.Root
function removePropertiesByTags(
  root: LHAST.Root
, tagToPropNames: Record<string, string[]>
): LHAST.Root
```

#### removeEventHandlers
```ts
import { removeEventHandlers } from 'lhast/utils/remove-event-handlers.js'

function removeEventHandlers(root: LHAST.Root): LHAST.Root
```

#### removeDataAttributes
```ts
import { removeDataAttributes } from 'lhast/utils/remove-data-attributes'

function removeDataAttributes(root: LHAST.Root): LHAST.Root
```

#### unwrapElements
```ts
import { unwrapElements } from 'lhast/utils/unwrap-elements.js'

function unwrapElements(
  predicate: (element: LHAST.Element) => boolean
): (root: LHAST.Root) => LHAST.Root
function unwrapElements(
  root: LHAST.Root
, predicate: (element: LHAST.Element) => boolean
): LHAST.Root
```

#### unwrapElementsByTags
```ts
import { unwrapElementsByTags } from 'lhast/utils/unwrap-elements-by-tags.js'

function unwrapElementsByTags(tagNames: string[]): (root: LHAST.Root) => LHAST.Root 
function unwrapElementsByTags(root: LHAST.Root, tagNames: string[]): LHAST.Root
```

#### addHelpersInPlace
```ts
import { addHelpersInPlace, NodeWithHelpers } from 'lhast/utils/add-helpers.js'

type NullOrNodeWithHelpers<T extends LHAST.Node | null> =
  T extends null
  ? null
  : NodeWithHelpers<NonNullable<T>>

type NodeWithHelpers<
  Node extends LHAST.Node
, Sibling extends LHAST.Node | null = AST.Node | null
, Parent extends LHAST.Node | null = AST.Node | null
> =
  Node extends LHAST.Root
  ? Mixin<Node, {
      id: string
      parent: null
      index: null
      previousSibling: null
      nextSibling: null
      children: Array<NodeWithHelpers<LHAST.RootContent, AST.RootContent, AST.Root>>
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

function addHelpersInPlace<T extends LHAST.Node>(node: T): NodeWithHelpers<T>
```

#### removeHelpersInPlace
```ts
import { removeHelpersInPlace } from 'lhast/utils/remove-helpers.js'

function removeHelpersInPlace<T extends LHAST.Node>(node: NodeWithHelpers<T>): T
```
