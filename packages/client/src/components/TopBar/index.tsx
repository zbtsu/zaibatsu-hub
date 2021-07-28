import React from "react";
import styled from "styled-components";
import { Column, Row } from "../../styles/Grid";
import { hexToRgb } from "../../utils/hextorgb";
import Close from "./icons/Close";
import Maximize from "./icons/Maximize";
import Minimize from "./icons/Minimize";

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  -webkit-app-region: drag;
  font-size: ${({ theme }) => theme.fontSize[1]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 100;
`;

const Brand = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[3]};
  align-items: center;
`;

const BrandImage = styled.img`
  width: 22px;
  height: 22px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  transition: ${(props) => props.theme.transition("background")};
  svg {
    transition: ${(props) => props.theme.transition("fill")};
    * {
      fill: ${({ theme }) => theme.colors.text};
    }
  }
  &:hover {
    background: ${({ close, theme }) =>
      close
        ? theme.colors.error
        : `rgba(${hexToRgb(theme.colors.text, true)},0.1)`};
    ${({ close }) =>
      close &&
      `svg {
          path {
            fill: white;
          }
        }`}
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
        <Column fitContent height="100%">
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
