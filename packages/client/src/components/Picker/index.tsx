import React from "react";
import styled from "styled-components";
import { Column, Row } from "../../styles/Grid";
const Wrapper = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border};
  width: 256px;
`;

const Picker = () => {
  return (
    <Wrapper>
      <Row direction="column">
        <Column>Jakoto</Column>
      </Row>
    </Wrapper>
  );
};

export default Picker;
