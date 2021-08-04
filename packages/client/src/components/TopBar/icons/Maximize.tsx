import * as React from "react";

function Maximize(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={10}
      height={10}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 1v8H1V1h8zM0 0h10v10H0V0z"
        fill="#000"
      />
    </svg>
  );
}

export default Maximize;
