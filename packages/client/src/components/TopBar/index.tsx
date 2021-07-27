import React from "react";
import styled from "styled-components";
import { Row } from "../../styles/Grid";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[3]};
  -webkit-app-region: drag;
  font-size: ${({ theme }) => theme.fontSize[1]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Brand = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
  align-items: center;
`;

const BrandImage = styled.img`
  width: ${({ theme }) => theme.space[3]};
  height: ${({ theme }) => theme.space[3]};
  object-fit: contain;
`;

const BrandText = styled.h1`
  font-size: ${({ theme }) => theme.fontSize[1]};
  margin: 0;
`;

export const TopBar = () => {
  return (
    <Wrapper>
      <Row>
        <Brand>
          <BrandImage src="icon.png" />
          <BrandText>Zaibatsu Hub</BrandText>
        </Brand>
      </Row>
    </Wrapper>
  );
};
