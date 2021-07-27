import React from "react";
import { ThemeProvider } from "styled-components";
import { TopBar } from "./components/TopBar";
import { GlobalStyle } from "./styles";
import { AppContainer } from "./styles/Grid";

function App() {
  return (
    <ThemeProvider
      theme={{
        colors: {
          primary: "#85E6FF",
          secondary: "213443",
          error: "#C81D3C",
          success: "#1DC880",
          text: "#000",
          background: "#fff",
          border: "#ececec",
        },
        space: ["0px", "7px", "14px", "26px"],
        fontSize: ["7px", "14px", "24px", "32px", "48px"],
        borderRadius: 0,
      }}
    >
      <AppContainer>
        <GlobalStyle />
        <TopBar />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
