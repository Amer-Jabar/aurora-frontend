import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useContext, Fragment } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import Hamburger from './Navbar/Hamburger';
import ResponsiveSection from './Navbar/ResponsiveSection';
import { setUser, removeUser } from '../../redux/reducers/userReducer';
import LogoutAction from '../../helper/auth/authentication/logout';
import handleCookieVerification from '../../helper/navbar/handleCookieVerification';
import getTokenOfCookie from '../../helper/navbar/getTokenOfCookie';
import { LoadingContext } from './PageRoutedLoading';

import imageSrc from '../../public/Home/Aurora.png';

import style from '../../styles/Partials/Navbar.module.sass';


const Logout = async (token, dispatcher) => {
    const loggedOut = await LogoutAction({ token });
    if ( loggedOut )
        dispatcher(removeUser({ innerData: null }));
}

export const Links = ({ profilePath, pageLoadingContext, loggedIn, userInfo, token, dispatcher, isInHamburger, pcScreen }) => (
    <Fragment>
        {
            !isInHamburger
            ? (
                <div className={style.brandLogoContainer}>
                    <Image src={imageSrc}
                    alt='aurora logo'
                    width={125}
                    height={40}
                    layout='responsive'
                    quality={100}
                    ></Image>
                </div>
            )
            : <></>
        }
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
                <div className={style.userAuthenticationContainer}>
                    {
                    isInHamburger || pcScreen
                    ? (
                        <Fragment>
                            <Link href={`/Pages/Auth/${userInfo?.username}-${userInfo?._id}`} passHref>
                            <li style={{ display: 'inline-block', marginInline: '0em' }} 
                            onClick={() => profilePath === `/Pages/Auth/${userInfo?.username}-${userInfo?._id}` ? null : pageLoadingContext(true)}>
                            { userInfo?.username },</li>
                            </Link>
                            <Link href='#' passHref>
                                <li style={{ display: 'inline-block', marginLeft: '10px' }}
                                onClick={ async () => {
                                    pageLoadingContext(true);
                                    await Logout(token, dispatcher);
                                    pageLoadingContext(false);
                                }}>Logout</li>
                            </Link>
                        </Fragment>
                    )
                    : <></>
                    }
                </div>
                )
            }
        </div>
    </Fragment>
)

const Navbar = () => {

    const { asPath: profilePath } = useRouter();
    const dispatcher = useDispatch();
    const pageLoadingContext = useContext(LoadingContext).setLoading;

    const { userInfo, loggedIn } = useSelector(state => state.User);
    const [token, setToken] = useState(null);
    const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
    const [screenSize, setScreenSize] = useState(0);

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
    useEffect(() => setScreenSize(innerWidth), []);

    return (
        <div>
            <nav className={style.navbar} id='navbar'>
                <Links
                profilePath={profilePath}
                loggedIn={loggedIn}
                pageLoadingContext={pageLoadingContext}
                userInfo={userInfo}
                isInHamburger={false}
                token={token}
                dispatcher={dispatcher}
                pcScreen={screenSize > 600}
                ></Links>
                <Hamburger
                hamburgerIsOpen={hamburgerIsOpen}
                setHamburgerIsOpen={setHamburgerIsOpen}
                ></Hamburger>
            </nav>
            <ResponsiveSection
            hamburgerIsOpen={hamburgerIsOpen}
            profilePath={profilePath}
            loggedIn={loggedIn}
            userInfo={userInfo}
            token={token}
            dispatcher={dispatcher}
            pageLoadingContext={pageLoadingContext}
            ></ResponsiveSection>
        </div>
    )
}

export default Navbar;