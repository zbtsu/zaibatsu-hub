import * as React from "react";
import { StyledSVG } from "../../../styles";

function Close(props: React.SVGProps<SVGSVGElement>) {
  return (
    <StyledSVG
      width={10}
      height={10}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.91 0L0 .91 4.091 5 0 9.09l.91.91L5 5.909l4.09 4.09.91-.908L5.91 5 10 .91 9.09 0 5 4.09.91 0z"
        fill="#000"
      />
    </StyledSVG>
  );
}

export default Close;
