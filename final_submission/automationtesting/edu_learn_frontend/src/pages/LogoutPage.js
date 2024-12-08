import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

function LogoutPage() {
    const { logout } = useContext(AuthContext);

    logout();
    <Navigate to="/" replace />

    return <><Navigate to="/" replace /></>
}

export default LogoutPage;