import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import Path from "@/routes/paths";
import OAuthProvidersComponent from "@/components/auth/oauth/OAuthProvidersComponent";
import { AppDispatch } from "@/index";
import { loginUsingCredentialsAction } from "@/store/actions/auth/loginUsingCredentialsAction";


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export enum SignInError { 
    SPOTIFY = "SPOTIFY",
    DISCORD = "DISCORD",
    GOOGLE = "GOOGLE",
    CREDENTIALS = "CREDENTIALS"
}

const MySwal = withReactContent(Swal)

const SignInPage = () => {

    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    useEffect(() => {
        if (location.state && location.state.error) {
            MySwal.fire({
                text: "Sorry, we're unable to Sign In, please try again.",
                icon: "error",
                confirmButtonText: "Ok, got it!"
            })
        }
    }, [location.state])

    const submit = async () => {
        try {
            await dispatch(loginUsingCredentialsAction({
                email: email,
                password: password
            })).unwrap()
        } 
        catch (err) {
            MySwal.fire({
                text: "Sorry, looks like these credentials are invalid, please try again.",
                icon: "error",
                confirmButtonText: "Ok, got it!"
            })
        }
    }

    return (
        <div className="content">
            <form className="authForm">
                <div className="authTitle">
                    <div className="title">Sign In</div>
                    <div className="subTitle">Enhance your music experience using an third party Software</div>
                </div>
                <div className="inputContainer">
                    <input 
                        type="text" 
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>
                <div className="inputContainer">
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>
                <div className="footer">
                    <NavLink 
                        to={Path.Auth.PasswordForgot.Root}
                        state={{ filledEmail: email }}
                    >
                        Forgot Password ?
                    </NavLink>
                    <div 
                        className="submitBtn"
                        onClick={submit}
                    >
                        Sign In
                    </div>
                </div>
            </form>
            <OAuthProvidersComponent />
        </div>
    )
}

export default SignInPage;