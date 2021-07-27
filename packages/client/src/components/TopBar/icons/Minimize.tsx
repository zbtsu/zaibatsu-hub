import * as React from "react";

function Minimize(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={36}
      height={36}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#000" d="M12 24h13v1H12z" />
    </svg>
  );
}

export default Minimize;
