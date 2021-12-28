import { removePropertiesByTags } from '@lhast-utils/remove-properties-by-tags.js'
import * as L from '@lhast-utils/builder.js'

test('removePropertiesByTags', () => {
  const ast = L.root([
    L.element('div', { foo: 'bar', title: 'title' }, [])
  , L.element('span', { foo: 'bar', title: 'title' }, [])
  ])

  const result1 = removePropertiesByTags(ast, { div: ['foo'] })
  const result2 = removePropertiesByTags({ div: ['foo' ]})(ast)

  expect(result1).toStrictEqual(result2)
  expect(result1).toStrictEqual(
    L.root([
      L.element('div', { title: 'title' }, [])
    , L.element('span', { foo: 'bar', title: 'title' }, [])
    ])
  )
})
