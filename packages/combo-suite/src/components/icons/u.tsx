import * as React from 'react'

const SvgU = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={51}
    height={51}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M1.014 25.148L23.051 1.106c1.353-1.475 3.545-1.475 4.898 0l22.037 24.042c1.352 1.475 1.352 3.867 0 5.343-1.352 1.475-3.545 1.475-4.897 0L28.963 12.898V51h-6.926V12.898L5.911 30.491c-1.352 1.475-3.544 1.475-4.897 0-1.352-1.476-1.352-3.868 0-5.343z'
      fill='#fff'
    />
  </svg>
)

export default SvgU
