import * as LHAST from '@src/lhast.js'
import { traverseDescendantNodes } from './traverse-descendant-nodes.js'
import { isText, isElement } from './is.js'
import { isString } from '@blackglory/types'

const tagToTextContentGenerator: Record<string, ((element: LHAST.Element) => Iterable<string>) | undefined> = {
  * applet(element) {
    if (isString(element.properties.alt)) {
      yield element.properties.alt
    }
  }
, * area(element) {
    if (isString(element.properties.alt)) {
      yield element.properties.alt
    }
  }
, * img(element) {
    if (isString(element.properties.alt)) {
      yield element.properties.alt
    }
  }
, * input(element) {
    if (isString(element.properties.alt)) {
      yield element.properties.alt
    }
  }
, * optgroup(element) {
    if (isString(element.properties.label)) {
      yield element.properties.label
    }
  }
, * option(element: LHAST.Element) {
    if (isString(element.properties.label)) {
      yield element.properties.label
    }
  }
, * track(element: LHAST.Element) {
    if (isString(element.properties.label)) {
      yield element.properties.label
    }
  }
}

// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
export function getTextContentForSearch(root: LHAST.Root): string {
  const results: string[] = []

  for (const node of traverseDescendantNodes(root)) {
    if (isText(node)) {
      results.push(node.value)
    } else if (isElement(node)) {
      if (isString(node.properties.title)) {
        results.push(node.properties.title)
      }

      const generateText = tagToTextContentGenerator[node.tagName]
      if (generateText) {
        for (const text of generateText(node)) {
          results.push(text)
        }
      }
    }
  }

  return results
    .join(' ')
    .replace(/\s+/g, ' ')
}
