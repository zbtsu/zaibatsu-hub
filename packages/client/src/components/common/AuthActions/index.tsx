import { useUser } from "reactfire";
import { useModal } from "../../../utils/hooks/useModal";
import { AuthActionsModal } from "../Modal/AuthActionsModal";

const AuthActions = () => {
  const user = useUser();
  const modalReturn = useModal(AuthActionsModal, {
    openImmediately: !user?.data?.emailVerified,
    canClose: false,
    closeOn: user?.data?.emailVerified,
  });
  if (!user?.data) return null;
  if (user?.data?.emailVerified) return null;
  return modalReturn[1];
};

export default AuthActions;
