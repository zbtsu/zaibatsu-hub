import * as React from "react";
import { createPortal } from "react-dom";
import { useRef } from "react";
import styled from "styled-components";
import { generateId } from "../nanoid";
import useAction from "./useAction";
import { closeModal, openModal } from "../../global/slices/modalSlice";
import { useAppSelector } from "../../global/hooks";
import { hexToRgb } from "../hextorgb";
import { useKey } from "rooks";
import { animated, useSpring } from "@react-spring/web";
import { Separator } from "../../styles/Grid";
import Close from "../../components/TopBar/icons/Close";
import Scrollable from "../../components/common/Scrollable";

export type ModalReturn = {
  title: string;
  content: React.ReactNode;
  subtitle?: string;
};

const ModalWrapper = styled.div`
  position: fixed;
  top: 37px;
  left: 0;
  width: 100%;
  height: calc(100vh - 37px);
  z-index: 1000;
  backdrop-filter: blur(10px);
  display: none;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    `rgba(${hexToRgb(props.theme.colors.background, true)},0.5)`};
`;

const ModalBody = styled.div`
  margin: ${(props) => props.theme.space[4]} auto;
  width: 90%;
  max-width: 456px;
  height: max-content;
  /* max-height: 80vh; */
  z-index: 1000;
  background-color: ${(props) => props.theme.colors.background};
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.border};
  box-shadow: ${(props) => props.theme.shadow[3]};
`;

const ModalTitle = styled.h3<{ hasSubtitle?: string }>`
  font-size: ${(props) => props.theme.fontSize[2]};
  margin: 0;
  padding: ${(props) => [props.theme.space[3], props.theme.space[4]].join(" ")};
  ${(props) => props.hasSubtitle && `padding-bottom: 0;`}
  letter-spacing: -${(props) => props.theme.letterSpacing[2]};
`;

const ModalSubtitle = styled.h4`
  font-size: ${(props) => props.theme.fontSize[1]};
  font-weight: 600;
  margin: 0;
  padding: ${(props) => [props.theme.space[3], props.theme.space[4]].join(" ")};
  padding-top: ${(props) => props.theme.space[1]};
  letter-spacing: -${(props) => props.theme.letterSpacing[1]};
`;

const ModalContent = styled.div`
  padding: ${(props) => [props.theme.space[3], props.theme.space[4]].join(" ")};
`;

const ModalClose = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${(props) => props.theme.transition("background")};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-right: 0;
  border-top: 0;
  background: ${(props) => props.theme.colors.background};
  &:hover {
    svg {
      path {
        fill: white;
      }
    }
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.error};
  }
`;

const AnimatedModalWrapper = animated(ModalWrapper);

const Modal: React.FC<{
  title: string;
  id: string;
  subtitle?: string;
  canClose?: boolean;
}> = ({ children, subtitle, title, id, canClose }) => {
  const modalOpen = useAppSelector((state) => state.modal?.open === id);
  const [open, setOpen] = React.useState(false);
  const spring = useSpring({
    to: async (next) => {
      if (modalOpen) {
        setOpen(true);
        return await next({
          opacity: 1,
          transform: "translate(0, 0)",
          display: "block",
        });
      } else {
        await next({
          opacity: 0,
          transform: "translate(0, 10%)",
        });
        await next({ display: "none" });
        return setOpen(false);
      }
    },
  });
  const closeModalAction = useAction(closeModal);
  useKey("Escape", (e) => open && closeModalAction());
  if (!open) return null;
  return (
    <AnimatedModalWrapper
      id={id}
      onMouseOver={(e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      style={spring}
    >
      <Scrollable>
        <ModalBody>
          {canClose && (
            <ModalClose onClick={(e) => closeModalAction()}>
              <Close />
            </ModalClose>
          )}
          <ModalTitle hasSubtitle={subtitle}>{title}</ModalTitle>
          {subtitle && <ModalSubtitle>{subtitle}</ModalSubtitle>}
          <Separator />
          <ModalContent>{children}</ModalContent>
        </ModalBody>
      </Scrollable>
    </AnimatedModalWrapper>
  );
};

const modalParent = document.querySelector("#modal-portal") as Element;

type ModalOptions = {
  openImmediately?: boolean;
  closeOn?: boolean;
  canClose?: boolean;
};

export const useModal = (
  useModalContent: () => ModalReturn,
  {
    openImmediately = false,
    closeOn = false,
    canClose = true,
  }: ModalOptions = {}
): [React.RefObject<HTMLDivElement | HTMLButtonElement>, React.ReactPortal] => {
  const { content, title, subtitle } = useModalContent();
  const ref = useRef<HTMLDivElement | HTMLButtonElement>(null);
  const id = useRef(generateId());
  const openModalFn = useAction(openModal);
  const closeModalFn = useAction(closeModal);
  const onClick = React.useCallback(() => {
    openModalFn({ id: id.current });
  }, [id, openModalFn]);
  React.useEffect(() => {
    if (openImmediately) {
      onClick();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (closeOn) {
      closeModalFn();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeOn]);
  React.useLayoutEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener("click", onClick);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("click", onClick);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
  return [
    ref,
    createPortal(
      <Modal
        canClose={canClose}
        title={title}
        id={id.current}
        subtitle={subtitle}
      >
        {content}
      </Modal>,
      modalParent
    ),
  ];
};
