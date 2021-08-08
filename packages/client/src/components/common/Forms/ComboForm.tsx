import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { useUser } from "reactfire";
import { useAppSelector } from "../../../global/hooks";
import useAction from "../../../utils/hooks/useAction";
import Combo, { ICombo } from "../../../models/Combo";
import { addCombo } from "../../../global/slices/comboSlice";
import { Column, Row } from "../../../styles/Grid";
import Select from "../Form/Select";
import TextInput from "../Form/TextInput";
import { SmallCombo } from "../ComboPreview";
import { Button } from "../Form/Button";
import { TagOptions } from "../../../data/tags";
import { makeOptionsFromCharacters } from "../../../utils/toolkit";

interface Props {
  defaultValues?: ICombo;
}

const ComboValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  tags: Yup.array().of(Yup.string()).min(1).required("Tags are required"),
  damage: Yup.number().min(0).required("Damage is required"),
  character: Yup.number().min(0).required("Character is required"),
  string: Yup.string().required("Combo notation string is required"),
});

const ComboForm = (props: Props) => {
  const user = useUser();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ComboValidation),
    defaultValues: props.defaultValues || {
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
            noBottom
            {...({ name, tags, string, damage, character } as any)}
          />
        </Column>
        <Column justify="flex-end">
          <Button>Save</Button>
        </Column>
      </Row>
    </form>
  );
};

export default ComboForm;
