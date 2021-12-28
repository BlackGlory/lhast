import { removePropertiesByNames } from '@lhast-utils/remove-properties-by-names.js'
import * as L from '@lhast-utils/builder.js'

test('removePropertiesByNames', () => {
  const ast = L.root([
    L.element('div', { foo: 'bar', title: 'title' }, [])
  ])

  const result1 = removePropertiesByNames(ast, ['foo'])
  const result2 = removePropertiesByNames(['foo'])(ast)

  expect(result1).toStrictEqual(result2)
  expect(result1).toStrictEqual(
    L.root([
      L.element('div', { title: 'title' }, [])
    ])
  )
})
