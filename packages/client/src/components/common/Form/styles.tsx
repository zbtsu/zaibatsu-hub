import styled, { DefaultTheme } from "styled-components";
import { hexToRgb } from "../../../utils/hextorgb";
import { mostReadable } from "../../../utils/toolkit";

export const ErrorPopup = styled.div`
  position: absolute;
  top: calc(100% + ${(props) => props.theme.space[1]});
  left: 0;
  width: 100%;
  background: ${(props) => props.theme.colors.error};
  color: ${(props) => mostReadable(props.theme.colors.error)};
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
  z-index: 10;
  opacity: 0;
  transform: translate(0, ${(props) => props.theme.space[1]});
  transition: ${(props) => props.theme.transition("transform", "opacity")};
  font-size: ${(props) => props.theme.fontSize[1]};
`;

export const FormControlWrapper = styled.div`
  margin-bottom: ${(props) => props.theme.space[3]};
  position: relative;
  ${ErrorPopup} {
    visibility: hidden;
  }
  &:hover,
  &:focus,
  &:active {
    ${ErrorPopup} {
      visibility: visible;
      opacity: 1;
      transform: translate(0, 0);
    }
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const StyledLabel = styled.label`
  margin-left: ${(props) => props.theme.space[3]};
  font-size: ${(props) => props.theme.fontSize[1]};
  letter-spacing: -${(props) => props.theme.letterSpacing[1]};
  color: ${(props) => props.theme.colors.text};
  display: block;
  margin-bottom: ${(props) => props.theme.space[1]};
`;

export const ErrorMessage = styled.div`
  width: 100%;
  background: ${(props) =>
    `rgba(${hexToRgb(props.theme.colors.error, true)},0.1)`};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[3]};
  font-size: ${(props) => props.theme.fontSize[1]};
`;

export const FormMessage = styled.div<{
  color: keyof Omit<DefaultTheme["colors"], "trafficLights">;
}>`
  width: 100%;
  background: ${(props) =>
    `rgba(${hexToRgb(props.theme.colors[props.color], true)},0.1)`};
  color: ${(props) => mostReadable(props.theme.colors[props.color])};
  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[3]};
  font-size: ${(props) => props.theme.fontSize[1]};
`;
