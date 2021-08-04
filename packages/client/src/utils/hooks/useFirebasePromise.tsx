import { useState } from "react";

type InitialState<T extends any> = {
  error?: string;
  loading?: boolean;
  result?: T;
};

const initialState: InitialState<any> = {
  error: "",
  loading: false,
  result: undefined,
};

type OptionsType = {
  initialState: InitialState<any>;
};

// type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export const useFirebasePromise = (
  options: OptionsType = { initialState }
): [InitialState<any>, (callBack: () => Promise<any>) => Promise<void>] => {
  const [state, setState] = useState(options.initialState);
  const wrapFirebaseAction = async (callBack: () => Promise<any>) => {
    let result: ReturnType<typeof callBack> | null = null;
    try {
      result = (await callBack()) as ReturnType<typeof callBack>;
      setState((state) => ({ ...state, result: result || true }));
    } catch (e) {
      setState((state) => ({ ...state, error: e.message }));
    } finally {
      setState((state) => ({ ...state, loading: false }));
    }
    if (result) {
      return result;
    }
  };
  return [state, wrapFirebaseAction];
};

// export const useFirebasePromise = <
//   T extends FirebaseType<any, any> | AnyFunction
// >(
//   firebaseAction: T,
//   options: OptionsType = {
//     initialState,
//   }
// ): [InitialState<ThenArg<T>>, (...args: Parameters<any>) => void] => {
//   const [state, setState] = useState<InitialState<ThenArg<T>>>(
//     options.initialState
//   );
//   const doPromise = async (...args: Parameters<any>) => {
//     console.log(args);
//     let mockState = {} as InitialState<ThenArg<T>>;
//     setState((state) => ({ ...state, loading: true }));
//     try {
//       if (typeof firebaseAction === "object") {
//         firebaseAction.path = firebaseAction.path || "";
//         const { path, functionPath } = firebaseAction;
//         const result = await ((firebase as any)[path] as any)()[functionPath](
//           ...args
//         );
//         setState((state) => ({ ...state, result }));
//         mockState.result = result;
//       } else {
//         const result = (await firebaseAction(...args)) as ThenArg<T>;
//         setState((state) => ({ ...state, result }));
//         mockState.result = result;
//       }
//     } catch (e) {
//       console.error(e);
//       setState((state) => ({ ...state, error: e.message }));
//       mockState.error = e.message;
//     } finally {
//       setState((state) => ({ ...state, loading: false }));
//       mockState.loading = false;
//     }
//     return mockState;
//   };
//   return [state, doPromise];
// };

// export const useFirebaseAuth = <T extends keyof firebase.auth.Auth>(
//   firebaseAction: T,
//   options: OptionsType = {
//     initialState,
//   }
// ): [InitialState<ThenArg<T>>, (...args: Parameters<any>) => void] => {
//   const [state, setState] = useState<InitialState<ThenArg<T>>>(
//     options.initialState
//   );
//   const doPromise = async (...args: Parameters<any>) => {
//     console.log(args);
//     let mockState = {} as InitialState<ThenArg<T>>;
//     setState((state) => ({ ...state, loading: true }));
//     try {
//       const result = (await (firebase.auth() as any)([firebaseAction] as any)(
//         ...args
//       )) as ThenArg<T>;
//       setState((state) => ({ ...state, result }));
//       mockState.result = result;
//     } catch (e) {
//       console.error(e);
//       setState((state) => ({ ...state, error: e.message }));
//       mockState.error = e.message;
//     } finally {
//       setState((state) => ({ ...state, loading: false }));
//       mockState.loading = false;
//     }
//     return mockState;
//   };
//   return [state, doPromise];
// };
