import React from "react";
import styled, { DefaultTheme } from "styled-components";
import useRippleEffect from "../../../utils/hooks/useRippleEffect";
import tinyColor from "tinycolor2";
import { mostReadable } from "../../../utils/toolkit";

interface ButtonWrapperProps {
  color?: keyof DefaultTheme["colors"];
  width?: string;
  smallPadding?: boolean;
}

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  color?: keyof DefaultTheme["colors"];
  width?: string;
  smallPadding?: boolean;
}

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  background: ${(props) => props.theme.colors[props.color || "background"]};

  padding: ${(props) =>
    `${props.theme.space[props.smallPadding ? 1 : 2]} ${
      props.theme.space[props.smallPadding ? 2 : 3]
    }`};
  color: ${(props) =>
    mostReadable(props.theme.colors[props.color || "background"])};
  border: 2px solid ${(props) => props.theme.colors[props.color || "border"]};
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
