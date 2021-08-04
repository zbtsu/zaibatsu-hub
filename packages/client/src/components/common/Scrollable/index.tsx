import React from "react";
import Scrollbars, { ScrollbarProps } from "react-custom-scrollbars";
import styled from "styled-components";
import { hexToRgb } from "../../../utils/hextorgb";

const StyledScrollbar = styled(Scrollbars)`
  > .track-vertical {
    // may require some other styles here
    right: 0;
    height: 100%;
    width: 10px !important;
    .thumb-vertical {
      background: ${(props) =>
        `rgba(${hexToRgb(props.theme.colors.text)}, 0.25)`};
      transition: ${(props) => props.theme.transition("background")};
    }
    &:hover {
      .thumb-vertical {
        background: ${(props) =>
          `rgba(${hexToRgb(props.theme.colors.text)}, 0.5)`};
      }
    }
  }
`;

const Scrollable: React.FC<ScrollbarProps> = ({ children, ...rest }) => {
  return (
    <StyledScrollbar
      hideTracksWhenNotNeeded
      autoHide
      {...(rest as any)}
      renderTrackVertical={(props) => (
        <div {...props} className="track-vertical" />
      )}
      renderThumbVertical={(props) => (
        <div {...props} className="thumb-vertical" />
      )}
    >
      {children}
    </StyledScrollbar>
  );
};

export default Scrollable;
