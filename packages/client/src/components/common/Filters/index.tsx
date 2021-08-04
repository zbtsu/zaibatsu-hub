import React from "react";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { TagOptions } from "../../../data/tags";
import { Column, Row } from "../../../styles/Grid";
import useAction from "../../../utils/hooks/useAction";
import Select from "../Form/Select";
import TextToggle from "../Form/TextToggle";
import { changeFilter } from "../../../global/slices/filterSlice";
const Styles = {
  Wrapper: styled.div`
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    padding: ${(props) => `${props.theme.space[1]} ${props.theme.space[5]}`};
  `,
};

const Filters = () => {
  const { control } = useForm({
    defaultValues: {
      tags: [],
      filter: "mine",
    },
  });
  const [tags, filter] = useWatch({
    control,
    name: ["tags", "filter"],
  });
  const changeFilterFn = useAction(changeFilter);
  useEffect(() => {
    changeFilterFn({
      tags,
      filter,
    });
  }, [tags, filter]);
  return (
    <Styles.Wrapper>
      <Row align="center" justify="space-between">
        <Column size="4">
          <Select
            name="tags"
            multiple
            control={control}
            border={false}
            items={TagOptions}
            isSearchable={false}
          />
        </Column>
        <Column fitContent>
          <TextToggle
            name="filter"
            value="mine"
            control={control}
            label={"Mine"}
          />
          <TextToggle
            name="filter"
            value="top"
            control={control}
            label={"Top Rated"}
          />
          <TextToggle
            name="filter"
            value="latest"
            control={control}
            label={"Latest"}
          />
        </Column>
      </Row>
    </Styles.Wrapper>
  );
};

export default Filters;
