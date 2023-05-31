import React, {useEffect} from "react";
import { BrowserRouter, redirect } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import App from "./app.routes";
import Auth from "./auth.routes";

const Routes: React.FC = () => {
    const {logged} = useAuth();

    if(!logged && window.location.pathname!=='/'){
        window.location.pathname = "/";
    }

    return (
        <BrowserRouter>
            {logged ? <App/> : <Auth/>}
        </BrowserRouter>
    );
}
export default Routes;