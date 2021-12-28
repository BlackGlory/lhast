import { getTextContentForSearch } from '@lhast-utils/get-text-content-for-search.js'
import * as L from '@lhast-utils/builder.js'

describe('getTextContentForSearch', () => {
  test('text', () => {
    const ast = L.root([
      L.element('p', {}, [
        L.text('foo')
      ])
    , L.text('bar')
    ])

    const result = getTextContentForSearch(ast)

    expect(result).toBe('foo bar')
  })

  test('title', () => {
    const ast = L.root([
      L.element('p', { title: 'title' }, [
        L.text('foo')
      ])
    ])

    const result = getTextContentForSearch(ast)

    expect(result).toBe('title foo')
  })
  
  test('img alt', () => {
    const ast = L.root([
      L.element('img', { alt: 'alt' }, [])
    ])

    const result = getTextContentForSearch(ast)

    expect(result).toBe('alt')
  })
})
