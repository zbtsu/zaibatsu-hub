import * as React from 'react'

const SvgD = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={52}
    height={51}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M50.966 25.852l-22.47 24.042c-1.378 1.475-3.614 1.475-4.993 0L1.034 25.852c-1.379-1.475-1.379-3.867 0-5.343 1.379-1.475 3.614-1.475 4.993 0L22.47 38.102V0h7.062v38.102l16.442-17.593c1.379-1.475 3.614-1.475 4.993 0 1.379 1.476 1.379 3.868 0 5.343z'
      fill='#fff'
    />
  </svg>
)

export default SvgD
