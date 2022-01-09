import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import AuthenticationForm from '../../../components/Auth/Authentication/AuthenticationForm';
import ErrorMessageDisplay from '../../../components/Auth/Authentication/ErrorMessageDisplay';
import Navbar from '../../../components/Partials/Navbar';
import ProcessLoadingSpinner from '../../../components/Partials/ProcessLoadingSpinner';

import style from '../../../styles/Authentication.module.sass';


const Authentication = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState({
        notFound: false,
        unAuthenticated: false,
        UsernameDuplicate: false,
        DatabaseError: false
    });
    const [authenticationProcessLoading, setAuthenticationProcessLoading] = useState(false);
    const user = useSelector(state => state.User);

    if ( authenticated || user.userInfo ) {
        useRouter().push('/Home');
    }

    useEffect(() => {
        const defaultUserValue = document.querySelector('#usernameInput').value;
        const defaultPassValue = document.querySelector('#passwordInput').value;

        setUsername(defaultUserValue);
        setPassword(defaultPassValue);
    }, [])

    const errorArray = Object.values(error);
    let errorMessage;
    errorArray.forEach((errorType, errorIndex) => (
        errorType
        ? errorMessage = [
            <ErrorMessageDisplay
            key='null'
            style={style}
            errorIndex={errorIndex}
            setError={setError}
            ></ErrorMessageDisplay>
        ]
        : []
    ));

    const AuthenticationProcessLoading = authenticationProcessLoading
            ? <ProcessLoadingSpinner loading={true} fillScreen={true} />
            : <></>

    return (
        <div className={style.authenticationContainer}>
            <Head>
                <title>Login/Signup</title>
                <meta 
                name='description' 
                content='Aurora E-Commerce websites authentication page.'
                key='desc'
                />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            </Head>
            { errorMessage }
            { AuthenticationProcessLoading }
            <Navbar></Navbar>
            <div className={style.formContainer} id='authenticationContainer'>
                <section className={style.formDivider}>

                    <AuthenticationForm
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                    setAuthenticated={setAuthenticated}
                    error={error}
                    setError={setError}
                    setAuthenticationProcessLoading={setAuthenticationProcessLoading}
                    ></AuthenticationForm>
                    
                    <div className={style.formAd}></div>
                </section>
            </div>
        </div>
    )
}

export default Authentication;