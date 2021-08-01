import React from "react";
import styled from "styled-components";
import Scrollable from "../Scrollable";

const Wrapper = styled.div`
  flex: 1;
  max-height: 100%;
`;

// const BigBox = styled.div`
//   width: 100%;
//   height: 100px;
//   background: grey;
// `;

const MainContent: React.FC<{}> = ({ children }) => {
  return (
    <Wrapper>
      <Scrollable>{children}</Scrollable>
    </Wrapper>
  );
};

export default MainContent;
