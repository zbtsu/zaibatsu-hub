import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'Inter';
      src: url('fonts/Inter.woff2') format('woff2'),
          url('fonts/Inter.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
      font-size: 14px;
  }
  body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    color: ${({ theme }) => theme.colors.text};
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
    font-family: 'Inter';
  }
  iframe {
    width: 0% !important;
    height: 0% !important;
  }
  #modal-portal {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    z-index: 1000;
  }
`;
