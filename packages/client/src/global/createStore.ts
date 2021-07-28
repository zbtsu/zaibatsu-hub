import { configureStore } from "@reduxjs/toolkit";
import {
  getFirebase,
  actionTypes as rrfActionTypes,
  firebaseReducer,
  FirebaseReducer,
} from "react-redux-firebase";
import { compose } from "redux";
import { mainReducer } from "./slices/mainSlice";
import { modalReducer } from "./slices/modalSlice";
// import { constants } from "redux-firestore";

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

type FirebaseReducerType = ReturnType<typeof firebaseReducer>;

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
    // modal: modalReducer,
  },
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
          ...Object.keys(rrfActionTypes).map(
            (type) => `@@reactReduxFirebase/${type}`
          ),
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState> | FirebaseReducerType;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
