import { find } from '@lhast-utils/find.js'
import { isText } from '@lhast-utils/is.js'
import { root, element, text } from '@lhast-utils/builder.js'

describe('find', () => {
  it('is preorder', () => {
    const ast =
      root([
        element('p', {}, [
          text('text')
        ])
      ])

    const result: string[] = []
    find(ast, node => {
      result.push(node.type)
      return false
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
    find(ast, node => {
      if (isText(node)) result.push(node.value)
      return false
    })

    expect(result).toEqual(['deep', 'shallow'])
  })

  describe('found', () => {
    it('return found target', () => {
      const ast =
        root([
          element('p', {}, [
            text('inside emphasis')
          ])
        ])

      const result = find(ast, isText)

      expect(result).toStrictEqual(
        text('inside emphasis')
      )
    })
  })

  describe('not found', () => {
    it('return undefined', () => {
      const ast =
        root([
          element('p', {}, [
            text('inside emphasis')
          ])
        ])

      const result = find(ast, () => false)

      expect(result).toBeUndefined()
    })
  })
})
