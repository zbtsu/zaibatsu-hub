import React from "react";
import { Column, Paragraph, Row } from "../../styles/Grid";
import { ModalReturn } from "../../utils/hooks/useModal";
import { Button } from "../Form/Button";
import firebase from "firebase/app";

const AuthActionsModalContent = () => {
  return (
    <Row>
      <Column size="12">
        <Paragraph>
          All you have to do now is follow the link in your email and you'll be
          good to go!
        </Paragraph>
      </Column>
      <Column size="6">
        <Button
          onClick={() => {
            firebase.auth().signOut();
          }}
          width="100%"
        >
          Start from scratch
        </Button>
      </Column>
      <Column size="6">
        <Button
          onClick={() => {
            firebase.auth().currentUser?.sendEmailVerification();
          }}
          width="100%"
        >
          I didn't get my email!
        </Button>
      </Column>
    </Row>
  );
};

export const AuthActionsModal = (): ModalReturn => {
  return {
    content: <AuthActionsModalContent />,
    title: "Let's get you started",
    subtitle: "Just one more step, we promise!",
  };
};
