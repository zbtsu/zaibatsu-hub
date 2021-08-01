import React from "react";
import { PageHeader, PageWrapper } from "../../../styles/Common";
import Tabs from "../../common/Tabs";

const Settings = () => {
  return (
    <PageWrapper>
      <PageHeader>Settings</PageHeader>
      <Tabs.Wrapper noTopBorder>
        <Tabs.Pane key="jakoto" title="User Settings">
          PREJAKOTO1
        </Tabs.Pane>
        <Tabs.Pane key="jakoto2" title="App Settings">
          PREJAKOTO2
        </Tabs.Pane>
      </Tabs.Wrapper>
    </PageWrapper>
  );
};

export default Settings;
