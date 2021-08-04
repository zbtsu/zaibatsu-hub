import * as React from "react";

function Minimize(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={10}
      height={10}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#000" d="M0 9h10v1H0z" />
    </svg>
  );
}

export default Minimize;
