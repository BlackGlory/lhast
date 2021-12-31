import { addHelpersInPlace } from '@lhast-utils/add-helpers.js'
import * as L from '@lhast-utils/builder.js'

test('addHelpers', () => {
  const ast = L.root([
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

  const result = addHelpersInPlace(ast)

  expect(result).toMatchObject({
    type: 'root'
  , id: expect.any(String)
  , parent: null
  , index: null
  , previousSibling: null
  , nextSibling: null
  , children: [
      {
        type: 'element'
      , tagName: 'p'
      , properties: {}
      , id: expect.any(String)
      , index: 0
      , previousSibling: null
      , children: [
          {
            type: 'text'
          , value: 'first'
          , index: 0
          , previousSibling: null
          , nextSibling: null
          }
        ]
      }
    , {
        type: 'element'
      , tagName: 'p'
      , properties: {}
      , id: expect.any(String)
      , index: 1
      , children: [
          {
            type: 'text'
          , value: 'middle'
          , index: 0
          , previousSibling: null
          , nextSibling: null
          }
        ]
      }
    , {
        type: 'element'
      , tagName: 'p'
      , properties: {}
      , id: expect.any(String)
      , index: 2
      , nextSibling: null
      , children: [
          {
            type: 'text'
          , value: 'last'
          , index: 0
          , previousSibling: null
          , nextSibling: null
          }
        ]
      }
    ]
  })
  expect(result.children[0].nextSibling).toBe(result.children[1])
  expect(result.children[0].parent).toBe(result)
  expect((result.children[0] as any).children[0].parent).toBe(result.children[0])
  expect(result.children[1].parent).toBe(result)
  expect(result.children[1].previousSibling).toBe(result.children[0])
  expect(result.children[1].nextSibling).toBe(result.children[2])
  expect((result.children[1] as any).children[0].parent).toBe(result.children[1])
  expect(result.children[2].parent).toBe(result)
  expect(result.children[2].previousSibling).toBe(result.children[1])
  expect((result.children[2] as any).children[0].parent).toBe(result.children[2])
})
