import * as HAST from '@src/hast-2.4'

export function root(children: HAST.Root['children']): HAST.Root {
  return {
    type: 'root'
  , children
  }
}

export function element(
  tagName: string
, properties: HAST.Properties
, children: HAST.Element['children']
, { content }: Pick<HAST.Element, 'content'> = {}
): HAST.Element {
  return {
    type: 'element'
  , tagName
  , properties
  , content
  , children
  }
}

export function doctype(): HAST.Doctype {
  return { type: 'doctype' }
}

export function comment(value: HAST.Comment['value']): HAST.Comment {
  return {
    type: 'comment'
  , value
  }
}

export function text(value: HAST.Text['value']): HAST.Text {
  return {
    type: 'text'
  , value
  }
}
