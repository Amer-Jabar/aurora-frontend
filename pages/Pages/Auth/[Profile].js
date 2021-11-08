import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Fragment } from 'react/cjs/react.production.min';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { sign } from 'jsonwebtoken';

import Navbar from "../../../components/Partials/Navbar";
import ProfileContainer from '../../../components/Auth/Pofile/ProfileContainer';
import loadProfile from '../../../helper/auth/profile/loadProfile';
import LoadingSpinner from '../../../components/Partials/ProcessLoadingSpinner';

import { SECRET_COOKIE_PASSWORD as SECRET, SERVER_HOSTNAME, SERVER_PORT } from '../../../env';


const Profile = (staticProps) => {

    const [props, setProps] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [userDataFetched, setUserDataFetched] = useState(true);
    const [isLoggedInUser, setIsLoggedInUser] = useState(false);

    const userState = useSelector(state => state.User);

    useEffect(() => {
        const { userInfo } = userState;

        const { username: profileUsername, _id: profileId } = staticProps || { username: null, _id: null };
        const { username: loggedInUsername, _id: loggedInId } = userInfo || { username: null, _id: null };

        if ( profileUsername == loggedInUsername && profileId == loggedInId )
            setIsLoggedInUser(true);
        else 
            setIsLoggedInUser(false);

        if ( userInfo && userDataFetched === null ) {
            loadProfile(userInfo._id, setProps, setUserDataFetched);
        } else if ( !mounted && staticProps ) {
            setProps(staticProps);
        }

        setMounted(true);
        
    }, [userState.loggedIn, userDataFetched, props]);
    
    return (
        <div style={{ height: '100%' }}>
            <Head>
                <title>User Profile</title>
                <meta 
                name='description' 
                content='Users profile page.'
                key='desc'
                />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            </Head>
            <Navbar></Navbar>
            {
                props && staticProps
                ? (
                    <Fragment>
                        <ProfileContainer 
                        props={props}
                        setUserDataFetched={setUserDataFetched}
                        isLoggedInUser={isLoggedInUser}
                        ></ProfileContainer>
                    </Fragment>
                )
                : ( <LoadingSpinner /> )
            }
        </div>
    )
}

export const getServerSideProps = async (context) => {

    const userId = context.query.Profile.split('-')[1];
    const userToken = sign(userId, SECRET);
    
    let props = null;
    try {
        props = (await axios.get(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/users/${userId}`, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })).data;
    } catch (e) {
        console.log(e);
    } finally {
        if ( !props )
            console.log('An error occured fetching user`s static props!');
    }

    return { props }
}

export default Profile;