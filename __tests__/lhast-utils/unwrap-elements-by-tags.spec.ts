import { unwrapElementsByTags } from '@lhast-utils/unwrap-elements-by-tags.js'
import * as L from '@lhast-utils/builder.js'

test('unwrapElementsByTags', () => {
  const ast = L.root([
    L.element('html', {}, [
      L.element('head', {}, [
        L.element('title', {}, [
          L.text('title')
        ])
      ])
    , L.element('body', {}, [
        L.text('body')
      ])
    ])
  ])

  const result1 = unwrapElementsByTags(ast, ['html', 'body'])
  const result2 = unwrapElementsByTags(['html', 'body'])(ast)

  expect(result1).toStrictEqual(result2)
  expect(result1).toStrictEqual(
    L.root([
      L.element('head', {}, [
        L.element('title', {}, [
          L.text('title')
        ])
      ])
    , L.text('body')
    ])
  )
})
