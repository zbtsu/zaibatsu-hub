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
import { settingsReducer } from "./slices/settingsSlice";
import { characterReducer } from "./slices/characterSlice";
import { filterReducer } from "./slices/filterSlice";
import characters from "../data/characters";
import { comboReducer } from "./slices/comboSlice";
import { forEditReducer } from "./slices/editSlice";
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
  settings: settingsReducer,
  characters: characterReducer,
  filters: filterReducer,
  combos: comboReducer,
  forEdit: forEditReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    version: 1,
    storage: electronStorage,
    migrate: (oldState: any) => {
      oldState.characters = {
        all: characters,
        selected: [],
      };
      oldState.filters = {
        filter: "",
        tags: [],
      };
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export interface RootState {
  modal: ReturnType<typeof modalReducer>;
  main: ReturnType<typeof mainReducer>;
  settings: ReturnType<typeof settingsReducer>;
  characters: ReturnType<typeof characterReducer>;
  filters: ReturnType<typeof filterReducer>;
  combos: ReturnType<typeof comboReducer>;
  forEdit: ReturnType<typeof forEditReducer>;
}
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
