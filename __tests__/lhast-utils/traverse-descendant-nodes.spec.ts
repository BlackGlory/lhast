import { describe, it, expect } from 'vitest'
import { traverseDescendantNodes } from '@lhast-utils/traverse-descendant-nodes.js'
import { isText } from '@lhast-utils/is.js'
import { root, element, text } from '@lhast-utils/builder.js'

describe('traverseDescendantNodes', () => {
  it('is preorder', () => {
    const ast = root([
      element('p', {}, [
        text('text')
      ])
    ])

    const result: string[] = []
    for (const node of traverseDescendantNodes(ast)) {
      result.push(node.type)
    }

    expect(result).toEqual(['element', 'text'])
  })

  it('is DFS', () => {
    const ast = root([
      element('p', {}, [
        text('deep')
      ])
    , text('shallow')
    ])

    const result: string[] = []
    for (const node of traverseDescendantNodes(ast)) {
      if (isText(node)) result.push(node.value)
    }

    expect(result).toEqual(['deep', 'shallow'])
  })
})
