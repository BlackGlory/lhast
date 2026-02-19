import { describe, test, expect } from 'vitest'
import { filter } from '@lhast-utils/filter.js'
import { isText, isElement } from '@lhast-utils/is.js'
import { root, element, text } from '@lhast-utils/builder.js'

describe('filter', () => {
  test('preorder', () => {
    const ast = root([
      element('p', {}, [
        text('text')
      ])
    ])

    const result: string[] = []
    filter(ast, node => {
      result.push(node.type)
      return true
    })

    expect(result).toEqual(['root', 'element', 'text'])
  })

  test('DFS', () => {
    const ast = root([
      element('p', {}, [
        text('deep')
      ])
    , text('shallow')
    ])

    const result: string[] = []
    filter(ast, node => {
      if (isText(node)) result.push(node.value)
      return true
    })

    expect(result).toEqual(['deep', 'shallow'])
  })

  test('create a new tree', () => {
    const ast = root([
      element('div', {}, [
        element('span', {}, [
          text('foo')
        ])
      , element('p', {}, [
          text('bar')
        ])
      ])
    ])

    const result = filter(ast, node => {
      if (isElement(node) && node.tagName === 'span') return false
      if (isText(node) && node.value === 'bar') return false
      return true
    })

    expect(result).toStrictEqual(
      root([
        element('div', {}, [
          element('p', {}, [])
        ])
      ])
    )
  })
})
