import { createPipe, filter, isTruthy, prop } from "remeda";
import tinycolor from "tinycolor2";
import { Character } from "../data/characters";
import { TagOptions } from "../data/tags";

type AnyObject = Record<string | number, any>;

type HasAny<T extends Record<string, any>> = T;

const isDefaultOpen = createPipe(
  <T extends HasAny<{ defaultOpen?: boolean }>>(input: T) => input,
  prop("defaultOpen"),
  isTruthy
);

const propOr =
  <T extends any>(or: T) =>
  <A extends string | number>(prop: A) =>
  <C extends AnyObject>(input: C) => {
    const value = input[prop];
    return value === undefined ? or : value;
  };

const propOrFalse = propOr(undefined);

const firstItemOrFalse = propOrFalse(0);

export const getDefaultOpenKeyInList = createPipe(
  <T extends HasAny<{ defaultOpen?: boolean }>>(input: T[]) => input,
  filter(isDefaultOpen),
  firstItemOrFalse
);

export const mostReadable = (color: string) =>
  tinycolor.mostReadable(color, ["#fff", "#000"]).toHexString();

export const getCharacterIdsInMap = (characters: Character[]) =>
  characters.map((c) => c.id);

export const filterWithSameId = (characters: Character[], id: number[]) =>
  characters.filter((c) => id.includes(c.id));

export const isMac = (devTrue?: boolean) => {
  return devTrue || process.platform === "darwin";
};

export const searchInCharacterArrayByName = (
  array: Character[],
  name: string
) => {
  return array.filter((c) => c.name.toLowerCase().includes(name.toLowerCase()));
};

export const getTagLabelByValue = (tagValues: string[]) => {
  const tags = TagOptions;
  return tags
    .filter((tag) => tagValues.includes(tag.value))
    .map((e) => e.label);
};

export const makeID = (length = 32) =>
  [
    Math.random().toString(32).substr(2),
    Math.random().toString(32).substr(2),
    Math.random().toString(32).substr(2),
    Math.random().toString(32).substr(2),
  ]
    .join("")
    .substr(0, length);

export const makeOptionsFromCharacters = (characters: Character[]) => {
  return characters.map((c) => ({
    label: `${c.name}`,
    value: c.id,
  }));
};

export const isValidNumber = (value: any) => {
  return !isNaN(value);
};
