import { transform } from '@src/transform-hast-to-lhast/index.js'
import * as H from '@hast-utils/builder.js'
import * as L from '@lhast-utils/builder.js'

describe('HAST.Root', () => {
  it('return LHAST.Root', () => {
    const hast = H.root([])

    const result = transform(hast)

    expect(result).toStrictEqual(L.root([]))
  })
})

describe('HAST.Element', () => {
  it('return LHAST.Element', () => {
    const hast = H.root([
      H.element('p', {}, [])
    ])

    const result = transform(hast)

    expect(result).toStrictEqual(L.root([
      L.element('p', {}, [])
    ]))
  })
})

describe('HAST.Doctype', () => {
  it('return undefined', () => {
    const hast = H.root([
      H.doctype()
    ])

    const result = transform(hast)

    expect(result).toStrictEqual(L.root([]))
  })
})

describe('HAST.Comment', () => {
  it('return undefined', () => {
    const hast = H.root([
      H.comment('comment')
    ])

    const result = transform(hast)

    expect(result).toStrictEqual(L.root([]))
  })
})

describe('HAST.Text', () => {
  it('return LHAST.Text', () => {
    const hast = H.root([
      H.element('p', {}, [
        H.text('value')
      ])
    ])

    const result = transform(hast)

    expect(result).toStrictEqual(L.root([
      L.element('p', {}, [
        L.text('value')
      ])
    ]))
  })
})
