import * as React from "react";

function Unmaximize(props: React.SVGProps<SVGSVGElement>) {
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
        d="M2 2V0h8v8H8v2H0V2h2zm7 5H8V2H3V1h6v6zM1 3v6h6V3H1z"
        fill="#000"
      />
    </svg>
  );
}

export default Unmaximize;
