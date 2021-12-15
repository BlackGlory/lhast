import * as LHAST from '@src/lhast.js'
import * as LHAST_COMPACT from '@src/lhast-compact.js'
import { CustomError } from '@blackglory/errors'
import { isntUndefined } from '@blackglory/types'
import { isArray as isElement, isString as isText, isPlainObject } from '@blackglory/types'

export class UnknownNodeError extends CustomError {
  constructor(node: LHAST_COMPACT.Node) {
    super(JSON.stringify(node, null, 2))
  }
}

export function transformRoot(node: LHAST_COMPACT.Root): LHAST.Root {
  return {
    type: 'root'
  , children: map(node, transformRootContent)
  }
}

export function transformRootContent(node: LHAST_COMPACT.RootContent): LHAST.RootContent {
  if (isElement(node)) return transformElement(node)
  if (isText(node)) return transformText(node)
  throw new UnknownNodeError(node)
}

export function transformElement(node: LHAST_COMPACT.Element): LHAST.Element {
  if (isPlainObject(node[1])) {
    const [tagName, properties, ...children] = node

    return {
      type: 'element'
    , tagName
    , properties
    , children: map(children, transformElementContent)
    }
  } else {
    const [tagName, ...children] = node

    return {
      type: 'element'
    , tagName
    , properties: {}
    , children: map(
        children as LHAST_COMPACT.ElementContent[]
      , transformElementContent
      )
    }
  }
}

export function transformElementContent(node: LHAST_COMPACT.ElementContent): LHAST.ElementContent {
  if (isElement(node)) return transformElement(node)
  if (isText(node)) return transformText(node)
  throw new UnknownNodeError(node)
}

export function transformText(node: LHAST_COMPACT.Text): LHAST.Text {
  return {
    type: 'text'
  , value: node
  }
}

function map<T, V>(arr: T[], fn: (x: T) => V | undefined): V[] {
  return arr
    .map(x => fn(x))
    .filter(isntUndefined)
}
