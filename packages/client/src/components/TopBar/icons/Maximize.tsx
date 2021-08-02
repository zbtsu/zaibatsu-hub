import * as React from "react";

function Maximize(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={36}
      height={36}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 12H13v11h11V12zm-12-1v13h13V11H12z"
        fill="#000"
      />
    </svg>
  );
}

export default Maximize;
