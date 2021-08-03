import React from "react";
import SettingsForms from "../../common/Settings";
import { PageHeader, PageWrapper } from "../../../styles/Common";
import Tabs from "../../common/Tabs";
import { useUser } from "reactfire";

const Settings = () => {
  const user = useUser();
  console.log(user.data);
  return (
    <PageWrapper>
      <PageHeader description="Let's change some stuff.">Settings</PageHeader>
      <Tabs.Wrapper noTopBorder>
        <Tabs.Pane key="app-settings" title="App Settings">
          <SettingsForms.App />
        </Tabs.Pane>
        <Tabs.Pane
          key="profile-settings"
          title="Profile Settings"
          disabled={!user.data}
          disabledMessage="You need to be logged in to do that!"
        >
          <SettingsForms.Profile />
        </Tabs.Pane>
      </Tabs.Wrapper>
    </PageWrapper>
  );
};

export default Settings;
