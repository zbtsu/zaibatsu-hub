import styled from "styled-components";
import { mostReadable } from "tinycolor2";
import { getPercent } from "../utils/percent";

type GutterSize = "0" | "1" | "2" | "3" | "4" | "5";

interface RowProps {
  align?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "stretch"
    | "space-evenly";
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  gutter?: GutterSize;
  direction?: "column" | "row";
  height?: string;
  width?: string;
}
type ColSize =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";
interface ColProps {
  height?: string;
  width?: string;
  size?: ColSize;
  fitContent?: boolean;
  grow?: "1" | "0";
  shrink?: "1" | "0";
  align?: "center" | "flex-start" | "flex-end";
  justify?: "center" | "flex-start" | "flex-end";
}

export const Column = styled.div<ColProps>`
  width: 100%;
  max-width: ${(props) => getPercent(props.size || 12, 12)}%;
  ${(props) => props.fitContent && "max-width: max-content;"}
  flex: ${(props) => `${props.grow || 1} ${props.shrink || 0} 0%`};
  ${(props) =>
    props.size &&
    `flex: ${props.size} 1 calc(${getPercent(
      props.size || 12,
      12
    )}% - var(--gutter))`}
  ${(props) => props.height && `height: ${props.height};`}
  ${(props) => props.width && `width: ${props.width};`}
  ${(p) => p.align && `align-self: ${p.align};`}
  ${(p) => p.justify && `justify-self: ${p.align};`}
`;

export const Row = styled.div<RowProps>`
  display: flex;
  ${(props) => props.height && `height: ${props.height};`}
  ${(props) => props.width && `width: ${props.width};`}
  flex-flow: ${(props) => props.direction || "row"} wrap;
  align-items: ${(props) => props.align || "flex-start"};
  justify-content: ${(props) => props.justify || "flex-start"};
  gap: ${(props) => props.theme.space[parseInt(props.gutter || "2")]};
  ${Column} {
    --gutter: ${(props) => props.theme.space[parseInt(props.gutter || "2")]};
  }
`;

export const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  /* background: ${({ theme }) => theme.colors.background}; */
  display: flex;
  flex-direction: column;
`;

export const AppContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  max-height: 100%;
  overflow: hidden;
  /* background: ${({ theme }) => theme.colors.background}; */
`;

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 0;
`;

export const Link = styled.a<{ size?: GutterSize }>`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  background-image: linear-gradient(
    120deg,
    ${(props) =>
      `${mostReadable(props.theme.colors.background, [
        "#FFF",
        "#000",
      ])} 0%, ${mostReadable(props.theme.colors.background, [
        "#FFF",
        "#000",
      ])} 100%`}
  );
  background-repeat: no-repeat;
  background-size: 100% 1px;
  background-position: 0 100%;
  transition: ${(props) => props.theme.transition("background-size", "color")};
  font-size: ${(props) => props.theme.fontSize[parseInt(props.size || "1")]};

  &:hover {
    background-size: 100% 100%;
    color: ${(props) => props.theme.colors.background};
  }
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Margin = styled.div<{ gutter?: GutterSize }>`
  display: block;
  width: 100%;
  height: ${(props) => props.theme.space[parseInt(props.gutter || "2")]};
`;

export const Paragraph = styled.p<{ size?: GutterSize }>`
  margin: 0;
  font-size: ${(props) => props.theme.fontSize[parseInt(props.size || "1")]};
  font-weight: 300;
  letter-spacing: -${(props) => props.theme.letterSpacing[1]};
  color: ${(props) => props.theme.colors.text};
`;
