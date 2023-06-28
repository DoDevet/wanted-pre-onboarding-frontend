export const API_BaseURL = "https://www.pre-onboarding-selection-task.shop/";
export const api_slash = <T>(...classNames: T[]) => {
  return API_BaseURL + classNames.join("/");
};
export const cls = (...classNames: string[]) => {
  return classNames.join(" ");
};
