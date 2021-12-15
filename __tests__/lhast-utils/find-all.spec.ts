import { findAll } from '@lhast-utils/find-all.js'
import { isText } from '@lhast-utils/is.js'
import { root, element, text } from '@lhast-utils/builder.js'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'

describe('findAll', () => {
  it('is preorder', () => {
    const ast =
      root([
        element('p', {}, [
          text('text')
        ])
      ])

    const result: string[] = []
    toArray(findAll(ast, node => {
      result.push(node.type)
      return false
    }))

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
    toArray(findAll(ast, node => {
      if (isText(node)) result.push(node.value)
      return false
    }))

    expect(result).toEqual(['deep', 'shallow'])
  })

  describe('found', () => {
    it('yield found target', () => {
      const ast =
        root([
          element('p', {}, [
            text('inside emphasis')
          ])
        , text('inside paragraph')
        ])

      const result = findAll(ast, isText)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toStrictEqual([
        text('inside emphasis')
      , text('inside paragraph')
      ])
    })
  })
})
