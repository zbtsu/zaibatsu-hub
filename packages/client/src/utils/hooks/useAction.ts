import { AnyAction } from "redux";
import { useAppDispatch } from "../../global/hooks";

const useAction = <T extends (...args: any[]) => AnyAction>(action: T) => {
  const dispatch = useAppDispatch();
  return (...args: Parameters<T>) => {
    return dispatch(action(...args));
  };
};

export default useAction;
