import React from "react";
import styled from "styled-components";
import { hexToRgb, hexToRGBAString } from "../../../utils/hextorgb";
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
  return (
    <Styles.Wrapper>
      {tags.map((e) => (
        <Styles.SingleTag>{e}</Styles.SingleTag>
      ))}
    </Styles.Wrapper>
  );
};

export default TagPreview;
