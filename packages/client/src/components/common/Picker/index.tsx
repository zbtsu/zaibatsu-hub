import { animated, useSpring } from "@react-spring/web";
import React from "react";
import { SiCheckmarx } from "react-icons/si";
import styled, { useTheme } from "styled-components";
import { Character } from "../../../data/characters";
import { useAppSelector } from "../../../global/hooks";
import {
  deselectCharacter,
  selectCharacter,
} from "../../../global/slices/characterSlice";
import { hexToRgb } from "../../../utils/hextorgb";
import useAction from "../../../utils/hooks/useAction";
import useRippleEffect from "../../../utils/hooks/useRippleEffect";
import Scrollable from "../Scrollable";

const Wrapper = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border};
  width: 256px;
`;

const CharacterStyles = {
  Wrapper: styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    transition: ${(props) => props.theme.transition("background-color")};
    cursor: pointer;
    user-select: none;
    &:hover {
      background-color: ${(props) =>
        `rgba(${hexToRgb(props.theme.colors.text)},0.025)`};
    }
  `,
  Image: styled.div`
    display: flex;
    width: 92px;
    height: 92px;
    border-right: 1px solid ${(props) => props.theme.colors.border};
    position: relative;
    /* padding: ${(props) => props.theme.space[2]}; */
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
  Description: styled.div`
    padding: ${(props) => props.theme.space[2]};
    display: flex;
    align-items: center;
    flex: 1 0 50%;
  `,
  Text: styled.p`
    font-size: ${(props) => props.theme.fontSize[1]};
    color: var(--text-color);
    letter-spacing: -${(props) => props.theme.letterSpacing[2]};
    font-weight: 600;
  `,
  Selected: styled.span`
    position: absolute;
    right: ${(props) => props.theme.space[2]};
    top: 50%;
    transform: translate(0%, -50%);
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

const AnimatedSelectWrapper = animated(CharacterStyles.Selected);

const SingleCharacter = (props: Character) => {
  const [ref, ripples] = useRippleEffect();
  const isSelected = useAppSelector((state) =>
    state.characters.selected.map((c) => c.id).includes(props.id)
  );
  const checkSpring = useSpring({
    to: async (next) => {
      if (isSelected) {
        return await next({
          transform: "translate(0%,-50%)",
          opacity: 1,
          display: "flex",
        });
      } else {
        await next({
          transform: "translate(0%,50%)",
          opacity: 0,
        });
        return await next({
          display: "none",
          transform: "translate(0%,-100%)",
        });
      }
    },
  });
  const selectCharacterFn = useAction(selectCharacter);
  const deselectCharacterFn = useAction(deselectCharacter);
  const theme = useTheme();
  return (
    <CharacterStyles.Wrapper
      ref={ref}
      onClick={() => {
        if (isSelected) {
          deselectCharacterFn([props]);
        } else {
          selectCharacterFn([props]);
        }
      }}
    >
      {ripples}
      <CharacterStyles.Image>
        <img src={props.image} alt={props.name} />
      </CharacterStyles.Image>
      <CharacterStyles.Description>
        <CharacterStyles.Text>{props.name}</CharacterStyles.Text>
        {/* <p>{props.description}</p> */}
        <AnimatedSelectWrapper style={checkSpring}>
          <SiCheckmarx color={theme.colors.success} />
        </AnimatedSelectWrapper>
      </CharacterStyles.Description>
    </CharacterStyles.Wrapper>
  );
};

const Picker = () => {
  const characters = useAppSelector((state) => state.characters.all);
  return (
    <Wrapper>
      <Scrollable>
        {characters?.map((e) => {
          return <SingleCharacter key={e.id + e.name} {...e} />;
        })}
      </Scrollable>
    </Wrapper>
  );
};

export default Picker;
