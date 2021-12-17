import * as L from '@lhast-utils/builder.js'
import { isAST, isASTCompact } from '@src/is.js'
import { compact } from '@src/compact/index.js'

test('isAST', () => {
  const ast = L.root([
    L.element('html', {}, [
      L.element('head', {}, [
        L.element('meta', { charSet: 'utf-8' }, [])
      , L.element('title', {}, [
          L.text('Title')
        ])
      ])
    , L.element('body', {}, [
        L.element('p', {}, [
          L.text('Hello, world!')
        ])
      ])
    ])
  ])

  const result = isAST(ast)

  expect(result).toBe(true)
})

test('isASTCompact', () => {
  const ast = compact(
    L.root([
      L.element('html', {}, [
        L.element('head', {}, [
          L.element('meta', { charSet: 'utf-8' }, [])
        , L.element('title', {}, [
            L.text('Title')
          ])
        ])
      , L.element('body', {}, [
          L.element('p', {}, [
            L.text('Hello, world!')
          ])
        ])
      ])
    ])
  )

  const result = isASTCompact(ast)

  expect(result).toBe(true)
})
