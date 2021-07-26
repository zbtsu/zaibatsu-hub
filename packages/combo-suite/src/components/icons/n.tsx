import * as React from 'react'

const SvgN = (props: React.SVGProps<SVGSVGElement>) => (
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
      d='M47.789 2.653C49.106 1.65 51 2.59 51 4.244V49a2 2 0 01-2 2h-3.438a2 2 0 01-2-2V21.678c0-1.654-1.895-2.593-3.211-1.591L3.21 48.347C1.894 49.35 0 48.41 0 46.756V2a2 2 0 012-2h3.438a2 2 0 012 2v27.322c0 1.654 1.895 2.593 3.211 1.591l37.14-28.26z'
      fill='#fff'
    />
  </svg>
)

export default SvgN
