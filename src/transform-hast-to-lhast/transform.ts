import * as HAST from '@src/hast-2.4.js'
import * as LHAST from '@src/lhast.js'
import * as HAST_IS from '@hast-utils/is.js'
import { CustomError } from '@blackglory/errors'
import { isntUndefined } from '@blackglory/types'

export class UnknownNodeError extends CustomError {
  constructor(node: HAST.Node) {
    super(JSON.stringify(node, null, 2))
  }
}

export function transformRoot(root: HAST.Root): LHAST.Root {
  return {
    type: 'root'
  , children: map(root.children, transformRootContent)
  }
}

function transformRootContent(node: HAST.RootContent): LHAST.RootContent | undefined {
  if (HAST_IS.isElement(node)) return transformElement(node)
  if (HAST_IS.isDoctype(node)) return transformDoctype(node)
  if (HAST_IS.isComment(node)) return transformComment(node)
  if (HAST_IS.isText(node)) return transformText(node)
  throw new UnknownNodeError(node)
}

function transformElement(node: HAST.Element): LHAST.Element {
  return {
    type: 'element'
  , tagName: node.tagName
  , properties: node.properties ?? {}
  , children: node.tagName === 'template'
            ? transformRoot(node.content!).children
            : map(node.children, transformElementContent)
  }
}

function transformElementContent(node: HAST.ElementContent): LHAST.ElementContent | undefined {
  if (HAST_IS.isElement(node)) return transformElement(node)
  if (HAST_IS.isComment(node)) return transformComment(node)
  if (HAST_IS.isText(node)) return transformText(node)
  throw new UnknownNodeError(node)
}

function transformDoctype(node: HAST.Doctype): undefined {
  return undefined
}

function transformComment(node: HAST.Comment): undefined {
  return undefined
}

function transformText(node: HAST.Text): LHAST.Text {
  return {
    type: 'text'
  , value: node.value
  }
}

function map<T, V>(arr: T[], fn: (x: T) => V | undefined): V[] {
  return arr
    .map(x => fn(x))
    .filter(isntUndefined)
}
