import * as React from 'react'
import { createPipe as pipe } from 'remeda'
import {
  suffixAndSort,
  mapIndexed,
  truthyFilter,
  replaceAll
} from '../utils/common'
import { allInputs } from '../inputs'

const comboTransform = (e: string) => {
  const parse = (() => {
    if (e.includes('+')) {
      const newInput = suffixAndSort(e)
      if (allInputs.all.includes(newInput)) {
        return {
          type: 'button',
          content: newInput
        }
      }
    }
    if (allInputs.all.includes(e)) {
      return {
        type: 'button',
        action: allInputs.attacks.includes(e) ? 'attack' : 'movement',
        content: suffixAndSort(e)
      }
    }
    if (e === ',') {
      return {
        type: 'next',
        content: 'next'
      }
    }
    if (e.includes('/')) {
      return {
        type: 'button',
        content: suffixAndSort(e.replace('/', ''))
      }
    }
    if (typeof e !== 'undefined' && Boolean(e)) {
      return {
        type: 'tooltip',
        content: e
      }
    }
    return null
  })()
  if (!parse) return null
  return parse
}

export type pureCombo = {
  type: 'svg' | 'next' | 'tooltip'
  action?: 'movement' | 'attack'
  content: string
}

const comboParser = <A extends string>(combo: A) =>
  pipe(
    (e: string) => e.trim(),
    replaceAll(',', ' , '),
    (e: string) => e.split(' '),
    truthyFilter,
    mapIndexed(comboTransform)
  )(combo) as unknown as pureCombo[]

const useComboParser = (combo: string) => {
  const comboParsed = React.useMemo(() => comboParser(combo), [combo])
  return comboParsed
}

export { useComboParser, comboParser }
