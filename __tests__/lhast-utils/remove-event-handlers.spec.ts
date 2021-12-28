import { removeEventHandlers } from '@lhast-utils/remove-event-handlers.js'
import * as L from '@lhast-utils/builder.js'

test('removeEventHandlers', () => {
  const ast = L.root([
    L.element('div', { onClick: 'alert("foo");', title: 'title' }, [])
  ])

  const result = removeEventHandlers(ast)

  expect(result).toStrictEqual(
    L.root([
      L.element('div', { title: 'title' }, [])
    ])
  )
})
