export type IInputs = {
  attacks: string[]
  movement: string[]
  all: string[]
}

const allInputs: IInputs = {
  all: [],
  attacks: [
    '1',
    '2',
    '3',
    '4',
    '1+2+3+4',
    '1+2+3',
    '1+2+4',
    '1+2',
    '1+3+4',
    '1+4',
    '1+3',
    '2+3+4',
    '2+3',
    '2+4',
    '3+4'
  ],
  movement: [
    'B',
    'D',
    'DB',
    'F',
    'df',
    'N',
    'n',
    'U',
    'UB',
    'UF',
    'b',
    'd',
    'db',
    'f',
    'df',
    'u',
    'ub'
  ]
}

allInputs.all = [...allInputs.attacks, ...allInputs.movement]

export { allInputs }
