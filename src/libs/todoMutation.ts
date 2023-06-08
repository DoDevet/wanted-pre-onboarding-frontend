import isLoggedInFN from "./isLoggedIn";

type Method = "POST" | "GET" | "DELETE" | "PUT" | "UPDATE";

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

export default async function TodoMutation({
  id,
  method,
  data,
}: TodoMutationProp): Promise<any> {
  const responseData = await await fetch(
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
  return method === "DELETE" ? responseData : responseData.json();
}
