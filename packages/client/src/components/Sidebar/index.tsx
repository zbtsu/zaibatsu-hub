import React, { useCallback } from "react";
import styled from "styled-components";
import { down } from "styled-breakpoints";
import { animated, useSpring } from "@react-spring/web";
import { Center, Column, Row } from "../../styles/Grid";
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
import { useModal } from "../../utils/hooks/useModal";
import mergeRefs from "../../utils/mergeRefs";
import AuthModal from "../common/Modal/AuthModal";
import { useAuth, useUser } from "reactfire";
import RelativeSuspense from "../common/RelativeSuspense";
import { Avatar } from "../../styles/Common";

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
  icon: React.FC<SidebarIconProps> | any;
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
  color: ${(props) => props.theme.colors.text};
  z-index: 1000;
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

const IconButton = React.forwardRef(
  (
    { icon: Icon, route, title, bottom, onClick, logoutOnClick }: IIconButton,
    forwardedRef
  ) => {
    const [hovered, setHover] = React.useState(false);
    const [ref, ripples] = useRippleEffect();
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
    const onClickFn = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
          return onClick(e);
        }
        if (route) return push(route);
      },
      [route, push, onClick]
    );
    return (
      <Button
        ref={mergeRefs([ref, forwardedRef])}
        bottom={bottom}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={onClickFn}
      >
        {ripples}
        <AToolTip style={spring}>{title}</AToolTip>
        <IconHolder>
          <Icon />
        </IconHolder>
      </Button>
    );
  }
);

const Sidebar = () => {
  const user = useUser();
  const auth = useAuth();
  const [modalRef, modal] = useModal(AuthModal, {
    closeOn: Boolean(user?.data?.uid),
  });
  return (
    <RelativeSuspense>
      <Wrapper>
        <Row height="100%" direction="column" justify="space-between">
          <Column>
            {sideBar.map((item, index) => (
              <IconButton key={index} {...item} />
            ))}
          </Column>
          <Column shrink="1" grow="0">
            {!user?.data?.uid && (
              <>
                <IconButton ref={modalRef} bottom icon={Login} title="Login" />
                {modal}
              </>
            )}
            {user.data && (
              <IconButton
                bottom
                icon={() =>
                  user?.data?.photoURL && (
                    <Center>
                      <Avatar src={user.data.photoURL} />
                    </Center>
                  )
                }
                title="Logout"
                onClick={() => auth.signOut()}
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
      </Wrapper>
    </RelativeSuspense>
  );
};

export default Sidebar;
