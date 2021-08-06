import React from "react";
import styled from "styled-components";
import { Column, Row } from "./Grid";

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
  EndContent?: React.FC;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  description,
  EndContent,
  children,
}) => (
  <PageHeaderStyle>
    <Row align="center" justify="space-between">
      <Column size="10">
        <h1>{children}</h1>
        {description && <h3>{description}</h3>}
      </Column>
      {EndContent && (
        <Column fitContent>
          <EndContent />
        </Column>
      )}
    </Row>
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

export const PageInner = styled.div`
  padding: ${(p) => p.theme.space[3]} ${(p) => p.theme.space[5]};
`;
