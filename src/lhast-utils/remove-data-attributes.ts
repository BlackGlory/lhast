import * as LHAST from '@src/lhast.js'
import { removeProperties } from './remove-properties.js'

export function removeDataAttributes(root: LHAST.Root): LHAST.Root {
  return removeProperties(root, x => /^data[A-Z]/.test(x))
}
