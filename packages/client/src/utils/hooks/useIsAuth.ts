import * as React from "react";
import { useAppSelector } from "../../global/hooks";

export const useIsAuth = () => {
  const auth = useAppSelector((state) => state.firebase.auth);
  console.log({ auth });
  return auth && auth.uid;
};
