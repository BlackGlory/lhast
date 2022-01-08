import { generateTextContentsForSearch } from '@lhast-utils/generate-text-contents-for-search.js'
import * as L from '@lhast-utils/builder.js'
import { toArray } from 'iterable-operator'
import '@blackglory/jest-matchers'

describe('generateTextContentsForSearch', () => {
  test('text', () => {
    const ast = L.root([
      L.element('p', {}, [
        L.text('foo')
      ])
    , L.text('bar')
    ])

    const result = generateTextContentsForSearch(ast)
    const arrResult = toArray(result)

    expect(result).toBeIterable()
    expect(arrResult).toStrictEqual(['foo', 'bar'])
  })

  test('title', () => {
    const ast = L.root([
      L.element('p', { title: 'title' }, [
        L.text('foo')
      ])
    ])

    const result = generateTextContentsForSearch(ast)
    const arrResult = toArray(result)

    expect(result).toBeIterable()
    expect(arrResult).toStrictEqual(['title', 'foo'])
  })
  
  test('img alt', () => {
    const ast = L.root([
      L.element('img', { alt: 'alt' }, [])
    ])

    const result = generateTextContentsForSearch(ast)
    const arrResult = toArray(result)

    expect(result).toBeIterable()
    expect(arrResult).toStrictEqual(['alt'])
  })
})
