import * as React from "react";
import { StyledSVG } from "../../../styles";

function Close(props: React.SVGProps<SVGSVGElement>) {
  return (
    <StyledSVG
      width={36}
      height={36}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5 18.17L24.33 24l.67-.67-5.83-5.83L25 11.67l-.67-.67-5.83 5.83L12.67 11l-.67.67 5.83 5.83L12 23.33l.67.67 5.83-5.83z"
        fill="#000"
      />
    </StyledSVG>
  );
}

export default Close;
