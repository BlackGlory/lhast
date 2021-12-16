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
### AST
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

### AST_COMPACT
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
function parseDocument(html: string): AST.Root
```

### parseFragment
```ts
function parseFragment(html: string): AST.Root
```

### compact
```ts
function compact(root: AST.Root): AST_COMPACT.Root
```

### uncompact
```ts
function uncompact(root: AST_COMPACT.Root): AST.Root
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
  node: AST.Node
, fn: (node: AST.Node) => AST.Node[]
): AST.Node[]
```

#### map
```ts
import { map } from 'lhast/utils/map.js'

function map(
  node: AST.Node
, fn: (node: AST.Node) => AST.Node
): AST.Node
```

#### filter
```ts
import { filter } from 'lhast/utils/filter.js'

function filter(
  node: AST.Node
, predicate: (node: AST.Node) => unknown
): AST.Node | undefined
```

#### find
```ts
import { find } from 'lhast/utils/find.js'

function find<T extends AST.Node>(
  node: AST.Node
, predicate: (node: AST.Node) => boolean
): T | undefined
```

#### findAll
```ts
import { findAll } from 'lhast/utils/find-all.js'

function* findAll<T extends AST.Node>(
  node: AST.Node
, predicate: (node: AST.Node) => boolean
): Iterable<T>
```

#### traverseDescendantNodes
```ts
import { traverseDescendantNodes } from 'lhast/utils/traverse-descendant-nodes.js'

function traverseDescendantNodes(node: AST.Node): Iterable<AST.Node>
```

#### addHelpers
```ts
import { addHelpers, NodeWithHelpers } from 'lhast/utils/add-helpers.js'

type NullOrNodeWithHelpers<T extends AST.Node | null> =
  T extends null
  ? null
  : NodeWithHelpers<NonNullable<T>>

type NodeWithHelpers<
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
      children: Array<NodeWithHelpers<AST.RootContent, AST.RootContent, AST.Root>>
    }>
: Node extends AST.Element
  ? Mixin<Node, {
      id: string
      parent: NullOrNodeWithHelpers<Parent>
      index: number
      previousSibling: NullOrNodeWithHelpers<Sibling>
      nextSibling: NullOrNodeWithHelpers<Sibling>
      children: Array<
        NodeWithHelpers<
          AST.ElementContent
        , AST.ElementContent
        , AST.Element
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

function addHelpers<T extends AST.Node>(node: T): NodeWithHelpers<T>
```

#### removeHelpers
```ts
import { removeHelpers } from 'lhast/utils/remove-helpers.js'

function removeHelpers<T extends AST.Node>(node: NodeWithHelpers<T>): T
```
