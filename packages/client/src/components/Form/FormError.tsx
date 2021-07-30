import React from "react";
import { ErrorMessage, FormControlWrapper } from "./styles";

const FormError = ({ error }: { error?: string }) =>
  error ? (
    <FormControlWrapper>
      <ErrorMessage>{error}</ErrorMessage>
    </FormControlWrapper>
  ) : null;

export default FormError;
