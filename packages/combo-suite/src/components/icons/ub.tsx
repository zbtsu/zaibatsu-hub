import * as React from 'react'

const SvgUb = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={42}
    height={41}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M2.28 36.557L.846 3.598C.758 1.576 2.326.008 4.35.095L37.308 1.53c2.022.088 3.733 1.799 3.82 3.822.089 2.022-1.48 3.59-3.502 3.502L13.51 7.804 40.76 35.057l-4.953 4.954L8.555 12.758l1.05 24.117c.087 2.023-1.481 3.591-3.504 3.503-2.022-.088-3.733-1.799-3.821-3.821z'
      fill='#fff'
    />
  </svg>
)

export default SvgUb
