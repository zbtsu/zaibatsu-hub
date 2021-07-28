import * as React from "react";
import { createPortal } from "react-dom";
import { useRef } from "react";
import styled from "styled-components";
import { generateId } from "../nanoid";
import useAction from "./useAction";
import { openModal } from "../../global/slices/modalSlice";
import { useAppSelector } from "../../global/hooks";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBody = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  width: 400px;
  max-height: 80vh;
  z-index: 1000;
  transform: translate(-50%, -50%);
  background-color: #fff;
`;

const Modal: React.FC<{ title: string; id: string }> = ({
  children,
  title,
  id,
}) => {
  const modalOpen = useAppSelector((state) => state.modal.open);
  if (modalOpen !== id) return null;
  return (
    <ModalWrapper id={id}>
      <ModalBody>{children}</ModalBody>
    </ModalWrapper>
  );
};

const modalParent = document.querySelector("#modal-portal") as Element;
console.log(modalParent);
export const useModal = ({
  content: ModalContent,
  title,
}: {
  content: React.FC;
  title: string;
}): [
  React.RefObject<HTMLDivElement | HTMLButtonElement>,
  React.ReactPortal
] => {
  const ref = useRef<HTMLDivElement | HTMLButtonElement>(null);
  const id = useRef(generateId());
  const openModalFn = useAction(openModal);
  const onClick = React.useCallback(() => {
    openModalFn({ id: id.current });
  }, [id]);
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
  }, [ref]);
  return [
    ref,
    createPortal(
      <Modal title={title} id={id.current}>
        <ModalContent />
      </Modal>,
      modalParent
    ),
  ];
};
