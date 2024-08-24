import LoginComponent from "../../components/client/account/Login";
import useScrollToTop from "@/hooks/useScrollToTop";
export default function Login() {
  useScrollToTop();
  return <LoginComponent />;
}
