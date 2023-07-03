import Input from "../components/Input";
import Layout from "../components/Layout";
import Button from "./Button";
import { useCallback, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useMutation from "../libs/useMutation";
import isLoggedInFN from "../libs/isLoggedIn";
import { api_slash } from "../libs/utils";

interface SignUpResponseData {
  statusCode?: number;
  message?: string;
  error?: string;
}

interface SignInResponseData extends SignUpResponseData {
  access_token?: string;
}

interface SignFormProps {
  isSignIn?: boolean;
}

export default function SignForm({ isSignIn = false }: SignFormProps) {
  const navigate = useNavigate();

  const [signHandler, { loading, data, status, error }] =
    useMutation<SignInResponseData>({
      method: "POST",
      url: api_slash("auth", isSignIn ? "signin" : "signup"),
    });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (data && data.access_token) {
      localStorage.setItem("token", data.access_token);
      navigate("/todo");
    }
    if (!isSignIn && status === 201) {
      navigate("/signin", {
        state: { email, password },
      });
    }
    if (error) setErrorMessage(error);
  }, [data, loading, status, email, password, navigate, isSignIn, error]);

  const onSubmitTest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signHandler({ email, password });
  };

  const { state } = useLocation();
  useEffect(() => {
    if (state && state.email) {
      setEmail(state.email);
    }
    if (state && state.password) {
      setPassword(state.password);
    }
  }, [state]);

  const onChangeEmail = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setEmail(event.currentTarget.value);
    },
    []
  );
  const onChangePassword = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setPassword(event.currentTarget.value);
    },
    []
  );

  useEffect(() => {
    if (email.includes("@") && password.length >= 8) setDisabled(false);
    else setDisabled(true);
  }, [password, email]);

  return isLoggedInFN() ? (
    <Navigate replace to={"/todo"} />
  ) : (
    <Layout>
      <h1 className="text-center">{isSignIn ? "Login!" : "Sign Up!"}</h1>
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={onSubmitTest}
      >
        <div className="w-full p-6 my-5 space-y-4 border rounded-sm">
          <Input
            inputText={"Input Email Adress"}
            testId="email-input"
            type="email"
            value={email}
            fn={onChangeEmail}
          />
          <Input
            value={password}
            fn={onChangePassword}
            inputText={"Input Password"}
            testId="password-input"
            type="password"
          />
        </div>
        <Button
          disabled={disabled}
          btnText={loading ? "Loading..." : isSignIn ? "로그인" : "회원가입"}
          testId={isSignIn ? "signin-button" : "signup-button"}
        />
      </form>
      <p className="my-3 text-center text-red-400">{errorMessage}</p>
    </Layout>
  );
}
