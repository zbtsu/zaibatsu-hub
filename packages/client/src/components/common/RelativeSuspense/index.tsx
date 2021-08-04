import React, { Suspense } from "react";
import Spinner from "../Spinner";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  > div {
    height: 100%;
  }
`;

const RelativeSuspense: React.FC<{ fixed?: boolean }> = ({
  children,
  fixed,
}) => {
  return (
    <Wrapper>
      <Suspense fallback={<Spinner fixed={fixed} />}>{children}</Suspense>
    </Wrapper>
  );
};

export default RelativeSuspense;
