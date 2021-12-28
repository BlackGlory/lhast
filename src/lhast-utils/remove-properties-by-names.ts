import * as LHAST from '@src/lhast.js'
import { normalizePropertyName } from './utils/normalize-property-name.js'
import { removeProperties } from './remove-properties.js'

export function removePropertiesByNames(
  root: LHAST.Root
, propNames: string[]
): LHAST.Root
export function removePropertiesByNames(
  propNames: string[]
): (root: LHAST.Root) => LHAST.Root
export function removePropertiesByNames(
  ...args:
  | [root: LHAST.Root, propNames: string[]]
  | [propNames: string[]]
) {
  if (args.length === 1) {
    const [propNames] = args
    return (root: LHAST.Root) => removePropertiesByNames(root, propNames)
  }

  const [root, propNames] = args
  const hastPropNames = propNames.map(normalizePropertyName)

  return removeProperties(root, x => hastPropNames.includes(x))
}
