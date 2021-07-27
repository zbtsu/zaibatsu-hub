import React from "react";
import styled from "styled-components";
import { Column, Row } from "../../styles/Grid";
import Close from "./icons/Close";
import Maximize from "./icons/Maximize";
import Minimize from "./icons/Minimize";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  -webkit-app-region: drag;
  font-size: ${({ theme }) => theme.fontSize[1]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
`;

const Brand = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[3]};
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

const TopIconButton = styled.button<{ close?: boolean }>`
  height: 100%;
  width: max-content;
  -webkit-app-region: none;
  padding: 0 ${({ theme }) => theme.space[1]};
  margin: 0;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    background: ${({ close, theme }) =>
      close ? theme.colors.error : theme.colors.background};
  }
`;

export const TopBar = () => {
  return (
    <Wrapper>
      <Row justify="space-between" align="stretch">
        <Column size="1">
          <Brand>
            <BrandImage src="icon.png" />
            <BrandText>Zaibatsu Hub</BrandText>
          </Brand>
        </Column>
        <Column fitContent>
          <Row gutter="0">
            <Column fitContent>
              <TopIconButton>
                <Minimize />
              </TopIconButton>
            </Column>
            <Column fitContent>
              <TopIconButton>
                <Maximize />
              </TopIconButton>
            </Column>
            <Column fitContent>
              <TopIconButton close>
                <Close />
              </TopIconButton>
            </Column>
          </Row>
        </Column>
      </Row>
    </Wrapper>
  );
};
