import React from "react";
import { PageHeader, PageWrapper } from "../../../styles/Common";
import { useUser } from "reactfire";
import Filters from "../../common/Filters";

const Home = () => {
  const user = useUser();
  console.log(user.data);
  return (
    <PageWrapper>
      <PageHeader description="Hey, alright! This is where your favorites and stuff live.">
        Home
      </PageHeader>
      <Filters />
    </PageWrapper>
  );
};

export default Home;
