import { reverse } from '@lhast-utils/reverse.js'
import { root, element, text } from '@lhast-utils/builder.js'

test('reverse', () => {
  const ast = root([
    element('h1', {}, [
      element('span', {}, [
        text('foo')
      ])
    , text('bar')
    ])
  , element('h2', {}, [
      text('baz')
    ])
  ])

  const result = reverse(ast)

  expect(result).toStrictEqual(root([
    element('h2', {}, [
      text('baz')
    ])
  , element('h1', {}, [
      text('bar')
    , element('span', {}, [
        text('foo')
      ])
    ])
  ]))
})
