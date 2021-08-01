import React from "react";
import { DeepMap, UseFormRegister } from "react-hook-form";
import styled from "styled-components";
import { hexToRgb } from "../../../utils/hextorgb";
import { ErrorPopup, FormControlWrapper, StyledLabel } from "./styles";

interface Props {
  name: string;
  register: UseFormRegister<any>;
  errors: DeepMap<any, any>;
  placeholder: string;
  label: string;
  type?: string;
}

const StyledText = styled.input<{ error?: string }>`
  width: 100%;
  font-size: ${(props) => props.theme.fontSize[1]};
  letter-spacing: -${(props) => props.theme.letterSpacing[1]};
  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[3]};
  outline: 0;
  border-radius: 0;
  color: ${(props) => props.theme.colors.text};
  border: 2px solid
    ${(props) =>
      props.error ? props.theme.colors.error : props.theme.colors.border};
  transition: ${(props) => props.theme.transition("border")};
  background: ${(props) =>
    props.error
      ? `rgba(${hexToRgb(props.theme.colors.error, true)}, 0.05)`
      : props.theme.colors.background};
  &:focus,
  &:hover {
    border: 2px solid
      ${(props) => `rgba(${hexToRgb(props.theme.colors.text, true)}, 1)`};
    &::placeholder {
      color: ${(props) =>
        `rgba(${hexToRgb(props.theme.colors.text, true)},0.4)`};
    }
    + ${ErrorPopup} {
      visibility: visible;
      opacity: 1;
      transform: translate(0, 0);
    }
  }
  &::placeholder {
    transition: ${(props) => props.theme.transition("color")};

    color: ${(props) => `rgba(${hexToRgb(props.theme.colors.text, true)},0.2)`};
  }
`;

const TextInput = ({
  name,
  register,
  placeholder,
  label,
  errors,
  type = "text",
}: Props) => {
  const error = errors[name];
  return (
    <FormControlWrapper>
      <StyledLabel htmlFor={`input-${name}`}>{label}</StyledLabel>
      <StyledText
        id={`input-${name}`}
        type={type}
        error={error?.message}
        {...register(name)}
        {...{ placeholder }}
      />
      {error?.message && <ErrorPopup>{error?.message}</ErrorPopup>}
    </FormControlWrapper>
  );
};

export default TextInput;
