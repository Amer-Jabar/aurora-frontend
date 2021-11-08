import dynamic from 'next/dynamic';
import { Fragment, useState, useEffect } from 'react';

import ProcessLoadingSpinner from '../../../Partials/ProcessLoadingSpinner';

import style from '../../../../styles/Profile.module.sass';


const ProfileRoutes = ({ props, forms, setForms, setDescriptiveIndex, setUserDataFetched, componentHeirarchy, isLoggedInUser }) => {
    
    const { username } = props;
    const { info, activities, analytics, purchases, settings } = componentHeirarchy;
    const [baseView, setBaseView] = useState(false);

    if ( !info && !activities && !analytics && !purchases && !settings && !baseView )
        setBaseView(true)
    else if ( ( info || activities || analytics || purchases || settings ) && baseView )
        setBaseView(false)

    const [ProfileInfo, setProfileInfo] = useState(null);
    const [ProfileSettings, setProfileSettings] = useState(null);

    useEffect(() => {
        if ( !ProfileInfo )
            setProfileInfo(dynamic(() => import('./ProfileComponents/ProfileInfo'), 
                { loading: () => <ProcessLoadingSpinner loading={true} fillScreen={true} relative={true} /> }
            ))
        if ( !ProfileSettings )
            setProfileSettings(dynamic(() => import('./ProfileComponents/ProfileSettings'), 
                { loading: () => <ProcessLoadingSpinner loading={true} fillScreen={true} relative={true} /> }
            ))
    }, [props, ProfileInfo, ProfileSettings]);

    const ProfileActivities = dynamic(() => import('./ProfileComponents/ProfileActivities'), 
        { loading: () => <ProcessLoadingSpinner loading={true} fillScreen={true} relative={true} /> }
    );
    const ProfileAnalytics = dynamic(() => import('./ProfileComponents/ProfileAnalytics'), 
        { loading: () => <ProcessLoadingSpinner loading={true} fillScreen={true} relative={true} /> }
    );
    const ProfilePurchases = dynamic(() => import('./ProfileComponents/ProfilePurchases'), 
        { loading: () => <ProcessLoadingSpinner loading={true} fillScreen={true} relative={true} /> }
    );

    return (
        <div id='profileRoutesContainer' style={{ height: '100%' }}>
            {
                baseView
                ? (
                    <div className={style.profileBaseViewWelcome}>
                        {
                            isLoggedInUser
                            ? (
                                <label>Welcome Back <span>{ username }</span></label>
                            )
                            : (
                                <label>Welcome To <span>{ username }</span>`s Profile</label>
                            )
                        }
                    </div>
                ) : <></>
            }
            {
                info ? (
                    <Fragment>
                        {
                            ProfileInfo
                            ? (
                                <ProfileInfo 
                                props={props}
                                forms={forms}
                                setForms={setForms}
                                setDescriptiveIndex={setDescriptiveIndex}
                                setUserDataFetched={setUserDataFetched}
                                isLoggedInUser={isLoggedInUser}
                                ></ProfileInfo>            
                            )
                            : <></>
                        }
                    </Fragment>
                ) : <></>
            }
            {
                isLoggedInUser ?
                (
                    <Fragment>
                        {
                            activities ? (
                                <ProfileActivities
                                props={props}
                                ></ProfileActivities>
                            ) 
                            : <></>
                        }
                        {
                            analytics ? (
                                <ProfileAnalytics
                                props={props}
                                ></ProfileAnalytics>
                            )
                            : <></>
                        }
                        {
                            purchases ? (
                                <ProfilePurchases
                                props={props}
                                ></ProfilePurchases>
                            )
                            : <></>
                        }
                        {
                            settings ? (
                                <Fragment>
                                    {
                                        ProfileSettings
                                        ? (
                                            <ProfileSettings
                                            props={props}
                                            forms={forms}
                                            setForms={setForms}
                                            setUserDataFetched={setUserDataFetched}
                                            ></ProfileSettings>
                                        )
                                        : <></>
                                    }
                                </Fragment>
                            )
                            : <></>
                        }
                    </Fragment>
                ) : <></>
            }
            
        </div>
    )
}

export default ProfileRoutes;