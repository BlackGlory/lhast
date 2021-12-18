export const LHASTSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema'
, $id: 'lhast'
, type: 'object'
, properties: {
    type: { const: 'root' }
  , children: {
      type: 'array'
    , items: {
        oneOf: [
          { $ref: '#/$defs/element' }
        , { $ref: '#/$defs/text' }
        ]
      }
    }
  }
, required: ['type', 'children']
, $defs: {
    element: {
      type: 'object'
    , properties: {
        type: { const: 'element' }
      , tagName: { type: 'string' }
      , properties: { type: 'object' }
      , children: {
          type: 'array'
        , items: {
            oneOf: [
              { $ref: '#/$defs/element' }
            , { $ref: '#/$defs/text' }
            ]
          }
        }
      }
    , required: ['type', 'tagName', 'properties', 'children']
    }
  , text: {
      type: 'object'
    , properties: {
        type: { const: 'text' }
      , value: { type: 'string' }
      }
    , required: ['type', 'value']
    }
  }
}
