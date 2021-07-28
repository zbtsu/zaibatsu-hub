import React from "react";
import styled from "styled-components";
import { animated, useSpring } from "@react-spring/web";
import { Column, Row } from "../../styles/Grid";
import { hexToRgb } from "../../utils/hextorgb";
import { Home, Game, Share, Guide, Login, Settings } from "./icons";

const Wrapper = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border};
  width: 100px;
  display: flex;
  flex-flow: column;
  height: 100%;
`;

type IconRoute = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
  route?: string;
  title: string;
  icon: React.ReactNode;
};

const sideBar: IconRoute[] = [
  {
    icon: Home,
    route: "/",
    title: "Home",
  },
  {
    icon: Game,
    route: "/combos",
    title: "Combos",
  },
  {
    icon: Share,
    route: "/hub",
    title: "Hub",
  },
  {
    icon: Guide,
    route: "/guides",
    title: "Guides",
  },
];

const bottomBar: IconRoute[] = [
  {
    icon: Login,
    // route: "/combos",
    title: "Combos",
  },
  {
    icon: Settings,
    route: "/settings",
    title: "Settings",
  },
];

const IconHolder = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ToolTip = styled.span`
  position: absolute;
  left: 75%;
  top: 50%;
  opacity: 0;
  transform: translate(50%, -50%);
  display: "none";
  transform: translate(0, -50%);
  background: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadow[2]};
`;

const AToolTip = animated(ToolTip);

type ButtonProps = {
  bottom?: boolean;
};

const Button = styled.button<ButtonProps>`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 100%;
  position: relative;
  border-${(props) => (props.bottom ? "top" : "bottom")}: 1px solid ${(props) =>
  props.theme.colors.border};
  transition: ${(props) => props.theme.transition("background")};
  &:hover {
    background: ${(props) => props.theme.colors.border};
    & ${ToolTip} {
    }
  }
`;

interface IIconButton extends IconRoute, ButtonProps {}

const IconButton = ({ icon: Icon, route, title, bottom }: IIconButton) => {
  const [hovered, setHover] = React.useState(false);
  const spring = useSpring({
    initial: {
      opacity: 0,
      transform: "translate(50%, -50%)",
      display: "none",
    },
    to: async (next: any) => {
      if (hovered) {
        return await next({
          display: "block",
          opacity: 1,
          transform: "translate(0%, -50%)",
        });
      }
      await next({
        opacity: 0,
        transform: "translate(50%, -50%)",
      });
      return next({ display: "none" });
    },
  });
  return (
    <Button
      bottom={bottom}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <AToolTip style={spring}>{title}</AToolTip>
      <IconHolder>
        <Icon />
      </IconHolder>
    </Button>
  );
};

const Sidebar = () => {
  return (
    <Wrapper>
      <Row
        height="100%"
        direction="row"
        align="stretch"
        justify="space-between"
      >
        <Column>
          <Row direction="row">
            <Column fitContent width="100%">
              {sideBar.map((item, index) => (
                <IconButton key={index} {...item} />
              ))}
            </Column>
          </Row>
        </Column>
        <Column>
          <Row height="100%" direction="row" align="flex-end">
            <Column fitContent width="100%">
              {bottomBar.map((item, index) => (
                <IconButton bottom key={index} {...item} />
              ))}
            </Column>
          </Row>
        </Column>
      </Row>
    </Wrapper>
  );
};

export default Sidebar;
