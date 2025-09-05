import * as LHAST from '@src/lhast.js'
import * as LHASTCompact from '@src/lhast-compact.js'
import { CustomError, isntUndefined, isArray as isElement, isString as isText, isPlainObject } from '@blackglory/prelude'

export class UnknownNodeError extends CustomError {
  constructor(node: LHASTCompact.Node) {
    super(JSON.stringify(node, null, 2))
  }
}

export function transformRoot(node: LHASTCompact.Root): LHAST.Root {
  return {
    type: 'root'
  , children: map(node, transformRootContent)
  }
}

export function transformRootContent(node: LHASTCompact.RootContent): LHAST.RootContent {
  if (isElement(node)) return transformElement(node)
  if (isText(node)) return transformText(node)
  throw new UnknownNodeError(node)
}

export function transformElement(node: LHASTCompact.Element): LHAST.Element {
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
        children as LHASTCompact.ElementContent[]
      , transformElementContent
      )
    }
  }
}

export function transformElementContent(node: LHASTCompact.ElementContent): LHAST.ElementContent {
  if (isElement(node)) return transformElement(node)
  if (isText(node)) return transformText(node)
  throw new UnknownNodeError(node)
}

export function transformText(node: LHASTCompact.Text): LHAST.Text {
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
