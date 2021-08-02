import React from "react";
import { PageHeader, PageWrapper } from "../../../styles/Common";
import { useUser } from "reactfire";

const Home = () => {
  const user = useUser();
  console.log(user.data);
  return (
    <PageWrapper>
      <PageHeader>Home</PageHeader>
    </PageWrapper>
  );
};

export default Home;
