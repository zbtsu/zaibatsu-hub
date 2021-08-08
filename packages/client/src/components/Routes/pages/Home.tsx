import React from "react";
import { PageHeader, PageInner, PageWrapper } from "../../../styles/Common";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import Filters from "../../common/Filters";
import { SmallCombo } from "../../common/ComboPreview";
import { useAppSelector } from "../../../global/hooks";
import type { ICombo } from "../../../models/Combo";
import RelativeSuspense from "../../common/RelativeSuspense";
import { useMemo } from "react";
import { Button } from "../../common/Form/Button";
import { IoAdd } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import Tabs from "../../common/Tabs";
import { hasCharacter, hasTags } from "../../../utils/toolkit";

const OnlineCombos = () => {
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

const LocalCombos = () => {
  const { filter, tags } = useAppSelector((state) => state.filters);
  const localCombos = useAppSelector((state) => {
    const selectedCharacters = state.characters.selected;
    return state.combos.all
      .filter(hasTags(tags))
      .filter(hasCharacter(selectedCharacters.map(({ id }) => id)));
  });
  return (
    <>
      {localCombos?.map((e) => (
        <SmallCombo {...e} />
      ))}
    </>
  );
};

const Home = () => {
  const history = useHistory();
  return (
    <PageWrapper>
      <PageHeader
        EndContent={() => (
          <Button
            noBorder
            onClick={(e) => {
              history.push("/new/combo");
            }}
          >
            <IoAdd size={18} />
          </Button>
        )}
        description="Hey, alright! This is where your favorites and stuff live."
      >
        Home
      </PageHeader>
      <Filters />
      <Tabs.Wrapper>
        <Tabs.Pane key="local" title="Local Combos">
          <PageInner>
            <LocalCombos />
          </PageInner>
        </Tabs.Pane>
        <Tabs.Pane key="global" title="Global Combos">
          <PageInner>
            <RelativeSuspense fixed={false}>
              <OnlineCombos />
            </RelativeSuspense>
          </PageInner>
        </Tabs.Pane>
      </Tabs.Wrapper>
    </PageWrapper>
  );
};

export default Home;
