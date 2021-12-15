import { map } from '@lhast-utils/map.js'
import { isText, isElement } from '@lhast-utils/is.js'
import { root, element, text } from '@lhast-utils/builder.js'

describe('map', () => {
  it('is preorder', () => {
    const ast =
      root([
        element('p', {}, [
          text('text')
        ])
      ])

    const result: string[] = []
    map(ast, node => {
      result.push(node.type)
      return node
    })

    expect(result).toEqual(['root', 'element', 'text'])
  })

  it('is DFS', () => {
    const ast =
      root([
        element('p', {}, [
          text('deep')
        ])
      , text('shallow')
      ])

    const result: string[] = []
    map(ast, node => {
      if (isText(node)) result.push(node.value)
      return node
    })

    expect(result).toEqual(['deep', 'shallow'])
  })

  it('create a new tree', () => {
    const ast =
      root([
        element('p', {}, [
          text('inside emphasis')
        ])
      ])

    const result = map(ast, node => {
      if (isElement(node)) return element('div', {}, node.children)
      if (isText(node)) return text('inside strong')
      return node
    })

    expect(result).not.toBe(ast)
    expect(result).toStrictEqual(
      root([
        element('div', {}, [
          text('inside strong')
        ])
      ])
    )
  })
})
