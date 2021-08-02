import * as React from "react";

function Unmaximize(props: React.SVGProps<SVGSVGElement>) {
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
        d="M15 14v-3h10v10h-3v3H12V14h3zm-2 1v8h8v-8h-8zm9 5h2v-8h-8v2h6v6z"
        fill="#000"
      />
    </svg>
  );
}

export default Unmaximize;
