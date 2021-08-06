import React from "react";
import { useController } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { Control } from "react-hook-form";
import styled from "styled-components";
import { hexToRgb } from "../../../utils/hextorgb";

const Styles = {
  Wrapper: styled.button<{ on?: boolean }>`
    background: none;
    color: ${(p) =>
      p.on ? `${p.theme.colors.text} !important` : p.theme.colors.border};
    border: none;
    cursor: poitner;
    padding: ${(p) => `${p.theme.space[1]} ${p.theme.space[2]}`};
    transition: ${(p) => p.theme.transition("color")};
    cursor: pointer;
    &:hover {
      color: ${(p) => `rgba(${hexToRgb(p.theme.colors.text, true)},0.5)`};
    }
    & + & {
      border-left: ${(p) => `1px solid ${p.theme.colors.border}`};
    }
  `,
};

interface Props {
  name: string;
  control: Control<any>;
  label: string;
  value: string;
}

const TextToggle = ({ name, control, label, value: propVal }: Props) => {
  const {
    field: { onChange },
  } = useController({ name, control });
  const value = useWatch({
    control,
    name: name,
  });
  return (
    <Styles.Wrapper
      onClick={() => {
        return onChange({
          name,
          target: { value: propVal },
        });
      }}
      on={value === propVal}
    >
      {label}
    </Styles.Wrapper>
  );
};

export default TextToggle;
