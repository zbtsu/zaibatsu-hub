import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { hexToRgb } from "../../../utils/hextorgb";
import useRippleEffect from "../../../utils/hooks/useRippleEffect";
import { useTransition, animated } from "@react-spring/web";

const TabWrapper = styled.div``;

const TabHeader = styled.ul<{ noTopBorder?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid ${(props) => props.theme.colors.border};
  ${(props) => props.noTopBorder && "border-top: 0;"}
  border-left: 0;
  border-right: 0;
`;

const TabHeaderSingleWrapper = styled.li<{ isActive?: boolean }>`
  flex: 1;
  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[3]};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};
  user-select: none;
  font-size: ${(props) => props.theme.fontSize[1]};
  letter-spacing: -${(props) => props.theme.letterSpacing[2]};
  transition: ${(props) => props.theme.transition("background-color")};
  background-color: ${(props) =>
    props.isActive
      ? `rgba(${hexToRgb(props.theme.colors.text, true)},0.05)`
      : props.theme.colors.background};
  & + & {
    border-left: 1px solid ${(props) => props.theme.colors.border};
  }
`;

const PaneWrapper = styled.div`
  width: 100%;
`;

const TabContent = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

interface WrapperProps {
  noTopBorder?: boolean;
}

interface PaneProps {
  key: string;
  title: string;
  disabled?: boolean;
  disabledMessage?: string;
}

const Pane: React.FC<PaneProps> = ({ children }) => {
  return <PaneWrapper>{children}</PaneWrapper>;
};

interface TabHeaderProps {
  header: HeaderType;
  setActive: (...args: any[]) => any;
  isActive?: boolean;
}

const TabHeaderSingle: React.FC<TabHeaderProps> = (props) => {
  const [ref, ripples] = useRippleEffect();
  return (
    <TabHeaderSingleWrapper
      isActive={props.isActive}
      ref={ref}
      onClick={props.setActive}
    >
      {ripples}
      {props.header.title}
    </TabHeaderSingleWrapper>
  );
};

type HeaderType = { title: string; key: string };

const TabContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.space[3]};
`;

const AnimatedTabContentWrapper = animated(TabContentWrapper);
const Wrapper: React.FC<WrapperProps> = ({ children, noTopBorder }) => {
  if (React.Children.toArray(children).length === 0)
    throw new Error("Wrapper must have at least one child");
  const [tabHeaders, setTabHeaders] = useState<HeaderType[]>([]);
  const [panes, setPanes] = useState<{
    [name: string]: React.ReactNode;
  }>({});
  const [active, setActive] = useState("");

  const transition = useTransition(active, {
    keys: (i) => i,

    from: {
      opacity: 0,
      transform: "translateX(-50%)",
    },
    enter: {
      opacity: 1,
      transform: "translateX(0%)",
      position: "relative",
    },
    leave: {
      opacity: 0,
      position: "absolute",
      transform: "translateX(50%)",
    },
  });
  const elems = transition((style, item, t, i) => {
    const ActivePane = panes[item];
    return (
      <AnimatedTabContentWrapper style={style}>
        {ActivePane}
      </AnimatedTabContentWrapper>
    );
  });
  useEffect(() => {
    const headers = [] as HeaderType[];
    const actualChildren: {
      [name: string]: React.ReactNode;
    } = {};
    React.Children.forEach(children, (element) => {
      const newElem = element as React.ReactElement<PaneProps>;
      if (!React.isValidElement(element) && newElem.type !== Pane) return;
      if (!newElem.key) return null;
      headers.push({
        title: newElem.props.title,
        key: newElem.key as string,
      });
      actualChildren[newElem.key] = newElem;
    });
    setTabHeaders(headers);
    setPanes((oldPanes) => ({
      ...oldPanes,
      ...actualChildren,
    }));
    setActive(headers[0].key);
  }, [children]);
  return (
    <TabWrapper>
      <TabHeader {...{ noTopBorder }}>
        {tabHeaders.map((e) => (
          <TabHeaderSingle
            header={e}
            isActive={active === e.key}
            setActive={() => setActive(e.key)}
            key={`${e.key}-tab-header`}
          />
        ))}
      </TabHeader>
      <TabContent>{elems}</TabContent>
    </TabWrapper>
  );
};

const Tabs = {
  Wrapper,
  Pane,
};

export default Tabs;
