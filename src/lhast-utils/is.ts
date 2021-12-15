import * as LHAST from '@src/lhast.js'

function is<T extends LHAST.Node>(node: LHAST.Node, type: string): node is T {
  return node.type === type
}

export function isParent(node: LHAST.Node): node is LHAST.Node & LHAST.Parent {
  return 'children' in node
}

export function isRootContent(node: LHAST.Node): node is LHAST.RootContent {
  return isElement(node)
      || isText(node)
}

export function isElementContent(node: LHAST.Node): node is LHAST.ElementContent {
  return isElement(node)
      || isText(node)
}

export function isRoot(node: LHAST.Node): node is LHAST.Root {
  return is(node, 'root')
}

export function isElement(node: LHAST.Node): node is LHAST.Element {
  return is(node, 'element')
}

export function isText(node: LHAST.Node): node is LHAST.Text {
  return is(node, 'text')
}
