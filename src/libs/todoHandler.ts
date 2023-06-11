import isLoggedInFN from "./isLoggedIn";

type Method = "POST" | "GET" | "DELETE" | "PUT";

interface TodoMutationProp {
  id?: number;
  method: Method;
  data?: any;
}

export interface TodoForm {
  id: number;
  isCompleted: boolean;
  todo: string;
  userId: number;
}

export default async function TodoHandler({
  id,
  method,
  data,
}: TodoMutationProp): Promise<any> {
  const responseData = await fetch(
    `https://www.pre-onboarding-selection-task.shop/todos${
      !id ? "" : `/${id}`
    }`,
    {
      method,
      headers: {
        Authorization: `Bearer ${isLoggedInFN()}`,
        "Content-Type": "application/json",
      },
      body: method === "GET" || !data ? null : JSON.stringify(data),
    }
  );
  return method === "DELETE" ? responseData : await responseData.json();
}
