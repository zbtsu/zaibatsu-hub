import React, { useCallback, useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { SiCheckmarx } from "react-icons/si";
import { RiSearchLine } from "react-icons/ri";
import { MdClear } from "react-icons/md";
import { useDebounce } from "use-debounce";
import styled, { useTheme } from "styled-components";
import { Character } from "../../../data/characters";
import { useAppSelector } from "../../../global/hooks";
import {
  deselectCharacter,
  selectCharacter,
} from "../../../global/slices/characterSlice";
import { Column, Row } from "../../../styles/Grid";
import { hexToRgb } from "../../../utils/hextorgb";
import useAction from "../../../utils/hooks/useAction";
import useRippleEffect from "../../../utils/hooks/useRippleEffect";
import Scrollable from "../Scrollable";
import { searchInCharacterArrayByName } from "../../../utils/toolkit";

const Wrapper = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border};
  width: 152px;
`;

const CharacterStyles = {
  Wrapper: styled.div`
    display: flex;
    width: 100%;
    /* border-bottom: 1px solid ${(props) => props.theme.colors.border}; */
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
    padding: 0;
    margin: 0;
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
      {/* <CharacterStyles.Image>
        <img src={props.image} alt={props.name} />
      </CharacterStyles.Image> */}
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

const Search = {
  Wrapper: styled.div`
    width: 100%;
    height: ${(props) => props.theme.space[5]};
    font-size: ${(props) => props.theme.fontSize[1]};
    display: flex;
    position: relative;
  `,
  Input: styled.input`
    width: 100%;
    outline: 0;
    height: 100%;
    font-size: ${(props) => props.theme.fontSize[1]};
    border: none;
    background: transparent;
    color: ${(props) => props.theme.colors.text};
    border-radius: 0;
    padding: ${(props) => props.theme.space[2]};
    margin: 0;
    font-weight: 600;
    font-family: inherit;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    transition: ${(props) => props.theme.transition("border-bottom")};
    &:focus {
      border-bottom: 1px solid ${(props) => props.theme.colors.text};
    }
  `,
  Icon: styled.span<{ hasValue?: boolean }>`
    position: absolute;
    right: ${(props) => props.theme.space[2]};
    top: 50%;
    transform: translate(0, -50%);
    display: flex;
    align-items: center;
    ${(props) =>
      props.hasValue &&
      `
      cursor: pointer;
      opacity: 0.2;
      transition: ${props.theme.transition("opacity")};
      &:hover {
        opacity: 1;
      }
    `}
  `,
};

interface SearchProps {
  set: (query: string) => any;
}

const SearchInput = (props: SearchProps) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 250);
  const onChange = useCallback(
    (e) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );
  const clear = useCallback(
    (e) => {
      setSearch("");
    },
    [setSearch]
  );
  useEffect(() => {
    props.set(debouncedSearch);
  }, [debouncedSearch]);
  return (
    <Search.Wrapper>
      <Search.Input
        placeholder="Search..."
        onChange={onChange}
        value={search}
      />
      <Search.Icon hasValue={Boolean(search)} onClick={clear}>
        {search ? <MdClear /> : <RiSearchLine />}
      </Search.Icon>
    </Search.Wrapper>
  );
};

const Picker = () => {
  const [search, setSearch] = useState("");
  const characters = useAppSelector((state) =>
    searchInCharacterArrayByName(state.characters.all, search)
  );

  return (
    <Wrapper>
      <Row gutter="0" direction="column" height="100%">
        <Column width="100%" grow="0" shrink="0">
          <SearchInput set={setSearch} />
        </Column>
        <Column shrink="0" height="100%">
          <Scrollable>
            {characters?.map((e) => {
              return <SingleCharacter key={e.id + e.name} {...e} />;
            })}
          </Scrollable>
        </Column>
      </Row>
    </Wrapper>
  );
};

export default Picker;
