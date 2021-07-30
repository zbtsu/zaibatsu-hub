import { useAppSelector } from "../../global/hooks";

export const useIsAuth = () => {
  const auth = useAppSelector((state) => state.firebase.auth);
  return auth && auth.uid;
};
