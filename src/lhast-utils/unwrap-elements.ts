import * as LHAST from '@src/lhast.js'
import { flatMap } from './flat-map.js'
import { isElement } from './is.js'

export function unwrapElements(
  predicate: (element: LHAST.Element) => boolean
): (root: LHAST.Root) => LHAST.Root
export function unwrapElements(
  root: LHAST.Root
, predicate: (element: LHAST.Element) => boolean
): LHAST.Root 
export function unwrapElements(
  ...args:
  | [predicate: (element: LHAST.Element) => boolean]
  | [root: LHAST.Root, predicate: (element: LHAST.Element) => boolean]
) {
  if (args.length === 1) {
    const [predicate] = args
    return (root: LHAST.Root) => unwrapElements(root, predicate)
  }

  const [root, predicate] = args
  return flatMap(root, node => _unwrapElements(node, predicate))[0]
}

function _unwrapElements(
  node: LHAST.Node
, predicate: (node: LHAST.Element) => boolean
): LHAST.Node[] {
  if (isElement(node) && predicate(node)) {
    // 由于flatMap不会进一步处理当前层的节点(只会进一步处理它们的子节点),
    // 所以如果新返回的当前层节点里存在需要拆箱的节点, 需要在这一层手动拆箱.
    return node.children.flatMap(x => flatMap(x, x => _unwrapElements(x, predicate)))
  }

  return [node]
}
