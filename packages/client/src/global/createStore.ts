import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  getFirebase,
  actionTypes as rrfActionTypes,
  firebaseReducer,
} from "react-redux-firebase";
import { mainReducer } from "./slices/mainSlice";
import { modalReducer } from "./slices/modalSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import electronStorage from "./helpers/electronStorage";
import { PersistConfig } from "redux-persist/es/types";
// import { constants } from "redux-firestore";

const IGNORED_PERSISTED_ACTIONS = [
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
];

const IGNORED_FIREBASE_ACTIONS = Object.keys(rrfActionTypes).map(
  (type) => `@@reactReduxFirebase/${type}`
);

type FirebaseReducerType = ReturnType<typeof firebaseReducer>;

const rootReducer = combineReducers({
  main: mainReducer,
  firebase: firebaseReducer,
  modal: modalReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage: electronStorage,
    migrate: (oldState: any) => {
      oldState.firebase = {};
      return Promise.resolve(oldState);
    },
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: true,
  // enhancers: [composeEnhancers()],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // just ignore every redux-firebase and react-redux-firebase action type
          // ...Object.keys(rfConstants.actionTypes).map(
          //   (type) => `${rfConstants.actionsPrefix}/${type}`
          // ),
          ...IGNORED_FIREBASE_ACTIONS,

          ...IGNORED_PERSISTED_ACTIONS,
        ],
        ignoredPaths: ["firebase"],
      },
      thunk: {
        extraArgument: {
          getFirebase,
        },
      },
    }),
});
console.log({ store });

// Infer the `RootState` and `AppDispatch` types from the store itself
export interface RootState {
  firebase: FirebaseReducerType;
  modal: ReturnType<typeof modalReducer>;
  main: ReturnType<typeof mainReducer>;
}
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
