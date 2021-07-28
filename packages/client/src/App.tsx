import React from "react";
import { ThemeProvider } from "styled-components";
import firebase from "firebase";
import "firebase/auth";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import Picker from "./components/Picker";
import Sidebar from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { GlobalStyle } from "./styles";
import { AppContainer, AppContent } from "./styles/Grid";
import { hexToRgb } from "./utils/hextorgb";
import Routes from "./components/Routes";

const firebaseConfig = (() => {
  try {
    return JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || "{}");
  } catch (e) {
    return {};
  }
})();
console.log(firebaseConfig);
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
    <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
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
        <Routes.Wrapper>
          <AppContainer>
            <GlobalStyle />
            <TopBar />
            <AppContent>
              <Sidebar />
              <Picker />
              <Routes.Switch />
            </AppContent>
          </AppContainer>
        </Routes.Wrapper>
      </ThemeProvider>
    </FirebaseAuthProvider>
  );
}

export default App;
