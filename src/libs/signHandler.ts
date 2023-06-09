import { useState } from "react";

interface SignHandlerForm {
  data?: any;
  status: number;
  errorMessage?: string;
  loading: boolean;
}
interface HandlerProps {
  email: string;
  password: string;
}
type SignHandlerReturnType = [(data: HandlerProps) => void, SignHandlerForm];
export default function SignHandler(
  isSignIn: boolean = false
): SignHandlerReturnType {
  const [response, setResponse] = useState<SignHandlerForm>({
    data: undefined,
    loading: false,
    status: 0,
    errorMessage: "",
  });

  function handler({ email, password }: HandlerProps) {
    const body = { email, password };
    setResponse((prev) => ({ ...prev, loading: true }));
    fetch(
      `https://www.pre-onboarding-selection-task.shop/auth/${
        isSignIn ? "signin" : "signup"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => {
        setResponse((prev) => ({ ...prev, status: res.status }));
        return res.json();
      })
      .then((data) => {
        setResponse((prev) => ({ ...prev, data }));
      })
      .catch((error) =>
        setResponse((prev) => ({ ...prev, errorMessage: error }))
      )
      .finally(() => setResponse((prev) => ({ ...prev, loading: false })));
  }

  return [handler, response];
}
