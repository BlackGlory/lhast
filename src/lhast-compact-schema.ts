import { SchemaObject } from 'ajv'

export const astCompactSchema: SchemaObject = {
  $schema: 'https://json-schema.org/draft/2020-12/schema'
, $id: 'lhast-compact'
, type: 'array'
, items: {
    oneOf: [
      { $ref: '#/$defs/element' }
    , { $ref: '#/$defs/text' }
    ]
  }
, $defs: {
    element: {
      oneOf: [
        {
          type: 'array'
        , prefixItems: [
            { type: 'string' }
          ]
        , minItems: 1
        , items: {
            oneOf: [
              { $ref: '#/$defs/element' }
            , { $ref: '#/$defs/text' }
            ]
          }
        }
      , {
          type: 'array'
        , prefixItems: [
            { type: 'string' }
          , { type: 'object' }
          ]
        , minItems: 2
        , items: {
            oneOf: [
              { $ref: '#/$defs/element' }
            , { $ref: '#/$defs/text' }
            ]
          }
        }
      ]
    }
  , text: { type: 'string' }
  }
}
