import { useState, useEffect, createContext } from 'react';

import ProfileSidebar from './ProfileContainer/ProfileSidebar';
import ProfileRoutes from './ProfileContainer/ProfileRoutes';
import setResponsiveNavbar from '../../../helper/auth/profile/profileContainer/profileInfo/profileInfoEffects/setResponsiveNavbar';
import setShowableNavbar from '../../../helper/auth/profile/profileContainer/profileInfo/profileInfoEffects/setShowableNavbar';
import Form from './Form';
import UpdateProfileError from '../../Partials/Errors/UpdateProfileError';

import style from '../../../styles/Profile.module.sass';


export const ProfileErrorContext = createContext({ errorSetter: () => {} });

const ProfileContainer = ({ props, setUserDataFetched, isLoggedInUser }) => {

    const [componentHeirarchy, setComponentHeirarchy] = useState({
        info: false,
        activities: false,
        analytics: false,
        purchases: false,
        settings: false
    })
    const [forms, setForms] = useState({
        descriptive: false,
        uploadImage: false,
        removeImage: false,
        deleteAccount: false
    })
    const [descriptiveIndex, setDescriptiveIndex] = useState(-1);
    const [updateProfileError, setUpdateProfileError] = useState({
        errorState: false, errorMessage: null
    });

    const { _id: userId, image: imageId } = props || {};

    useEffect(() => {
        const formExists = forms.descriptive || forms.uploadImage || forms.removeImage || forms.deleteAccount;
        setShowableNavbar(formExists);
    }, [forms]);
    
    useEffect(() => setResponsiveNavbar(), [])


    return (
        <div className={style.profileContainer} id='profileOuterContainer'>

            <UpdateProfileError
            error={updateProfileError}
            ></UpdateProfileError>

            <ProfileErrorContext.Provider value={{ errorSetter: setUpdateProfileError }}>
                <Form
                props={props}
                forms={forms}
                setForms={setForms}
                descriptiveIndex={descriptiveIndex}
                setUserDataFetched={setUserDataFetched}
                ></Form>
            </ProfileErrorContext.Provider>

            <div className={style.profileBackgroundBlurEffect} id='profileBackgroundBlurEffect'></div>

                <div className={style.profileMainContainer} id='profileInnerContainer'>

                    <ProfileSidebar
                    userId={userId}
                    imageId={imageId}
                    componentHeirarchy={componentHeirarchy}
                    setComponentHeirarchy={setComponentHeirarchy}
                    isLoggedInUser={isLoggedInUser}
                    ></ProfileSidebar>
                    
                    <section className={style.profileHeaderInfo}>
                            <ProfileRoutes
                            props={props}
                            forms={forms}
                            setForms={setForms}
                            setDescriptiveIndex={setDescriptiveIndex}
                            setUserDataFetched={setUserDataFetched}
                            componentHeirarchy={componentHeirarchy}
                            isLoggedInUser={isLoggedInUser}
                            ></ProfileRoutes>
                    </section>

                </div>

        </div>
    )   
}

export default ProfileContainer;