import { concatContinuousText } from '@lhast-utils/concat-continuous-text.js'
import * as L from '@lhast-utils/builder.js'

test('concatContinuousText', () => {
  const ast = L.root([
    L.element('p', {}, [
      L.text('foo')
    , L.text('bar')
    ])
  , L.text('baz')
  ])

  const result = concatContinuousText(ast)

  expect(result).toStrictEqual(
    L.root([
      L.element('p', {}, [
        L.text('foobar')
      ])
    , L.text('baz')
    ])
  )
})
