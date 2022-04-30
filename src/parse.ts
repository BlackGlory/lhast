import * as HAST from './hast-2.4.js'
import * as LHAST from './lhast.js'
import { transform } from './transform-hast-to-lhast/index.js'
import { fromParse5 } from 'hast-util-from-parse5'
import * as parse5 from 'parse5'

export function parseDocument(html: string): LHAST.Root {
  const ast = parse5.parse(html)
  return transform(fromParse5(ast) as HAST.Root)
}

export function parseFragment(html: string): LHAST.Root {
  const ast = parse5.parseFragment(html)
  return transform(fromParse5(ast) as HAST.Root)
}
