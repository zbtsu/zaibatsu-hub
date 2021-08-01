import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
// import { constants } from "redux-firestore";

const IGNORED_PERSISTED_ACTIONS = [
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
];
const rootReducer = combineReducers({
  main: mainReducer,
  modal: modalReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage: electronStorage,
    migrate: (oldState: any) => {
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
        ignoredActions: [...IGNORED_PERSISTED_ACTIONS],
        ignoredPaths: ["firebase"],
      },
      thunk: {
        extraArgument: {},
      },
    }),
});
console.log({ store });

// Infer the `RootState` and `AppDispatch` types from the store itself
export interface RootState {
  modal: ReturnType<typeof modalReducer>;
  main: ReturnType<typeof mainReducer>;
}
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
