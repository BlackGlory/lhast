import { addHelpers } from '@lhast-utils/add-helpers.js'
import { removeHelpers } from '@lhast-utils/remove-helpers.js'
import * as L from '@lhast-utils/builder.js'

test('removeHelpers', () => {
  const ast = addHelpers(
    L.root([
      L.element('p', {}, [
        L.text('first')
      ])
    , L.element('p', {}, [
        L.text('middle')
      ])
    , L.element('p', {}, [
        L.text('last')
      ])
    ])
  )

  const result = removeHelpers(ast)

  expect(result).toStrictEqual(
    L.root([
      L.element('p', {}, [
        L.text('first')
      ])
    , L.element('p', {}, [
        L.text('middle')
      ])
    , L.element('p', {}, [
        L.text('last')
      ])
    ])
  )
})
