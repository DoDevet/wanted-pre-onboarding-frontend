import { useCallback, useEffect, useState } from "react";
import Input from "../components/Input";
import Layout from "../components/Layout";
import { Navigate, useLocation } from "react-router-dom";
import isLoggedInFN from "../libs/isLoggedIn";
interface SignFormProps {
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => void;
  isSignIn?: boolean;
}
export default function SignForm({
  onSubmit,
  isSignIn = false,
}: SignFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

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
      <h1 className="text-center">{isSignIn ? "Login" : "Sign Up"}</h1>
      <form onSubmit={(event) => onSubmit(event, email, password)}>
        <div className="p-6 my-5 space-y-4 border rounded-sm">
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
        <button
          className="w-full text-center disabled:text-gray-500"
          disabled={disabled}
          data-testid={isSignIn ? "signin-button" : "signup-button"}
        >
          <p className="font-semibold">{isSignIn ? "로그인" : "회원가입"}</p>
        </button>
      </form>
    </Layout>
  );
}
