import React from "react";
import { Redirect } from "react-router-dom";
import { useAppSelector } from "../../../../global/hooks";
import { PageHeader, PageInner, PageWrapper } from "../../../../styles/Common";
import ComboForm from "../../../common/Forms/ComboForm";

interface Props {}

const EditCombo = (props: Props) => {
  const comboForEdit = useAppSelector((state) => state.forEdit.combo);
  if (!comboForEdit) {
    return <Redirect to="/" />;
  }
  return (
    <PageWrapper>
      <PageHeader description={"How difficult is this combo? About $200."}>
        New Combo
      </PageHeader>
      <PageInner>
        <ComboForm defaultValues={comboForEdit} />
      </PageInner>
    </PageWrapper>
  );
};

export default EditCombo;
