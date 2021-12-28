import * as LHAST from '@src/lhast.js'
import { removeProperties } from './remove-properties.js'

export function removeEventHandlers(root: LHAST.Root): LHAST.Root {
  return removeProperties(root, propName => /^on[A-Z]/.test(propName))
}
