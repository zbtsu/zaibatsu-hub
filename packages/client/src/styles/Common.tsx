import React from "react";
import styled from "styled-components";

export const PageHeaderStyle = styled.div`
  font-size: ${(props) => props.theme.fontSize[5]};
  padding: ${(props) => props.theme.space[3]} ${(props) => props.theme.space[5]};
  margin: 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  h1 {
    margin: 0;
  }
  h3 {
    margin: 0;
    letter-spacing: -${(props) => props.theme.letterSpacing[2]};
    font-weight: 400;
    font-size: ${(props) => props.theme.fontSize[1]};
  }
`;

interface PageHeaderProps {
  description?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = (props) => (
  <PageHeaderStyle>
    <h1>{props.children}</h1>
    {props.description && <h3>{props.description}</h3>}
  </PageHeaderStyle>
);

export const PageWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

export const Avatar = styled.img`
  width: 100%;
  height: 100%;
  max-width: 36px;
  object-fit: cover;
`;
