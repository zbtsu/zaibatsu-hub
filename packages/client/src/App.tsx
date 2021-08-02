import React from "react";
import {
  FirebaseAppProvider,
  preloadAuth,
  preloadDatabase,
  preloadFirestore,
  preloadFirestoreDoc,
  preloadRemoteConfig,
  preloadStorage,
  preloadUser,
  useFirebaseApp,
} from "reactfire";
import { ThemeProvider } from "styled-components";
import Picker from "./components/common/Picker";
import Sidebar from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { GlobalStyle } from "./styles";
import { AppContainer, AppContent } from "./styles/Grid";
import { hexToRgb } from "./utils/hextorgb";
import Routes from "./components/Routes";
import { Provider } from "react-redux";
import { persistor, store } from "./global/createStore";
import { PersistGate } from "redux-persist/integration/react";
import AuthActions from "./components/common/AuthActions";
import firebase from "firebase";
import "firebase/auth";
import RelativeSuspense from "./components/common/RelativeSuspense";
import useAppTheme from "./utils/hooks/useAppTheme";

const preloadSDKs = (firebaseApp: firebase.app.App) => {
  return Promise.all([
    preloadFirestore({
      firebaseApp,
      setup(firestore) {
        return firestore().enablePersistence();
      },
    }),
    preloadDatabase({ firebaseApp }),
    preloadStorage({
      firebaseApp,
      setup(storage) {
        return storage().setMaxUploadRetryTime(10000);
      },
    }),
    preloadAuth({ firebaseApp }),
    preloadRemoteConfig({
      firebaseApp,
      setup(remoteConfig) {
        remoteConfig().settings = {
          minimumFetchIntervalMillis: 10000,
          fetchTimeoutMillis: 10000,
        };
        return remoteConfig().fetchAndActivate();
      },
    }),
  ]);
};

const preloadData = async (firebaseApp: firebase.app.App) => {
  const user = await preloadUser({ firebaseApp });

  if (user) {
    await preloadFirestoreDoc((firestore) => firestore.doc("count/counter"), {
      firebaseApp,
    });
  }
};

const firebaseConfig = (() => {
  try {
    return JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || "{}");
  } catch (e) {
    return {};
  }
})();

firebase.initializeApp(firebaseConfig);

// console.log({ firebaseApp });
const colors = {
  light: {
    primary: "#213645",
    secondary: "#213443",
    error: "#C81D3C",
    success: "#1DC880",
    alert: "#FFC107",
    text: "#000000",
    background: "#FFFFFF",
    border: "#ececec",
    trafficLights: {
      max: "#33C949",
      min: "#FDBD41",
      close: "#FD5652",
    },
  },
  dark: {
    primary: "#1b74b5",
    secondary: "#16777e",
    error: "#C81D3C",
    success: "#1DC880",
    alert: "#FFC107",
    text: "#ffffff",
    background: "#141414",
    border: "#272727",
    trafficLights: {
      max: "#33C949",
      min: "#FDBD41",
      close: "#FD5652",
    },
  },
};

const THEME = (theme: "light" | "dark") => ({
  colors: colors[theme],
  space: ["0px", "7px", "14px", "24px", "32px", "48px"],
  fontSize: ["7px", "14px", "24px", "32px", "48px"],
  borderRadius: 0,
  shadow: ["0px", "7px", "14px", "24px", "32px", "48px"].map((e) => {
    return `0 10px ${e} -${parseInt(e) / 2}px rgba(${hexToRgb(
      colors.light.text,
      true
    )}, 0.2)`;
  }),
  letterSpacing: ["0.0", "0.03em", "0.04em", "0.06em"],
  transition: (...args: string[]) =>
    args.map((arg) => `${arg} 0.2s ease-in-out`).join(","),
});

firebase.auth().onAuthStateChanged(
  (e) => {
    console.log("AUTH STATE CHANGE");
    console.log(e);
  },
  (e) => {
    console.log("ERROR< AUTH");
    console.error(e);
  }
);

function App() {
  const theme = useAppTheme();
  const firebaseApp = useFirebaseApp();
  preloadSDKs(firebaseApp).then(() => preloadData(firebaseApp));
  return (
    <ThemeProvider theme={THEME(theme)}>
      <Routes.Wrapper>
        <AppContainer>
          <GlobalStyle />
          <TopBar />
          <RelativeSuspense>
            <AppContent>
              <AuthActions />
              <RelativeSuspense>
                <Sidebar />
              </RelativeSuspense>
              <RelativeSuspense>
                <Picker />
              </RelativeSuspense>
              <Routes.Switch />
            </AppContent>
          </RelativeSuspense>
        </AppContainer>
      </Routes.Wrapper>
    </ThemeProvider>
  );
}

const AppWrapped = () => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </FirebaseAppProvider>
  );
};

export default AppWrapped;
