import * as R from 'remeda'

export const isUppercase = (string: string) =>
  new RegExp('^[A-Z]+$').test(string)

export const ascComparator = (a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0)

export const descComparator = (a: any, b: any) => ascComparator(b, a)

const sortAsc = R.createPipe(
  (e: string) => e.split('+'),
  R.sort(ascComparator),
  (e: string[]) => e.join('+')
)

type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T // from lodash

export function truthy<T>(value: T): value is Truthy<T> {
  return !!value
}

export const ifUpperCaseAddSuffix = (string: string) =>
  isUppercase(string) ? `${string.toLowerCase()}_uc` : string

export const ifPlusSort = (string: string) => {
  if (string.includes('+')) {
    return sortAsc(string)
  }
  return string
}

export const suffixAndSort = R.createPipe(
  ifUpperCaseAddSuffix,
  ifPlusSort,
  (e: string) => e.trim()
)

export const truthyFilter = R.filter(truthy)

export const mapIndexed = R.map.indexed
export const jakoto = 'jakoto'

export const replaceAll = (find: string, replace: string) => (string: string) =>
  String.prototype.replaceAll.call(string, find, replace as any)
