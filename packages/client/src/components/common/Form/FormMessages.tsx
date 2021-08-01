import React from "react";
import { FormControlWrapper, FormMessage } from "./styles";

interface MessageProps {
  message?: string;
}

const Error = ({ message }: MessageProps) =>
  message ? (
    <FormControlWrapper>
      <FormMessage color="error">{message}</FormMessage>
    </FormControlWrapper>
  ) : null;

const Success = ({ message }: MessageProps) =>
  message ? (
    <FormControlWrapper>
      <FormMessage color="success">{message}</FormMessage>
    </FormControlWrapper>
  ) : null;

const Info = ({ message }: MessageProps) =>
  message ? (
    <FormControlWrapper>
      <FormMessage color="primary">{message}</FormMessage>
    </FormControlWrapper>
  ) : null;

const FormMessages = {
  Error,
  Success,
  Info,
};

export default FormMessages;
