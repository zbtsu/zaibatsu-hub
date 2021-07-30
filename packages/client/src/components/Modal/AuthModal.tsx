import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import firebase from "firebase/app";
import TextInput from "../Form/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage, FormControlWrapper } from "../Form/styles";
import {
  Center,
  Column,
  Link,
  Margin,
  Paragraph,
  Row,
} from "../../styles/Grid";
import { StyledFirebaseAuth } from "react-firebaseui";
import { Button } from "../Form/Button";
import { ModalReturn } from "../../utils/hooks/useModal";
import { useMemo } from "react";
import { useEffect } from "react";
import { useIsAuth } from "../../utils/hooks/useIsAuth";
import { useFirebasePromise } from "../../utils/hooks/useFirebasePromise";
import FormError from "../Form/FormError";

type ModalState = "login" | "register" | "forgotPassword";

type FormProps = {
  setFormState: (state: ModalState) => void;
};

const LoginSchema = yup.object().shape({
  email: yup.string().email("Must be an email.").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const RegisterSchema = yup.object().shape({
  email: yup.string().email("Must be an email.").required("Email is required"),
  password: yup.string().required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().email("Must be an email.").required("Email is required"),
});

const SocialAuth = () => {
  return (
    <Row>
      <Column size="12">
        <Center>
          <Paragraph>Or you can use your social account to login.</Paragraph>
        </Center>
      </Column>
      <Column size="12">
        <StyledFirebaseAuth
          uiConfig={{
            signInFlow: "popup",
            signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
          }}
          firebaseAuth={firebase.auth()}
        />
      </Column>
    </Row>
  );
};

const LoginForm = ({ setFormState }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(LoginSchema),
  });

  const [loginState, loginWrapper] = useFirebasePromise();
  const onSubmit = useCallback(async (data) => {
    loginWrapper(() =>
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
    );
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          placeholder="name@example.com"
          label="Email"
          register={register}
          errors={errors}
          name="email"
        />
        <TextInput
          placeholder="SomeSafePa5sw0rD!"
          label="Password"
          type="password"
          register={register}
          errors={errors}
          name="password"
        />
        <FormError error={loginState.error} />
        <FormControlWrapper>
          <Row>
            <Column size="12">
              <Button color="primary" width="100%">
                Login
              </Button>
            </Column>
          </Row>
        </FormControlWrapper>
      </form>
      <Margin gutter="3" />
      <Row>
        <Column size="12">
          <Center>
            <Link
              href="#"
              onClick={() => setTimeout(() => setFormState("register"), 10)}
            >
              Don't have an account? Register here!
            </Link>
          </Center>
        </Column>
        <Column size="12">
          <Center>
            <Link
              href="#"
              onClick={() =>
                setTimeout(() => setFormState("forgotPassword"), 10)
              }
            >
              Forgot your password? Recover it!
            </Link>
          </Center>
        </Column>
      </Row>
      <Margin gutter="3" />
      <SocialAuth />
    </div>
  );
};

const RegisterForm = ({ setFormState }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(RegisterSchema),
  });
  const [registerState, registerWrapper] = useFirebasePromise();
  const onSubmit = useCallback(async (data) => {
    try {
      await registerWrapper(() =>
        firebase
          .auth()
          .createUserWithEmailAndPassword(data.email, data.password)
      );
      return firebase.auth().currentUser?.sendEmailVerification();
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          placeholder="email@example.com"
          label="Email"
          register={register}
          errors={errors}
          name="email"
        />
        <TextInput
          placeholder="SomeSafePa5sw0rD!"
          label="Password"
          type="password"
          register={register}
          errors={errors}
          name="password"
        />
        <TextInput
          placeholder="SomeSafePa5sw0rD!"
          label="Password (confirmation)"
          type="password"
          register={register}
          errors={errors}
          name="passwordConfirmation"
        />

        <FormError error={registerState.error} />

        <FormControlWrapper>
          <Row>
            <Column size="12">
              <Button color="primary" width="100%">
                Register
              </Button>
            </Column>
          </Row>
        </FormControlWrapper>
      </form>
      <Margin gutter="3" />
      <Row>
        <Column size="12">
          <Center>
            <Link
              href="#"
              onClick={() => setTimeout(() => setFormState("login"), 10)}
            >
              Already have an account? Login here!
            </Link>
          </Center>
        </Column>
        <Column size="12">
          <Center>
            <Link
              href="#"
              onClick={() =>
                setTimeout(() => setFormState("forgotPassword"), 10)
              }
            >
              Forgot your password? Recover it!
            </Link>
          </Center>
        </Column>
      </Row>
      <Margin gutter="3" />
      <SocialAuth />
    </div>
  );
};

const ForgotPasswordForm = ({ setFormState }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(ForgotPasswordSchema),
  });
  const onSubmit = useCallback(async (data) => {
    const result = await firebase.auth().sendPasswordResetEmail(data.email);
    console.log(result);
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          placeholder="email@example.com"
          label="Email"
          register={register}
          errors={errors}
          name="email"
        />
        <FormControlWrapper>
          <Row>
            <Column size="12">
              <Button color="primary" width="100%">
                Register
              </Button>
            </Column>
          </Row>
        </FormControlWrapper>
      </form>
      <Margin gutter="3" />
      <Row>
        <Column size="12">
          <Center>
            <Link
              href="#"
              onClick={() => setTimeout(() => setFormState("login"), 10)}
            >
              Already have an account? Login here!
            </Link>
          </Center>
        </Column>
        <Column size="12">
          <Center>
            <Link
              href="#"
              onClick={() => setTimeout(() => setFormState("register"), 10)}
            >
              Don't have an account? Register here!
            </Link>
          </Center>
        </Column>
      </Row>
      <Margin gutter="3" />
      <SocialAuth />
    </div>
  );
};

const AuthModal = (): ModalReturn => {
  const [state, setState] = useState<ModalState>("login");
  const subtitle = useMemo(() => {
    switch (state) {
      case "login":
        return "We're glad to have you back.";
      case "register":
        return "Hey, you're new around here.";
      case "forgotPassword":
        return "Aw shucks, hope you get everything sorted!";
    }
  }, [state]);
  const title = useMemo(() => {
    switch (state) {
      case "login":
        return "Login";
      case "register":
        return "Register";
      case "forgotPassword":
        return "Forgot Password";
    }
  }, [state]);
  useEffect(() => {
    setState("login");
    return () => setState("login");
  }, [setState]);
  const Content: React.JSXElementConstructor<FormProps> = useMemo(() => {
    switch (state) {
      case "login":
        return LoginForm;
      case "register":
        return RegisterForm;
      case "forgotPassword":
        return ForgotPasswordForm;
      default:
        return LoginForm;
    }
  }, [state]);
  const isAuthenticated = useIsAuth();
  return {
    title,
    subtitle,
    content: !isAuthenticated && (
      <>
        <Content setFormState={setState} />
      </>
    ),
  };
};

export default AuthModal;
