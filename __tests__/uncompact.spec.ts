import { describe, it, expect } from 'vitest'
import { uncompact } from '@src/uncompact/index.js'
import * as L from '@lhast-utils/builder.js'
import * as C from '@src/lhast-compact.js'

describe('LHAST_COMPACT.Root', () => {
  it('return LHAST.Root', () => {
    const compact: C.Root = []

    const result = uncompact(compact)

    expect(result).toStrictEqual(L.root([]))
  })
})

describe('LHAST_COMPACT.Element', () => {
  describe('properties, children', () => {
    it('return LHAST.Element', () => {
      const compact: C.Root = [
        ['p', { id: 'main'}, 'Hello World']
      ]

      const result = uncompact(compact)

      expect(result).toStrictEqual(L.root([
        L.element('p', { id: 'main' }, [
          L.text('Hello World')
        ])
      ]))
    })
  })

  describe('no properties, no children', () => {
    it('return LHAST.Element', () => {
      const compact: C.Root = [
        ['p']
      ]

      const result = uncompact(compact)

      expect(result).toStrictEqual(L.root([
        L.element('p', {}, [])
      ]))
    })
  })

  describe('no properties', () => {
    it('return LHAST.Element', () => {
      const compact: C.Root = [
        ['p', 'Hello World']
      ]

      const result = uncompact(compact)

      expect(result).toStrictEqual(L.root([
        L.element('p', {}, [
          L.text('Hello World')
        ])
      ]))
    })
  })

  describe('no children', () => {
    it('return LHAST.Element', () => {
      const compact: C.Root = [
        ['p', { id: 'main' }]
      ]

      const result = uncompact(compact)

      expect(result).toStrictEqual(L.root([
        L.element('p', { id: 'main' }, [])
      ]))
    })
  })
})

describe('LHAST_COMPACT.Text', () => {
  it('return LHAST.Text', () => {
    const compact: C.Root = ['value']

    const result = uncompact(compact)

    expect(result).toStrictEqual(L.root([
      L.text('value')
    ]))
  })
})
