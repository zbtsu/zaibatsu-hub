import React from "react";
import styled, { DefaultTheme } from "styled-components";
import useRippleEffect from "../../utils/hooks/useRippleEffect";
import tinyColor from "tinycolor2";

interface ButtonWrapperProps {
  color?: keyof DefaultTheme["colors"];
  width?: string;
}

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  color?: keyof DefaultTheme["colors"];
  width?: string;
}

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  background: ${(props) => props.theme.colors[props.color || "background"]};
  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[3]};
  color: ${(props) =>
    `${tinyColor.mostReadable(props.theme.colors[props.color || "background"], [
      "#FFF",
      "#000",
    ])}`};
  border: 2px solid ${(props) => props.theme.colors[props.color || "text"]};
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
      `${tinyColor.mostReadable(
        props.theme.colors[props.color || "background"],
        ["#FFF", "#000"]
      )}`};
    &:active {
      background: ${(props) =>
        `${tinyColor(props.theme.colors[props.color || "background"]).darken(
          1
        )}`};
      transition: none;
    }
  }
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
