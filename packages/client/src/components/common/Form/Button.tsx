import React from "react";
import styled, { DefaultTheme } from "styled-components";
import useRippleEffect from "../../../utils/hooks/useRippleEffect";
import tinyColor from "tinycolor2";
import { mostReadable } from "../../../utils/toolkit";

interface ButtonWrapperProps {
  color?: keyof Omit<DefaultTheme["colors"], "trafficLights">;
  width?: string;
  smallPadding?: boolean;
  noBorder?: boolean;
}

interface ButtonProps
  extends ButtonWrapperProps,
    Omit<React.HTMLAttributes<HTMLButtonElement>, keyof ButtonWrapperProps> {}

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  background: ${(props) => props.theme.colors[props.color || "background"]};

  padding: ${(props) =>
    `${props.theme.space[props.smallPadding ? 1 : 2]} ${
      props.theme.space[props.smallPadding ? 2 : 3]
    }`};
  color: ${(props) =>
    mostReadable(props.theme.colors[props.color || "background"])};
  border: ${(p) => (p.noBorder ? "0px" : "2px")} solid
    ${(props) => props.theme.colors[props.color || "border"]};
  cursor: pointer;
  outline: none;
  transition: ${(props) => props.theme.transition("background")};
  ${(props) => props.width && `width: ${props.width};`};
  &:hover {
    background: ${(props) =>
      `${tinyColor(props.theme.colors[props.color || "background"]).lighten(
        10
      )}`};
    color: ${(props) =>
      mostReadable(props.theme.colors[props.color || "background"])};
    &:active {
      background: ${(props) =>
        `${tinyColor(props.theme.colors[props.color || "background"]).darken(
          1
        )}`};
      transition: none;
    }
  }
  /* svg {
    path {
      fill: ${(props) => props.theme.colors.text};
    }
  } */
`;

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  const [ref, ripples] = useRippleEffect();
  return (
    <ButtonWrapper ref={ref} {...rest}>
      {ripples}
      <span>{children}</span>
    </ButtonWrapper>
  );
};
