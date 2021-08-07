import React from "react";
import styled from "styled-components";
import { ComboPreview } from "@zbtsu/combo-suite";
import type { ICombo } from "../../../models/Combo";
import { Column, Margin, Row } from "../../../styles/Grid";
import TagPreview from "./TagPreview";
import { Avatar } from "../../../styles/Common";
import { getCharacterById, getCharacterNameById } from "../../../utils/toolkit";

interface Props extends ICombo {}

const Styles = {
  Wrapper: styled.div`
    padding: ${(p) => p.theme.space[3]} 0;
    & + & {
      border-top: 1px solid ${(p) => p.theme.colors.border};
    }
  `,
  Name: styled.h4`
    font-size: ${(p) => p.theme.fontSize[1]};
    margin: 0;
  `,
};

const ImageRender = styled.div<{ action?: "movement" | "attack" }>`
  ${(p) =>
    p.theme.colorTheme === "light" &&
    `
    filter: invert(1);
  `}
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    ${(p) => `
    width: ${p.action === "movement" ? p.theme.space[3] : p.theme.space[4]};
    height: ${p.action === "movement" ? p.theme.space[3] : p.theme.space[4]};
  `}
  }
`;

const StyledComboPreview = styled(ComboPreview)`
  gap: ${(p) => p.theme.space[2]};
  display: flex;
`;

const SmallCombo = (props: Props) => {
  const cName = React.useMemo(
    () => getCharacterById(props.character),
    [props.character]
  );
  return (
    <Styles.Wrapper>
      <Row align="center">
        <Column size="6">
          <Row align="center">
            <Column fitContent>
              <Avatar src={cName?.thumb} />
            </Column>
            <Column>
              <Styles.Name>{props.name}</Styles.Name>
            </Column>
          </Row>
        </Column>
        <Column size="6">
          <Row align="center" justify="flex-end">
            <Column fitContent>{props.damage} damage</Column>
          </Row>
        </Column>
      </Row>
      <Margin gutter="3" />
      <StyledComboPreview
        combo={props.string}
        imageRender={(Svg, props) => {
          return (
            <ImageRender action={props.action}>
              <Svg />
            </ImageRender>
          );
        }}
      />
      <Margin gutter="3" />
      <Row align="center">
        {props.author && (
          <Column size="3">
            <Row align="center">
              <Column fitContent>
                <Avatar src={props.author?.photoURL || undefined} />
              </Column>
              <Column fitContent>{props.author?.displayName}</Column>
            </Row>
          </Column>
        )}
        <Column size="6" grow="1">
          <TagPreview tags={props.tags} />
        </Column>
      </Row>
    </Styles.Wrapper>
  );
};

export default SmallCombo;
