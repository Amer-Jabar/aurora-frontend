import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { setUser, removeUser } from '../../redux/reducers/userReducer';
import LogoutAction from '../../helper/auth/authentication/logout';
import handleCookieVerification from '../../helper/navbar/handleCookieVerification';
import getTokenOfCookie from '../../helper/navbar/getTokenOfCookie';
import { LoadingContext } from './PageRoutedLoading';

import style from '../../styles/Partials/Navbar.module.sass';


const Logout = async (token, dispatcher) => {
    const loggedOut = await LogoutAction({ token });
    if ( loggedOut )
        dispatcher(removeUser({ innerData: null }));
}

const Navbar = () => {

    const { asPath: profilePath } = useRouter();
    const dispatcher = useDispatch();
    const pageLoadingContext = useContext(LoadingContext).setLoading;

    const { userInfo, loggedIn } = useSelector(state => state.User);
    const [token, setToken] = useState(null);

    useEffect(() => {

        const currentToken = getTokenOfCookie();

        if ( currentToken ) {

            if ( !token )
                setToken(currentToken)
            if ( !userInfo && token )
                handleCookieVerification(token, dispatcher, setUser)

        } else {

            if ( token )
                setToken(null);
            if ( userInfo )
                dispatcher(removeUser({ innerData: null }));
                
        }

    }, [token, userInfo]);

    return (
        <nav className={style.navbar} id='navbar'>
            <div>
                <Link href='/Home' passHref>
                    <li className={style.brand}>Aurora</li>
                </Link>
            </div>
            <div>
                <Link href='/Pages/Stores' passHref>
                    <li onClick={() => profilePath === '/Pages/Stores' ? null : pageLoadingContext(true)}>Stores</li>
                </Link>
                <Link href='/Pages/Categories' passHref>
                    <li onClick={() => profilePath === '/Pages/Categories' ? null : pageLoadingContext(true)}>Categories</li>
                </Link>
                <Link href='/Pages/Contact' passHref>
                    <li onClick={() => profilePath === '/Pages/Contact' ? null : pageLoadingContext(true)}>Contact</li>
                </Link>
            </div>
            <div>
                {
                    !loggedIn
                    ? (
                        <Link href='/Pages/Auth/Authentication' passHref>
                            <li title='authLink' onClick={() => profilePath === '/Pages/Auth/Authentication' ? null : pageLoadingContext(true)}>Login/Signup</li>
                        </Link>
                    ) 
                    : (
                    <div>
                        <Link href={`/Pages/Auth/${userInfo.username}-${userInfo._id}`} passHref>
                            <li style={{ display: 'inline-block', marginInline: '0em' }} 
                            onClick={() => profilePath === `/Pages/Auth/${userInfo.username}-${userInfo._id}` ? null : pageLoadingContext(true)}>
                            { userInfo.username },</li>
                        </Link>
                        <Link href='#' passHref>
                            <li style={{ display: 'inline-block', marginLeft: '10px' }}
                            onClick={ async () => {
                                pageLoadingContext(true);
                                await Logout(token, dispatcher);
                                pageLoadingContext(false);
                            }}>Logout</li>
                        </Link>
                    </div>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar;