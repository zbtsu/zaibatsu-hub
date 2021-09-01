import React, { ReactElement } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "reactfire";

export default function ProtectedRoute(props: RouteProps): ReactElement {
  const auth = useAuth();
  if (!auth.currentUser || auth?.currentUser?.emailVerified)
    return <Redirect to="/" />;
  return <Route {...props} />;
}
