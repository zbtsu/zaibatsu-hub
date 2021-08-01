import React from "react";
import { CircleLoader } from "react-spinners";
import styled, { useTheme } from "styled-components";
import { Center } from "../../../styles/Grid";

const FullPageSpiner = styled(Center)`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background: ${(props) => props.theme.colors.background};
`;

const Spinner = () => {
  const theme = useTheme();
  return (
    <FullPageSpiner>
      <CircleLoader size={100} color={theme.colors.text} />
    </FullPageSpiner>
  );
};

export default Spinner;
