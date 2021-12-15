import * as LHAST from '@src/lhast.js'
import * as LHAST_COMPACT from '@src/lhast-compact.js'
import * as IS from '@src/lhast-utils/is.js'
import { CustomError } from '@blackglory/errors'
import { isntUndefined, isEmptyObject } from '@blackglory/types'

export class UnknownNodeError extends CustomError {
  constructor(node: LHAST.Node) {
    super(JSON.stringify(node, null, 2))
  }
}

export function transformRoot(node: LHAST.Root): LHAST_COMPACT.Root {
  return map(node.children, transformRootContent)
}

export function transformRootContent(node: LHAST.RootContent): LHAST_COMPACT.RootContent | undefined {
  if (IS.isElement(node)) return transformElement(node)
  if (IS.isText(node)) return transformText(node)
}

export function transformElement(node: LHAST.Element): LHAST_COMPACT.Element {
  if (isEmptyObject(node.properties)) {
    return [
      node.tagName
    , ...map(node.children, transformElementContent)
    ]
  } else {
    return [
      node.tagName
    , node.properties
    , ...map(node.children, transformElementContent)
    ]
  }
}

export function transformElementContent(node: LHAST.ElementContent): LHAST_COMPACT.ElementContent {
  if (IS.isElement(node)) return transformElement(node)
  if (IS.isText(node)) return transformText(node)
  throw new UnknownNodeError(node)
}

export function transformText(node: LHAST.Text): LHAST_COMPACT.Text {
  return node.value
}

function map<T, V>(arr: T[], fn: (x: T) => V | undefined): V[] {
  return arr
    .map(x => fn(x))
    .filter(isntUndefined)
}
