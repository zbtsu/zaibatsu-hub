import * as React from 'react'

const SvgUf = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={41}
    height={41}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4.26 1.705L37.217.27c2.022-.088 3.59 1.48 3.503 3.503l-1.434 32.958c-.088 2.023-1.799 3.734-3.821 3.822-2.023.088-3.591-1.48-3.503-3.503l1.049-24.118L5.759 40.186.805 35.233 28.058 7.98 3.941 9.029C1.918 9.117.35 7.549.438 5.526.526 3.504 2.237 1.793 4.26 1.705z'
      fill='#fff'
    />
  </svg>
)

export default SvgUf
