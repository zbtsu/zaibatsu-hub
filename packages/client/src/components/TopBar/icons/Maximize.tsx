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
      <path fill="#fff" stroke="#000" d="M15.5 11.5h9v9h-9z" />
      <path fill="#fff" stroke="#000" d="M12.5 14.5h9v9h-9z" />
    </svg>
  );
}

export default Maximize;