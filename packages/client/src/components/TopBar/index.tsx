import React from "react";
import { useRef } from "react";
import styled, { DefaultTheme } from "styled-components";
import { WINDOW_EVENTS } from "../../constants/events";
import { useMaximized } from "../../services/useMaximized";
import { Column, Row } from "../../styles/Grid";
import { hexToRgb } from "../../utils/hextorgb";
import sendEvent from "../../utils/sendEvent";
import { isMac } from "../../utils/toolkit";
import { Close, Maximize, Minimize, Unmaximize } from "./icons";

const Wrapper = styled.div`
  /* background: ${(p) => p.theme.colors.background}; */
  width: 100%;
  height: 32px;
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
  width: 17px;
  height: 17px;
  object-fit: contain;
`;

const BrandText = styled.h1`
  font-size: 12px;
  letter-spacing: -${(p) => p.theme.letterSpacing[2]};
  margin: 0;
  font-weight: 400;
`;

const TopIconButton = styled.button<{ close?: boolean }>`
  height: 100%;
  width: max-content;
  -webkit-app-region: none;
  padding: 0 ${({ theme }) => theme.space[1]};
  margin: 0;
  background: none;
  border: none;
  /* cursor: pointer; */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${(props) => props.theme.transition("background")};
  height: 100%;
  min-width: ${(p) => p.theme.space[5]};
  svg {
    transition: ${(props) => props.theme.transition("fill")};
    object-fit: contain;
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

const TrafficLight = styled.button<{
  color: keyof DefaultTheme["colors"]["trafficLights"];
}>`
  background: ${(props) => props.theme.colors.trafficLights[props.color]};
  padding: 0;
  width: ${({ theme }) => theme.space[2]};
  height: ${({ theme }) => theme.space[2]};
  border-radius: 100%;
  cursor: pointer;
  border: 0;
  -webkit-app-region: none;
  transition: ${(props) => props.theme.transition("filter")};
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    filter: brightness(0.9);
  }
`;

const TrafficRow = styled(Row)`
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[3]};
  padding-right: 0;
`;

const BrandBox = () => (
  <Column size="6">
    <Brand>
      <BrandImage src="icon.png" />
      <BrandText>Zaibatsu Hub</BrandText>
    </Brand>
  </Column>
);

const WinBoxes = () => {
  const isMaximized = useMaximized();
  return (
    <Column fitContent height="100%">
      <Row gutter="0" align="stretch" height="100%">
        <Column fitContent>
          <TopIconButton onClick={(e) => sendEvent(WINDOW_EVENTS.DO_MINIMIZE)}>
            <Minimize />
          </TopIconButton>
        </Column>
        <Column fitContent>
          <TopIconButton onClick={(e) => sendEvent(WINDOW_EVENTS.DO_MAXIMIZE)}>
            {isMaximized ? <Unmaximize /> : <Maximize />}
          </TopIconButton>
        </Column>
        <Column fitContent>
          <TopIconButton
            close
            onClick={(e) => sendEvent(WINDOW_EVENTS.DO_CLOSE)}
          >
            <Close />
          </TopIconButton>
        </Column>
      </Row>
    </Column>
  );
};

const MacBoxes = () => (
  <Column fitContent height="100%">
    <TrafficRow gutter="1" align="center" height="100%">
      <Column fitContent>
        <TrafficLight
          color="close"
          onClick={(e) => sendEvent(WINDOW_EVENTS.DO_CLOSE)}
        />
      </Column>
      <Column fitContent>
        <TrafficLight
          color="min"
          onClick={(e) => sendEvent(WINDOW_EVENTS.DO_MINIMIZE)}
        />
      </Column>
      <Column fitContent>
        <TrafficLight
          color="max"
          onClick={(e) => sendEvent(WINDOW_EVENTS.DO_MAXIMIZE)}
        />
      </Column>
    </TrafficRow>
  </Column>
);

export const TopBar = () => {
  const isMacRef = useRef(isMac());
  return (
    <Wrapper>
      {isMacRef.current ? (
        <Row height="32px" justify="flex-start" align="stretch">
          <MacBoxes />
          <BrandBox />
        </Row>
      ) : (
        <Row height="32px" justify="space-between" align="stretch">
          <BrandBox />
          <WinBoxes />
        </Row>
      )}
    </Wrapper>
  );
};
