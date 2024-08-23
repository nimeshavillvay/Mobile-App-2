import type { Metadata } from "next";
import Register from "./register";

export const metadata: Metadata = {
  title: "Create an account",
};
const RegisterPage = () => {
  return <Register />;
};

export default RegisterPage;
