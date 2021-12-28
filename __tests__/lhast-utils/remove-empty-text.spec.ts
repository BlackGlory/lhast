import { removeEmptyText } from '@lhast-utils/remove-empty-text.js'
import * as L from '@lhast-utils/builder.js'

test('removeEmptyText', () => {
  const ast = L.root([
    L.element('span', {}, [
      L.text('')
    , L.text('foo')
    , L.text('')
    , L.text('bar')
    , L.text('')
    ])
  ])

  const result = removeEmptyText(ast)

  expect(result).toStrictEqual(
    L.root([
      L.element('span', {}, [
        L.text('foo')
      , L.text('bar')
      ])
    ])
  )
})
