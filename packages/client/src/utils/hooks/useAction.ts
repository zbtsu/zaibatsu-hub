import { useMemo } from "react";
import { AnyAction } from "redux";
import { useAppDispatch } from "../../global/hooks";

const useAction = <T extends (...args: any[]) => AnyAction>(action: T) => {
  const dispatch = useAppDispatch();
  return (...args: Parameters<T>) => {
    return dispatch(action(...args));
  };
};

export const useActions = <T extends (...args: any[]) => AnyAction>(
  actions: T[]
) => {
  const mappedActions = useMemo(() => actions.map(useAction), [actions]);
  return mappedActions;
};

export default useAction;
