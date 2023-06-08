import SignForm from "../components/SignForm";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    event.preventDefault();
    const body = { email, password };

    const res = await fetch(
      "https://www.pre-onboarding-selection-task.shop/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (res.status === 201) {
      navigate("/signin", {
        state: {
          email,
          password,
        },
      });
    }
  };
  return <SignForm onSubmit={onSubmit} />;
}
