import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { TagOptions } from "../../../../data/tags";
import { useAppSelector } from "../../../../global/hooks";
import { PageHeader, PageInner, PageWrapper } from "../../../../styles/Common";
import { Column, Row } from "../../../../styles/Grid";
import { makeOptionsFromCharacters } from "../../../../utils/toolkit";
import { SmallCombo } from "../../../common/ComboPreview";
import { Button } from "../../../common/Form/Button";
import Select from "../../../common/Form/Select";
import TextInput from "../../../common/Form/TextInput";
import * as Yup from "yup";
import useAction from "../../../../utils/hooks/useAction";
import { addCombo } from "../../../../global/slices/comboSlice";
import Combo from "../../../../models/Combo";
import { useUser } from "reactfire";

interface Props {}

const ComboValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  tags: Yup.array().of(Yup.string()).min(1).required("Tags are required"),
  damage: Yup.number().min(0).required("Damage is required"),
  character: Yup.number().min(0).required("Character is required"),
  string: Yup.string().required("Combo notation string is required"),
});

const NewCombo = (props: Props) => {
  const user = useUser();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ComboValidation),
    defaultValues: {
      name: "",
      tags: [],
      damage: 0,
      character: 0,
      string: "",
    },
  });
  const characters = useAppSelector((state) => state.characters.all);
  const addComboFn = useAction(addCombo);
  const [name, tags, string, damage, character] = useWatch({
    name: ["name", "tags", "string", "damage", "character"],
    control,
  });
  const onSubmit = useCallback(
    (data) => {
      const comboModel = Combo({
        ...data,
        author: { ...user?.data },
      });
      addComboFn(comboModel);
    },
    [addComboFn, user?.data]
  );
  return (
    <PageWrapper>
      <PageHeader description={"How difficult is this combo? About $200."}>
        New Combo
      </PageHeader>
      <PageInner>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Column size="12">
              <TextInput
                register={register}
                name="name"
                label="Name"
                errors={errors}
                placeholder="Alaskan Thundersmash"
              />
            </Column>
            <Column size="12">
              <Select
                items={TagOptions}
                name="tags"
                label="Tags"
                control={control}
                isMulti
              />
            </Column>
            <Column size="6">
              <Select
                items={makeOptionsFromCharacters(characters)}
                name="character"
                label="Character"
                control={control}
                formatter={Number}
              />
            </Column>
            <Column size="6">
              <TextInput
                errors={errors}
                placeholder="A lot"
                name="damage"
                label="Damage"
                register={register}
              />
            </Column>
            <Column size="12">
              <TextInput
                errors={errors}
                placeholder="d 3, d db b 3, delay f d df 2"
                name="string"
                label="Combo Notation String"
                register={register}
              />
            </Column>
            <Column size="12">
              <SmallCombo
                {...({ name, tags, string, damage, character } as any)}
              />
            </Column>
            <Column justify="flex-end">
              <Button>Save</Button>
            </Column>
          </Row>
        </form>
      </PageInner>
    </PageWrapper>
  );
};

export default NewCombo;
