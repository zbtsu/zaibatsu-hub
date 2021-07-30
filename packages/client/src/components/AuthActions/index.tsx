import React from "react";
import { useAppSelector } from "../../global/hooks";
import { useModal } from "../../utils/hooks/useModal";
import { AuthActionsModal } from "../Modal/AuthActionsModal";

const AuthActions = () => {
  const user = useAppSelector((state) => state.firebase.auth);
  const [ref, modal] = useModal(AuthActionsModal, {
    openImmediately: !user.emailVerified,
    canClose: false,
    closeOn: user.emailVerified,
  });
  console.log({ user });
  if (user.emailVerified) return null;
  if (user.isLoaded && user.isEmpty) return null;
  return modal;
};

export default AuthActions;
