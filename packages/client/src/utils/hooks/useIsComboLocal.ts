import React from "react";
import { useUser } from "reactfire";
import { useAppSelector } from "../../global/hooks";
import { ICombo } from "../../models/Combo";

const useIsComboLocalOrOwner = (props: ICombo) => {
  const isLocal = useAppSelector(({ combos }) =>
    combos.all.some((combo) => {
      return combo.id === props.id;
    })
  );
  const user = useUser();
  if (user?.data?.uid && props.author?.uid === user.data.uid) {
    return true;
  }
  return isLocal;
};

const useCanSaveCombo = (props: ICombo) => {
  const isLocal = useIsComboLocalOrOwner(props);
  const user = useUser();
  if (isLocal) {
    return false;
  }
};

export default useIsComboLocalOrOwner;
