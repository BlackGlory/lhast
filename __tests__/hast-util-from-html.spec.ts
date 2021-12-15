import { dedent } from 'extra-tags'
import { fromParse5 } from 'hast-util-from-parse5'
import parse5 from 'parse5'

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

  expect(result).toMatchObject({
    type: 'root'
  , children: [
      { type: 'doctype' }
    , {
        type: 'element'
      , tagName: 'html'
      , properties: {}
      , children: [
          {
            type: 'element'
          , tagName: 'head'
          , properties: {}
          , children: [
              {
                type: 'text'
              , value: '\n    '
              }
            , {
                type: 'element'
              , tagName: 'meta'
              , properties: {
                  charSet: 'utf-8'
                }
              , children: []
              }
            , {
                type: 'text'
              , value: '\n    '
              }
            , {
                type: 'element'
              , tagName: 'title'
              , properties: {}
              , children: [
                  {
                    type: 'text'
                  , value: 'Title'
                  }
                ]
              }
            , {
                type: 'text'
              , value: '\n  '
              }
            ]
          }
        , {
            type: 'text'
          , value: '\n  '
          }
        , {
            type: 'element'
          , tagName: 'body'
          , properties: {}
          , children: [
              {
                type: 'text'
              , value: '\n    '
              }
            , {
                type: 'element'
              , tagName: 'p'
              , properties: {}
              , children: [
                  {
                    type: 'text'
                  , value: 'Hello, world!'
                  }
                ]
              }
            , {
                type: 'text'
              , value: '\n  \n'
              }
            ]
          }
        ]
      }
    ]
  })
})

test('Template', () => {
  const html = dedent`
  <template>
    <p>Hello, world!</p>
  </template>
  `

  const result = parseFragment(html)

  expect(result).toMatchObject({
    type: 'root'
  , children: [
      {
        type: 'element' 
      , tagName: 'template'
      , properties: {}
      , children: []
      , content: {
          type: 'root'
        , children: [
            {
              type: 'text'
            , value: '\n  '
            }
          , {
              type: 'element'
            , tagName: 'p'
            , properties: {}
            , children: [
                {
                  type: 'text'
                , value: 'Hello, world!'
                }
              ]
            }
          , {
              type: 'text'
            , value: '\n'
            }
          ]
        }
      }
    ]
  })
})

test('Pre', () => {
  const html = dedent`
  <pre>
    <p>Hello, world!</p>
  </pre>
  `

  const result = parseFragment(html)

  expect(result).toMatchObject({
    type: 'root'
  , children: [
      {
        type: 'element' 
      , tagName: 'pre'
      , properties: {}
      , children: [
          {
            type: 'text'
          , value: '  '
          }
        , {
            type: 'element'
          , tagName: 'p'
          , properties: {}
          , children: [
              {
                type: 'text'
              , value: 'Hello, world!'
              }
            ]
          }
        , {
            type: 'text'
          , value: '\n'
          }
        ]
      }
    ]
  })
})

function parseDocument(html: string) {
  const ast = parse5.parse(html)
  return fromParse5(ast)
}

function parseFragment(html: string) {
  const ast = parse5.parseFragment(html)
  return fromParse5(ast)
}
