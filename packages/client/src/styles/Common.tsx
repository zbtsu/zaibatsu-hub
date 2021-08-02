import styled from "styled-components";

export const PageHeader = styled.h1`
  font-size: ${(props) => props.theme.fontSize[5]};
  padding: ${(props) => props.theme.space[3]} ${(props) => props.theme.space[5]};
  display: flex;
  align-items: center;
  height: 93px;
  margin: 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export const PageWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
`;

export const Avatar = styled.img`
  width: 24px;
  height: 24px;
  object-fit: cover;
`;
