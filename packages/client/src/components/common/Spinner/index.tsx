import React from "react";
import { CircleLoader } from "react-spinners";
import styled, { useTheme } from "styled-components";
import { Center } from "../../../styles/Grid";

const FullPageSpiner = styled(Center)<{ fixed?: boolean }>`
  width: 100%;
  position: ${(p) => (p.fixed ? "fixed" : "absolute")};
  top: 0;
  left: 0;
  height: 100%;
  min-height: 400px;
  background: ${(props) => props.theme.colors.background};
`;

const Spinner = ({ fixed = true }) => {
  const theme = useTheme();
  return (
    <FullPageSpiner fixed={fixed}>
      <CircleLoader size={100} color={theme.colors.text} />
    </FullPageSpiner>
  );
};

export default Spinner;
