import { removeDataAttributes } from '@lhast-utils/remove-data-attributes.js'
import * as L from '@lhast-utils/builder.js'

test('removeDataAttributes', () => {
  const ast = L.root([
    L.element('div', { dataFoo: 'bar', title: 'title' }, [])
  ])

  const result = removeDataAttributes(ast)

  expect(result).toStrictEqual(
    L.root([
      L.element('div', { title: 'title' }, [])
    ])
  )
})
