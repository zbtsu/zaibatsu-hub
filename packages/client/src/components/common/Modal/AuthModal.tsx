import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import TextInput from "../Form/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControlWrapper } from "../Form/styles";
import {
  Center,
  Column,
  Link,
  Margin,
  Paragraph,
  Row,
} from "../../../styles/Grid";
// import { StyledFirebaseAuth } from "react-firebaseui";
import { Button } from "../Form/Button";
import { ModalReturn } from "../../../utils/hooks/useModal";
import { useMemo } from "react";
import { useEffect } from "react";
import { useFirebasePromise } from "../../../utils/hooks/useFirebasePromise";
import FormMessage from "../Form/FormMessages";
import { closeModal } from "../../../global/slices/modalSlice";
import useAction from "../../../utils/hooks/useAction";
import { useAuth, useUser } from "reactfire";
import firebase from "firebase/app";
import { SiFacebook, SiGoogle, SiTwitter } from "react-icons/si";

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
  const auth = useAuth();
  return (
    <Row>
      <Column size="12">
        <Center>
          <Paragraph>Or you can use your social account to login.</Paragraph>
        </Center>
      </Column>
      <Column size="4">
        <Button
          smallPadding
          width="100%"
          onClick={() => {
            const provider = new firebase.auth.FacebookAuthProvider();
            auth.signInWithPopup(provider);
          }}
        >
          <SiFacebook size="24" />
        </Button>
      </Column>
      <Column size="4">
        <Button
          smallPadding
          width="100%"
          onClick={() => {
            const provider = new firebase.auth.GoogleAuthProvider();
            auth.signInWithPopup(provider);
          }}
        >
          <SiGoogle size="24" />
        </Button>
      </Column>
      <Column size="4">
        <Button
          smallPadding
          width="100%"
          onClick={() => {
            const provider = new firebase.auth.TwitterAuthProvider();
            auth.signInWithPopup(provider);
          }}
        >
          <SiTwitter size="24" />
        </Button>
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
  const auth = useAuth();

  const [loginState, loginWrapper] = useFirebasePromise();
  const onSubmit = useCallback(
    async (data) => {
      loginWrapper(() =>
        auth.signInWithEmailAndPassword(data.email, data.password)
      );
    },
    [loginWrapper, auth]
  );
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
        <FormMessage.Error message={loginState.error} />
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
              onClick={(e) => {
                e.preventDefault();
                setTimeout(() => setFormState("register"), 10);
              }}
            >
              Don't have an account? Register here!
            </Link>
          </Center>
        </Column>
        <Column size="12">
          <Center>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setTimeout(() => setFormState("forgotPassword"), 10);
              }}
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
  const auth = useAuth();
  const [registerState, registerWrapper] = useFirebasePromise();
  const closeModalFn = useAction(closeModal);
  const onSubmit = useCallback(
    async (data) => {
      try {
        await registerWrapper(() =>
          auth.createUserWithEmailAndPassword(data.email, data.password)
        );
        closeModalFn();
        return auth.currentUser?.sendEmailVerification();
      } catch (e) {
        console.log(e);
      }
    },
    [closeModalFn, registerWrapper, auth]
  );
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

        <FormMessage.Error message={registerState.error} />
        <FormMessage.Success
          message={
            registerState.result && "Check your email for a verification link!"
          }
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
              onClick={(e) => {
                e.preventDefault();
                setTimeout(() => setFormState("login"), 10);
              }}
            >
              Already have an account? Login here!
            </Link>
          </Center>
        </Column>
        <Column size="12">
          <Center>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setTimeout(() => setFormState("forgotPassword"), 10);
              }}
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
  const [resetState, resetWrapper] = useFirebasePromise();
  const auth = useAuth();

  const onSubmit = useCallback(
    async (data) => {
      resetWrapper(() => auth.sendPasswordResetEmail(data.email));
    },
    [resetWrapper, auth]
  );
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
        <FormMessage.Error message={resetState.error} />
        <FormMessage.Success
          message={
            resetState.result && "Check your email and follow the instructions"
          }
        />
        <FormControlWrapper>
          <Row>
            <Column size="12">
              <Button color="primary" width="100%">
                Send me the link!
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
              onClick={(e) => {
                e.preventDefault();
                setTimeout(() => setFormState("login"), 10);
              }}
            >
              Already have an account? Login here!
            </Link>
          </Center>
        </Column>
        <Column size="12">
          <Center>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setTimeout(() => setFormState("register"), 10);
              }}
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
  const user = useUser();
  console.log(user?.data?.uid);
  return {
    title,
    subtitle,
    content: !user?.data?.uid && (
      <>
        <Content setFormState={setState} />
      </>
    ),
  };
};

export default AuthModal;
