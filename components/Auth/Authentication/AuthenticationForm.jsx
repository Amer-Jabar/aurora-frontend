import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc'
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai'
import { GiOverInfinity } from 'react-icons/gi'

import Login from '../../../helper/auth/authentication/withErrorHandling/login';
import Signup from '../../../helper/auth/authentication/withErrorHandling/signup';

import style from '../../../styles/Authentication.module.sass';


const setAuthenticationLoader = async (setAuthenticationProcessLoading, boolean) => setAuthenticationProcessLoading(boolean)

const AuthenticationForm = ({ 
    username, password, setUsername, setPassword, setAuthenticated, 
    error, setError, setAuthenticationProcessLoading 
}) => {
    return (
        <div className={style.form}>
            <div className={style.formHeaderContainer}>
                <h2>Login</h2>
                <GiOverInfinity />
            </div>
            <div className={style.formInputsContainer}>
                <div>
                    <label>Username*</label>
                    <input type="text" id='usernameInput' placeholder='Wilheilm fredreick'
                    onChange={e => setUsername(e.target.value)}
                    />                    
                </div>
                <div>
                    <label>Password*</label>
                    <input type="password" id='passwordInput' placeholder='Asce10$***'
                    onChange={e => setPassword(e.target.value)}
                    />                    
                </div>
            </div>
            <div className={style.formButtonGroup}>
                <button
                onClick={ async () => {
                    await setAuthenticationLoader(setAuthenticationProcessLoading, true);
                    await Login(username, password, setAuthenticated, error, setError);
                    await setAuthenticationLoader(setAuthenticationProcessLoading, false);
                }}
                >Login</button>
                <button
                onClick={ async () => {
                    await setAuthenticationLoader(setAuthenticationProcessLoading, true);
                    await Signup(username, password, setAuthenticated, error, setError)
                    await setAuthenticationLoader(setAuthenticationProcessLoading, false);
                }}
                >Signup</button>
            </div>
            <Link href='/Home'>
                <a>forgot password?</a>
            </Link>
            <div className={style.additionalAuthenticationButtonGroup}>
                <FcGoogle />
                <AiFillFacebook />
                <AiFillGithub />
            </div>
        </div>
    )
}

export default AuthenticationForm;