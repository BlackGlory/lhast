import * as HAST from '@src/hast-2.4.js'

function is<T extends HAST.Node>(node: HAST.Node, type: string): node is T {
  return node.type === type
}

export function isParent(node: HAST.Node): node is HAST.Parent {
  return 'children' in node
}

export function isRootContent(node: HAST.Node): node is HAST.RootContent {
  return isElement(node)
      || isDoctype(node)
      || isComment(node)
      || isText(node)
}

export function isElementContent(node: HAST.Node): node is HAST.ElementContent {
  return isElement(node)
      || isComment(node)
      || isText(node)
}

export function isRoot(node: HAST.Node): node is HAST.Root {
  return is(node, 'root')
}

export function isElement(node: HAST.Node): node is HAST.Element {
  return is(node, 'element')
}

export function isDoctype(node: HAST.Node): node is HAST.Doctype {
  return is(node, 'doctype')
}

export function isComment(node: HAST.Node): node is HAST.Comment {
  return is(node, 'comment')
}

export function isText(node: HAST.Node): node is HAST.Text {
  return is(node, 'text')
}
