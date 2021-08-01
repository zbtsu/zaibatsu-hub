import React from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Column, Row } from "../../../styles/Grid";
import { Button } from "../Form/Button";
import Select from "../Form/Select";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "../../../global/hooks";
import useAction from "../../../utils/hooks/useAction";
import { changeSettings } from "../../../global/slices/settingsSlice";

const AppSettingsValidation = Yup.object().shape({
  theme: Yup.string().required("Required"),
  // language: Yup.string().required('Required').default('en'),
});

const Wrapper = styled.div``;

const AppSettings = () => {
  const initialValues = useAppSelector((state) => state.settings);
  const changeSettingsAction = useAction(changeSettings);
  const { register, handleSubmit, formState, control } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(AppSettingsValidation),
  });
  console.log(formState);
  const onSubmit = useCallback(
    (data) => changeSettingsAction(data),
    [changeSettingsAction]
  );
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          errors={formState.errors}
          label="Theme"
          name="theme"
          control={control}
          register={register}
          items={[
            { label: "System Theme", value: "system" },
            { label: "Light Theme", value: "light" },
            { label: "Dark Theme", value: "dark" },
          ]}
        />
        <Row align="center" justify="flex-end">
          <Column size="4"></Column>
          <Column size="4"></Column>
          <Column size="4">
            <Button width="100%">Save</Button>
          </Column>
        </Row>
      </form>
    </Wrapper>
  );
};

export default AppSettings;
