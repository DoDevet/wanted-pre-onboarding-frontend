import { useEffect, useState } from "react";
import Input from "../components/Input";
import Layout from "../components/Layout";

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const onChangeEmail = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onChangePassword = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  useEffect(() => {
    if (email.includes("@") && password.length >= 8) setDisabled(false);
    else setDisabled(true);
  }, [password, email]);

  return (
    <Layout>
      <h1 className="text-center mb-5">Sign Up</h1>
      <div className="border p-6 rounded-sm space-y-4">
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
        className="text-center w-full disabled:text-gray-500"
        disabled={disabled}
        data-testid="signup-button"
      >
        <p>회원가입</p>
      </button>
    </Layout>
  );
}
