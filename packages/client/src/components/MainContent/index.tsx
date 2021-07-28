import React from "react";
import styled from "styled-components";
import { Column, Row } from "../../styles/Grid";
import { Scrollbars } from "react-custom-scrollbars";
import { hexToRgb } from "../../utils/hextorgb";

const Wrapper = styled.div`
  flex: 1;
  max-height: 100%;
`;

const BigBox = styled.div`
  width: 100%;
  height: 100px;
  background: grey;
`;

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

const MainContent = () => {
  return (
    <Wrapper>
      <StyledScrollbar
        autoHide
        renderTrackVertical={(props) => (
          <div {...props} className="track-vertical" />
        )}
        renderThumbVertical={(props) => (
          <div {...props} className="thumb-vertical" />
        )}
      >
        <Row direction="column">
          <BigBox />
          <BigBox />
          <BigBox />
          <BigBox />
          <BigBox />
          <BigBox />
          <BigBox />
          <BigBox />
        </Row>
      </StyledScrollbar>
    </Wrapper>
  );
};

export default MainContent;
