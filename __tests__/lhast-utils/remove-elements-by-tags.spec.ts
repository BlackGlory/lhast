import { removeElementsByTags } from '@lhast-utils/remove-elements-by-tags.js'
import * as L from '@lhast-utils/builder.js'

test('removeElementsByTags', () => {
  const ast = L.root([
    L.element('html', {}, [
      L.element('head', {}, [
        L.element('title', {}, [
          L.text('title')
        ])
      ])
    , L.element('body', {}, [
        L.text('foo')
      ])
    ])
  ])

  const result1 = removeElementsByTags(ast, ['head'])
  const result2 = removeElementsByTags(['head'])(ast)

  expect(result1).toStrictEqual(result2)
  expect(result1).toStrictEqual(
    L.root([
      L.element('html', {}, [
        L.element('body', {}, [
          L.text('foo')
        ])
      ])
    ])
  )
})
