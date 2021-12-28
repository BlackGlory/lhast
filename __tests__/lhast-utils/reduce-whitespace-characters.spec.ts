import { reduceWhitespaceCharacters } from '@lhast-utils/reduce-whitespace-characters.js'
import * as L from '@lhast-utils/builder.js'

describe('reduceWhitespaceCharacters', () => {
  test('reduce whitespace characters', () => {
    const ast = L.root([
      L.text('        foo')
    , L.text('bar        ')
    , L.text('  b  a  z  ')
    ])

    const result = reduceWhitespaceCharacters(ast)

    expect(result).toStrictEqual(
      L.root([
        L.text(' foo')
      , L.text('bar ')
      , L.text(' b a z ')
      ])
    )
  })

  test('not affect pre', () => {
    const ast = L.root([
      L.element('pre', {}, [
        L.text('        foo')
      , L.text('bar        ')
      , L.text('  b  a  z  ')
      ])
    ])

    const result = reduceWhitespaceCharacters(ast)

    expect(result).toStrictEqual(
      L.root([
        L.element('pre', {}, [
          L.text('        foo')
        , L.text('bar        ')
        , L.text('  b  a  z  ')
        ])
      ])
    )
  })
})
