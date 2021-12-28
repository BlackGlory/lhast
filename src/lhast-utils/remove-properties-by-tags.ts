import * as LHAST from '@src/lhast.js'
import { removeProperties } from './remove-properties.js'
import { normalizePropertyName } from './utils/normalize-property-name.js'

export function removePropertiesByTags(
  tagToPropNames: Record<string, string[]>
): (root: LHAST.Root) => LHAST.Root
export function removePropertiesByTags(
  root: LHAST.Root
, tagToPropNames: Record<string, string[]>
): LHAST.Root
export function removePropertiesByTags(
  ...args:
  | [tagToPropNames: Record<string, string[]>]
  | [root: LHAST.Root, tagToPropNames: Record<string, string[]>]
) {
  if (args.length === 1) {
    const [tagToPropNames] = args
    return (root: LHAST.Root) => removePropertiesByTags(root, tagToPropNames)
  }

  const [root, tagToPropNames] = args
  const tagToHastPropNames = mapValues(
    tagToPropNames
  , props => props.map(normalizePropertyName)
  )

  return removeProperties(root, (propName, element) => {
    return tagToHastPropNames[element.tagName]?.includes(propName)
  })
}

function mapValues<T, U>(
  obj: Record<string, T>
, fn: (value: T) => U
): Record<string, U> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value)])
  )
}
