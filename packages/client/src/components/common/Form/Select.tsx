import React from "react";
import { Control } from "react-hook-form";
import styled from "styled-components";
import ReactSelect from "react-select";
import { ErrorPopup, FormControlWrapper, StyledLabel } from "./styles";
import { hexToRgb } from "../../../utils/hextorgb";
import { useController } from "react-hook-form";
import { formatterOrValue, mostReadable } from "../../../utils/toolkit";

interface SelectProps {
  error?: boolean | string;
  border?: boolean;
}

const StyledSelect = styled(ReactSelect)<SelectProps>`
  .Select__control {
    width: 100%;
    height: 49px;
    font-size: ${(props) => props.theme.fontSize[1]};
    border: ${(props) => (props.border ? "2px" : "0px")} solid
      ${(props) =>
        props.error ? props.theme.colors.error : props.theme.colors.border};
    background: ${(props) => props.theme.colors.background};
    border-radius: 0;
    cursor: pointer;
    box-sizing: border-box;
    &:hover {
      border-color: ${(props) =>
        props.error
          ? props.theme.colors.error
          : props.theme.colors.text} !important;
    }
  }

  .Select__input {
    input,
    div {
      color: ${(props) => props.theme.colors.text};
    }
  }
  .Select__placeholder {
    color: ${(props) =>
      `rgba(${hexToRgb(
        props.error ? props.theme.colors.error : props.theme.colors.text,
        true
      )},0.5)`};
  }

  .Select__multi {
    &-value__remove {
      svg {
        fill: ${(props) => props.theme.colors.error};
      }
    }
  }

  .Select__single-value {
    color: ${(props) =>
      props.error ? props.theme.colors.error : props.theme.colors.text};
  }
  .Select__control:hover {
    border-color: #a1a1a1;
  }

  .Select__control--is-focused {
    box-shadow: 0 0 0
      ${(props) =>
        props.border
          ? "1px"
          : "0px" + props.error
          ? props.theme.colors.error
          : props.theme.colors.text};
    outline: none;
  }

  .Select__indicator-separator {
    display: none;
  }

  .Select__menu {
    color: ${(props) => props.theme.colors.text};
    background: ${(props) => props.theme.colors.background};
    border: 1px solid
      ${(props) =>
        props.error ? props.theme.colors.error : props.theme.colors.border};
    border-radius: 0;
    z-index: 1001;
    box-shadow: 0 20px 40px -40px ${(p) => `rgba(${hexToRgb(p.theme.colors.text, true)},0.25)`};
    &-list {
      padding: 0;
    }
  }

  .Select__option {
    font-size: ${(props) => props.theme.fontSize[1]};
    &--is-focused {
      background-color: ${(props) => props.theme.colors.border};
      cursor: pointer;
    }
    &--is-selected {
      background-color: ${(props) =>
        `rgba(${hexToRgb(
          props.error ? props.theme.colors.error : props.theme.colors.primary
        )}, 0.8)`};
      color: ${(props) =>
        mostReadable(
          props.error ? props.theme.colors.error : props.theme.colors.primary
        )};
    }
    &:active {
      background-color: ${(props) =>
        props.error ? props.theme.colors.error : props.theme.colors.primary};
      color: ${(props) =>
        mostReadable(
          props.error ? props.theme.colors.error : props.theme.colors.primary
        )};
    }
  }

  .Select__indicator {
    svg {
      fill: ${(props) => props.theme.colors.text};
    }
  }
`;

type Option = {
  value: any;
  label: string;
};

interface Props<T> {
  name: string;
  label?: string;
  items: Array<Option>;
  control: Control<any>;
  border?: boolean;
  isMulti?: boolean;
  [key: string]: any;
  formatter?: T;
}

const Select = <T extends (e: any) => any>({
  name,
  label,
  items,
  control,
  border = true,
  isMulti,
  formatter,
  ...rest
}: Props<T>) => {
  const {
    field: { ref, value, ...inputProps },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: { required: true },
  });
  const error = errors[name];
  const formatValue = formatterOrValue(formatter);
  console.log({ value, items });
  console.log({
    value: isMulti
      ? items.filter((i) => {
          console.log({ hasValue: Boolean(value) });
          return value
            ? value.some((x: string) => {
                console.log({ x, i });
                return x === i.value;
              })
            : false;
        })
      : items.find((i) => i.value === value),
  });
  return (
    <FormControlWrapper>
      {label && <StyledLabel htmlFor={`input-${name}`}>{label}</StyledLabel>}
      <StyledSelect
        border={border}
        isMulti={isMulti}
        value={
          isMulti
            ? items.filter((i) => {
                return value
                  ? value.some((x: string) => {
                      return x === i.value;
                    })
                  : false;
              })
            : items.find((i) => i.value === value)
        }
        classNamePrefix="Select"
        id={`input-${name}`}
        {...inputProps}
        onChange={(e: Option) => {
          inputProps.onChange({
            target: {
              name,
              value: Array.isArray(e)
                ? e.map((x) => formatValue(x.value))
                : formatValue(e.value),
            },
          });
        }}
        options={items}
        error={error}
        {...rest}
      />
      {error?.message && <ErrorPopup>{error?.message}</ErrorPopup>}
    </FormControlWrapper>
  );
};

export default Select;
