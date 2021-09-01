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
      <PageInner>
        <LocalCombos />
      </PageInner>
    </PageWrapper>
  );
};

export default Home;
