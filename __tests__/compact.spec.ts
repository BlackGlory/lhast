import { compact } from '@src/compact/index.js'
import * as L from '@lhast-utils/builder.js'

describe('LHAST.Root', () => {
  it('return LHAST_COMPACT.Root', () => {
    const lhast = L.root([])

    const result = compact(lhast)

    expect(result).toStrictEqual([])
  })
})

describe('LHAST.Element', () => {
  describe('properties, children', () => {
    it('return LHAST_COMPACT.Element', () => {
      const lhast = L.root([
        L.element('p', { id: 'main' }, [
          L.text('Hello World')
        ])
      ])

      const result = compact(lhast)

      expect(result).toStrictEqual([
        ['p', { id: 'main' }, 'Hello World']
      ])
    })
  })

  describe('no properties, no children', () => {
    it('return LHAST_COMPACT.Element', () => {
      const lhast = L.root([
        L.element('p', {}, [])
      ])

      const result = compact(lhast)

      expect(result).toStrictEqual([
        ['p']
      ])
    })
  })

  describe('no properties', () => {
    it('return LHAST_COMPACT.Element', () => {
      const lhast = L.root([
        L.element('p', {}, [
          L.text('Hello World')
        ])
      ])

      const result = compact(lhast)

      expect(result).toStrictEqual([
        ['p', 'Hello World']
      ])
    })
  })

  describe('no children', () => {
    it('return LHAST_COMPACT.Element', () => {
      const lhast = L.root([
        L.element('p', { id: 'main' }, [])
      ])

      const result = compact(lhast)

      expect(result).toStrictEqual([
        ['p', { id: 'main' }]
      ])
    })
  })
})

describe('LHAST.Text', () => {
  it('return LHAST_COMPACT.Text', () => {
    const lhast = L.root([
      L.text('value')
    ])

    const result = compact(lhast)

    expect(result).toStrictEqual(['value'])
  })
})
