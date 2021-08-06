import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import { hexToRGBAString } from "../../../utils/hextorgb";
import { generateId } from "../../../utils/nanoid";
import { getTagLabelByValue } from "../../../utils/toolkit";

interface Props {
  tags: string[];
}

const Styles = {
  Wrapper: styled.div`
    display: flex;
    gap: ${(p) => p.theme.space[3]};
  `,
  SingleTag: styled.span`
    padding: ${(p) => p.theme.space[1]} ${(p) => p.theme.space[2]};
    border: 1px solid ${(p) => p.theme.colors.border};
    background: ${(p) => hexToRGBAString(p.theme.colors.border, 0.2)};
  `,
};

const TagPreview = (props: Props) => {
  const tags = getTagLabelByValue(props.tags);
  const id = useRef(generateId(3));
  return (
    <Styles.Wrapper>
      {tags.map((e) => (
        <Styles.SingleTag key={`${tags}-${id.current}`}>{e}</Styles.SingleTag>
      ))}
    </Styles.Wrapper>
  );
};

export default TagPreview;
