import RegisterComponent from "../../components/client/account/Register";
import useScrollToTop from "@/hooks/useScrollToTop";
export default function Register() {
    useScrollToTop();
    return (
        <RegisterComponent />
    )
        ;
}