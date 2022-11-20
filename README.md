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
```ts
const LHASTSchema
```

### LHASTCompactSchema
```ts
const LHASTCompactSchema
```

### utils
#### builder
```ts
import * as Builder from 'lhast/utils/builder'
```

Each lhast node has a corresponding builder.

#### is
```ts
import * as Is from 'lhast/utils/is'
```

Each lhast node has a corresponding `is` function.

#### flatMap
```ts
import { flatMap } from 'lhast/utils/flat-map'

function flatMap(
  node: LHAST.Node
, fn: (node: LHAST.Node) => AST.Node[]
): LHAST.Node[]
```

#### map
```ts
import { map } from 'lhast/utils/map'

function map(
  node: LHAST.Node
, fn: (node: LHAST.Node) => AST.Node
): LHAST.Node
```

#### filter
```ts
import { filter } from 'lhast/utils/filter'

function filter(
  node: LHAST.Node
, predicate: (node: LHAST.Node) => unknown
): LHAST.Node | undefined
```

#### find
```ts
import { find } from 'lhast/utils/find'

function find<T extends LHAST.Node>(
  node: LHAST.Node
, predicate: (node: LHAST.Node) => boolean
): T | undefined
```

#### findAll
```ts
import { findAll } from 'lhast/utils/find-all'

function* findAll<T extends LHAST.Node>(
  node: LHAST.Node
, predicate: (node: LHAST.Node) => boolean
): Iterable<T>
```

#### traverseDescendantNodes
```ts
import { traverseDescendantNodes } from 'lhast/utils/traverse-descendant-nodes'

function traverseDescendantNodes(node: LHAST.Node): Iterable<LHAST.Node>
```

#### reverse
```ts
import { reverse } from 'lhast/utils/reverse'

function reverse(root: LHAST.Root): LHAST.Root
```

#### addHelpers
```ts
import { addHelpers, addHelpersInPlace, NodeWithHelpers } from 'lhast/utils/add-helpers'

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

function addHelpers<T extends LHAST.Node>(node: T): NodeWithHelpers<T>
function addHelpersInPlace<T extends LHAST.Node>(node: T): NodeWithHelpers<T>
```

#### removeHelpers
```ts
import { removeHelpers, removeHelpersInPlace } from 'lhast/utils/remove-helpers'

function removeHelpers<T extends LHAST.Node>(node: NodeWithHelpers<T>): T
function removeHelpersInPlace<T extends LHAST.Node>(node: NodeWithHelpers<T>): T
```

#### withHelpers

```ts
import { withHelpers, withHelpersInPlace } from 'lhast/utils/with-helpers'

function withHelpers<T extends AST.Node, U>(
  node: T
, fn: (node: NodeWithHelpers<T>) => U
): U
function withHelpersInPlace<T extends AST.Node, U>(
  node: T
, fn: (node: NodeWithHelpers<T>) => U
): U
```
