import styled from "styled-components";
import { getPercent } from "../utils/percent";

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
  gutter?: "0" | "1" | "2" | "3" | "4" | "5";
  direction?: "column" | "row";
  height?: string;
  width?: string;
}

interface ColProps {
  height?: string;
  width?: string;
  size?:
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
  fitContent?: boolean;
}

export const Row = styled.div<RowProps>`
  display: flex;
  ${(props) => props.height && `height: ${props.height};`}
  ${(props) => props.width && `width: ${props.width};`}
  flex-flow: ${(props) => props.direction || "row"} wrap;
  align-items: ${(props) => props.align || "flex-start"};
  justify-content: ${(props) => props.justify || "flex-start"};
  gap: ${(props) => props.theme.space[parseInt(props.gutter || "2")]};
`;

export const Column = styled.div<ColProps>`
  ${(props) =>
    !props.fitContent &&
    `flex: ${props.size || 1} 0 ${getPercent(props.size || 12, 12)}%;`}
  ${(props) => props.height && `height: ${props.height};`}
  ${(props) => props.width && `width: ${props.width};`}
`;

export const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
`;

export const AppContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  max-height: 100%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
`;
