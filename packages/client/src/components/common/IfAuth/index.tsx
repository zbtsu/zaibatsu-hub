import React from "react";
import { useAuth } from "reactfire";

const IfAuthHelper = (ifAuth: boolean) => {
  const IfAuth: React.FC<{}> = ({ children }) => {
    const auth = useAuth();
    if (auth?.currentUser?.emailVerified && ifAuth) {
      return <>{children}</>;
    }
    if (!auth?.currentUser?.emailVerified && !ifAuth) {
      return <>{children}</>;
    }
    return null;
  };
  return IfAuth;
};

const IfAuth = IfAuthHelper(true);

const IfNotAuth = IfAuthHelper(false);

export default { IfAuth, IfNotAuth };
