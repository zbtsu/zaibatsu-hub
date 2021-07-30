import React, { useCallback } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { down } from "styled-breakpoints";
import { animated, useSpring } from "@react-spring/web";
import { Column, Row } from "../../styles/Grid";
import {
  Home,
  Game,
  Share,
  Guide,
  Login,
  Settings,
  SidebarIconProps,
} from "./icons";
import { useHistory } from "react-router-dom";
import useRippleEffect from "../../utils/hooks/useRippleEffect";
import { hexToRgb } from "../../utils/hextorgb";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { useModal } from "../../utils/hooks/useModal";
import mergeRefs from "../../utils/mergeRefs";
import AuthModal from "../Modal/AuthModal";

const Wrapper = styled.div`
  border-right: 1px solid ${(props) => props.theme.colors.border};
  width: 92px;
  display: flex;
  flex-flow: column;
  height: 100%;
  ${down("md")} {
    width: ${(props) => props.theme.space[5]};
  }
`;

type IconRoute = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => any;
  route?: string;
  ifAuth?: boolean;
  logoutOnClick?: boolean;
  title: string;
  icon: React.FC<SidebarIconProps>;
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

const IconHolder = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  svg {
    width: ${(props) => props.theme.space[3]};
    height: ${(props) => props.theme.space[3]};
    object-fit: contain;
    ${down("md")} {
      width: ${(props) => props.theme.space[2]};
      height: ${(props) => props.theme.space[2]};
    }
  }
`;

const ToolTip = styled.span`
  position: absolute;
  left: 75%;
  top: 50%;
  opacity: 0;
  transform: translate(50%, -50%);
  display: none;
  transform: translate(0, -50%);
  background: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.space[1]} ${(props) => props.theme.space[2]};
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadow[2]};
  ${down("md")} {
    display: none !important;
  }
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
  width: 100%;
  padding-top: 100%;
  position: relative;
  border-top: ${(props) =>
    props.bottom ? `1px solid ${props.theme.colors.border}` : "none"};
  border-bottom: ${(props) =>
    !props.bottom ? `1px solid ${props.theme.colors.border}` : "none"};
  transition: ${(props) => props.theme.transition("background")};
  &:hover {
    background: ${(props) =>
      `rgba(${hexToRgb(props.theme.colors.background, true)},0.025)`};
    & ${ToolTip} {
    }
  }
`;

interface IIconButton extends IconRoute, ButtonProps {}

const IconButton = ({
  icon: Icon,
  route,
  title,
  bottom,
  onClick,
  logoutOnClick,
  ifAuth,
}: IIconButton) => {
  const [hovered, setHover] = React.useState(false);
  const [ref, ripples] = useRippleEffect();
  const [modalRef, modal] = useModal(AuthModal);
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
  const { push } = useHistory();
  const onClickFn = useCallback(() => {
    if (logoutOnClick === true) {
      console.log("logout");
      return firebase.auth().signOut();
    }
    if (route) return push(route);
  }, [route, push, logoutOnClick]);

  if (typeof ifAuth !== "undefined") {
    return null;
  }
  return (
    <Button
      ref={mergeRefs(logoutOnClick === false ? [modalRef, ref] : [ref])}
      bottom={bottom}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onClick={onClick || onClickFn}
    >
      {logoutOnClick === false && modal}
      {ripples}
      <AToolTip style={spring}>{title}</AToolTip>
      <IconHolder>
        <Icon logout={logoutOnClick} />
      </IconHolder>
    </Button>
  );
};

const Sidebar = () => {
  const isAuth = useIsAuth();
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
              {isAuth ? (
                <IconButton bottom icon={Login} title="Logout" logoutOnClick />
              ) : (
                <IconButton
                  bottom
                  icon={Login}
                  title="Login"
                  logoutOnClick={false}
                />
              )}
              <IconButton
                bottom
                icon={Settings}
                title="Settings"
                route="/settings"
              />
            </Column>
          </Row>
        </Column>
      </Row>
    </Wrapper>
  );
};

export default Sidebar;
