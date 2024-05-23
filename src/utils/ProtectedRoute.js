import { useAuth } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth();

    if(isAuthenticated){
        return <Outlet/>;
    }
    else{
        return(
            <Navigate to="/login" />
        )
    }
}

export default ProtectedRoute;