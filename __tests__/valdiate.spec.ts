import * as L from '@lhast-utils/builder.js'
import { validateLHAST, validateLHASTCompact } from '@src/validate.js'
import { compact } from '@src/compact/index.js'

test('validateAST', () => {
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

  validateLHAST(ast)
})

test('validateASTCompact', () => {
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

  validateLHASTCompact(ast)
})
