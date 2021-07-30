import React from "react";
import { ThemeProvider } from "styled-components";
import firebase from "firebase/app";
import "firebase/auth";
import Picker from "./components/Picker";
import Sidebar from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { GlobalStyle } from "./styles";
import { AppContainer, AppContent } from "./styles/Grid";
import { hexToRgb } from "./utils/hextorgb";
import Routes from "./components/Routes";
import { Provider } from "react-redux";
import { persistor, store } from "./global/createStore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { PersistGate } from "redux-persist/integration/react";
import AuthActions from "./components/AuthActions";

const firebaseConfig = (() => {
  try {
    return JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || "{}");
  } catch (e) {
    return {};
  }
})();

firebase.initializeApp(firebaseConfig);

const colors = {
  light: {
    primary: "#213645",
    secondary: "213443",
    error: "#C81D3C",
    success: "#1DC880",
    text: "#000000",
    background: "#FFFFFF",
    border: "#ececec",
  },
  dark: {},
};
const rrfConfig = {
  userProfile: "users",
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <ThemeProvider
            theme={{
              colors: colors.light,
              space: ["0px", "7px", "14px", "24px", "32px", "48px"],
              fontSize: ["7px", "14px", "24px", "32px", "48px"],
              borderRadius: 0,
              shadow: ["0px", "7px", "14px", "24px", "32px", "48px"].map(
                (e) => {
                  return `0 10px ${e} -${parseInt(e) / 2}px rgba(${hexToRgb(
                    colors.light.text,
                    true
                  )}, 0.2)`;
                }
              ),
              letterSpacing: ["0.0", "0.03em", "0.04em", "0.06em"],
              transition: (...args) =>
                args.map((arg) => `${arg} 0.2s ease-in-out`).join(","),
            }}
          >
            <Routes.Wrapper>
              <AppContainer>
                <GlobalStyle />
                <TopBar />
                <AppContent>
                  <AuthActions />
                  <Sidebar />
                  <Picker />
                  <Routes.Switch />
                </AppContent>
              </AppContainer>
            </Routes.Wrapper>
          </ThemeProvider>
        </ReactReduxFirebaseProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
