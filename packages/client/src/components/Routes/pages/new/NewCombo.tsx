import React from "react";
import { PageHeader, PageInner, PageWrapper } from "../../../../styles/Common";
import ComboForm from "../../../common/Forms/ComboForm";

interface Props {}

const NewCombo = () => {
  return (
    <PageWrapper>
      <PageHeader description={"How difficult is this combo? About $200."}>
        New Combo
      </PageHeader>
      <PageInner>
        <ComboForm />
      </PageInner>
    </PageWrapper>
  );
};

export default NewCombo;
