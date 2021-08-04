import React from "react";
import { PageHeader, PageWrapper } from "../../../styles/Common";
import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import Filters from "../../common/Filters";
import { SmallCombo } from "../../common/ComboPreview";
import { useAppSelector } from "../../../global/hooks";
import type { ICombo } from "../../../models/Combo";
import RelativeSuspense from "../../common/RelativeSuspense";
import { useMemo } from "react";

const MainContainer = () => {
  const { filter, tags } = useAppSelector((state) => state.filters);
  const fireStore = useFirestore();
  const combosRef = useMemo(() => {
    let combos = fireStore.collection("combos");
    if (tags.length)
      combos = combos.where(`tags`, `array-contains-any`, tags) as any;

    if (filter) {
    }

    return combos;
  }, [fireStore, tags, filter]);

  const combos = useFirestoreCollectionData(combosRef);
  return (
    <>
      {combos?.data?.map((e) => (
        <SmallCombo {...(e as ICombo)} />
      ))}
    </>
  );
};

const Home = () => {
  const user = useUser();
  return (
    <PageWrapper>
      <PageHeader description="Hey, alright! This is where your favorites and stuff live.">
        Home
      </PageHeader>
      <Filters />
      <RelativeSuspense fixed={false}>
        <MainContainer />
      </RelativeSuspense>
    </PageWrapper>
  );
};

export default Home;
