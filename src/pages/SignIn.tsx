import SignForm from "../components/SignForm";

export default function SignIn() {
  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    event.preventDefault();
    const body = { email, password };
    const res = await fetch(
      "https://www.pre-onboarding-selection-task.shop/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (res.status === 200) {
      const { access_token } = await res.json();
      localStorage.setItem("token", access_token);
    }
  };
  return <SignForm onSubmit={onSubmit} isSignIn />;
}
