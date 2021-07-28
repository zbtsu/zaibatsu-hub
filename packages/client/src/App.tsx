import React from "react";
import { ThemeProvider } from "styled-components";
import MainContent from "./components/MainContent";
import Picker from "./components/Picker";
import Sidebar from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { GlobalStyle } from "./styles";
import { AppContainer, AppContent } from "./styles/Grid";
import { hexToRgb } from "./utils/hextorgb";
const colors = {
  light: {
    primary: "#85E6FF",
    secondary: "213443",
    error: "#C81D3C",
    success: "#1DC880",
    text: "#000",
    background: "#fff",
    border: "#ececec",
  },
  dark: {},
};
function App() {
  return (
    <ThemeProvider
      theme={{
        colors: colors.light,
        space: ["0px", "7px", "14px", "24px", "32px", "48px"],
        fontSize: ["7px", "14px", "24px", "32px", "48px"],
        borderRadius: 0,
        shadow: ["0px", "7px", "14px", "24px", "32px", "48px"].map((e) => {
          return `0 10px ${e} -${parseInt(e) / 2}px rgba(${hexToRgb(
            colors.light.text,
            true
          )}, 0.2)`;
        }),
        transition: (...args) =>
          args.map((arg) => `${arg} 0.2s ease-in-out`).join(","),
      }}
    >
      <AppContainer>
        <GlobalStyle />
        <TopBar />
        <AppContent>
          <Sidebar />
          <Picker />
          <MainContent />
        </AppContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
