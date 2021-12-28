import { html, normalize } from 'property-information'

export function normalizePropertyName(propertyName: string) {
  return html.normal[normalize(propertyName)] ?? propertyName
}
