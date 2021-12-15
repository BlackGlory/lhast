import * as LHAST from '@src/lhast.js'

export function root(children: LHAST.RootContent[]): LHAST.Root {
  return {
    type: 'root'
  , children
  }
}

export function element(
  tagName: string
, properties: LHAST.Properties
, children: LHAST.ElementContent[]
): LHAST.Element {
  return {
    type: 'element'
  , tagName
  , properties
  , children
  }
}

export function text(value: string): LHAST.Text {
  return {
    type: 'text'
  , value
  }
}
