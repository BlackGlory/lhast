import { wrap } from '@lhast-utils/wrap.js'
import { unwrap } from '@lhast-utils/unwrap.js'
import * as L from '@lhast-utils/builder.js'

test('unwrap', () => {
  const ast = wrap(
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

  const result = unwrap(ast)

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
