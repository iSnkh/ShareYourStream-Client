import { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Path from "./paths";

import ErrorPage from "@/pages/errors";

import HomePage from "@/pages/home";

import DashboardPage from "@/pages/dashboard";
import DashboardHomePage from "@/pages/dashboard/DashboardHomePage";
import ProfilePage from "@/pages/dashboard/profile";


import AuthentificationLayout from "@/pages/auth";
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";

const TitleObserver = () => {

    const { t } = useTranslation('paths');
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname !== "/")
            document.title = `ShareYourStream - ${t(pathname)}`;
        else
            document.title = "Share Your Stream"
    })

    return null;
}

const Router = () => {
    return (
        <>
            <TitleObserver />

            <Routes>
                <Route index path={Path.Home.Root} element={<HomePage />} />

                <Route path={Path.Auth.Root} element={<AuthentificationLayout />} >
                    <Route index element={<Navigate to="signIn"/>}/>

                    <Route path={Path.Auth.SignIn} element={<SignInPage />} />
                    <Route path={Path.Auth.SignUp} element={<SignUpPage />} />
                </Route>
                
                <Route path={Path.Dashboard.Root} element={<DashboardPage />} >
                    <Route index element={<DashboardHomePage />} />

                    <Route path={Path.Dashboard.Profile.Root} element={<ProfilePage />} />
                </Route>

                <Route path="*" element={<ErrorPage />} />
                
            </Routes>
        </>
    );
};

export default Router;
