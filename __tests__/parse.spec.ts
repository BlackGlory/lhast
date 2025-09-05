import { test, expect } from 'vitest'
import { parseDocument, parseFragment } from '@src/parse.js'
import { dedent } from 'extra-tags'
import * as L from '@lhast-utils/builder.js'

test('HTML', () => {
  const html = dedent`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>Title</title>
    </head>
    <body>
      <p>Hello, world!</p>
    </body>
  </html>
  `

  const result = parseDocument(html)

  expect(result).toStrictEqual(L.root([
    L.element('html', {}, [
      L.element('head', {}, [
        L.text('\n    ')
      , L.element('meta', { charSet: 'utf-8' }, [])
      , L.text('\n    ')
      , L.element('title', {}, [
          L.text('Title')
        ])
      , L.text('\n  ')
      ])
    , L.text('\n  ')
    , L.element('body', {}, [
        L.text('\n    ')
      , L.element('p', {}, [
          L.text('Hello, world!')
        ])
      , L.text('\n  \n')
      ])
    ])
  ]))
})

test('Template', () => {
  const html = dedent`
  <template>
    <p>Hello, world!</p>
  </template>
  `

  const result = parseFragment(html)

  expect(result).toStrictEqual(L.root([
    L.element('template', {}, [
      L.text('\n  ')
    , L.element('p', {}, [
        L.text('Hello, world!')
      ])
    , L.text('\n')
    ])
  ]))
})

test('Pre', () => {
  const html = dedent`
  <pre>
    <p>Hello, world!</p>
  </pre>
  `

  const result = parseFragment(html)

  expect(result).toStrictEqual(L.root([
    L.element('pre', {}, [
      L.text('  ')
    , L.element('p', {}, [
        L.text('Hello, world!')
      ])
    , L.text('\n')
    ])
  ]))
})

test('HTML entities', () => {
  const html = dedent`
  &amp;
  `

  const result = parseFragment(html)

  expect(result).toStrictEqual(L.root([
    L.text('&')
  ]))
})
