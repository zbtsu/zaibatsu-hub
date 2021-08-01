import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { hexToRgb } from "../hextorgb";
import { generateId } from "../nanoid";

const zoomIn = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1
  }
  to {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0
  }
`;

const RippleSpan = styled.span<{ top: number; left: number }>`
  border-radius: 100%;
  width: 100%;
  padding-top: 100%;
  position: absolute;
  top: ${(props) => props.top}px;
  /* top: 0; */
  background: ${(props) =>
    `rgba(${hexToRgb(props.theme.colors.text, true)}, 0.1)`};
  left: ${(props) => props.left}px;
  /* left: 0; */
  animation: ${zoomIn} 0.5s ease-out;
`;

const RippleHolder = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  pointer-events: none;
`;

const useRippleEffect = (): [
  React.MutableRefObject<any>,
  React.ReactElement
] => {
  const [ripples, setRipples] = React.useState<
    { top: number; left: number; id: string }[]
  >([]);
  const ref = useRef<any>(null);
  const addRipple = useRef((event: MouseEvent) => {
    const currentTargetRect = (
      event.currentTarget as HTMLButtonElement
    ).getBoundingClientRect();
    const event_offsetX = event.pageX - currentTargetRect.left,
      event_offsetY = event.pageY - currentTargetRect.top;
    const id = generateId();
    const newRipple = { top: event_offsetY, left: event_offsetX, id };
    setRipples((ripples) => [...ripples, newRipple]);
    setTimeout(() => {
      setRipples((ripples) => ripples.filter((ripple) => ripple.id !== id));
    }, 500);
  });
  useEffect(() => {
    const currentRef = ref.current;
    const currentRipple = addRipple.current;
    if (currentRef) {
      currentRef.style.position = "relative";
      currentRef.addEventListener("click", currentRipple);
    }
    return () => {
      if (currentRef) {
        currentRef.style.position = "";

        currentRef.removeEventListener("click", currentRipple);
      }
    };
  }, []);
  const rippleElems = (
    <RippleHolder>
      {ripples.map((ripple) => (
        <RippleSpan key={ripple.id} top={ripple.top} left={ripple.left} />
      ))}
    </RippleHolder>
  );
  return [ref, rippleElems];
};

export default useRippleEffect;
