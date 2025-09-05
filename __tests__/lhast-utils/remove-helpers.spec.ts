import { test, expect } from 'vitest'
import { addHelpersInPlace } from '@lhast-utils/add-helpers.js'
import { removeHelpersInPlace } from '@lhast-utils/remove-helpers.js'
import * as L from '@lhast-utils/builder.js'

test('removeHelpers', () => {
  const ast = addHelpersInPlace(
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

  const result = removeHelpersInPlace(ast)

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
