export default function isLoggedInFN() {
  return localStorage.getItem("token") === null
    ? ""
    : localStorage.getItem("token");
}
