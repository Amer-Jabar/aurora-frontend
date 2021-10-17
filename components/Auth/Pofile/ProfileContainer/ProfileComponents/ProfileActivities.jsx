import { useEffect, useState } from 'react';
import { BiCreditCardAlt } from 'react-icons/bi';
import { FiBox } from 'react-icons/fi';
import { MdFavoriteBorder, MdRateReview } from 'react-icons/md';

import ProfileActivitiesList from './ProfileActivities/ProfileActivitiesList';
import getProfileActivityProps from '../../../../../helper/auth/profile/profileContainer/profileActivitiesComponent/getProfileActivityProps';
import { firstToUpper } from '../../../../../helper/auth/profile/profileContainer/profileAnalytics/createForecastDashboard';

import style from '../../../../../styles/Profile.module.sass';


const PropertyIcon = ({ index }) => [
    <BiCreditCardAlt key={index} color={iconColors[index]} />, 
    <FiBox key={index} color={iconColors[index]} />,
    <MdFavoriteBorder key={index} color={iconColors[index]} />,
    <MdRateReview key={index} color={iconColors[index]} />, 
][index];

const iconColors = ['#1e90ff', '#008b8b', '#b12c2c', '#c9cb43'];

const ProfileActivities = ({ props: { _id } }) => {

    /*
        sortedStoreProps variable is basically for any activity done by the user it is 
        fetched and arranged from the storeProps variable that fetches from the backend
    */
    const [activityProps, setActivityProps] = useState({});

    useEffect(() => {
        getProfileActivityProps(_id)
        .then(activityProps => setActivityProps(activityProps))
    }, [_id]);
    
    return (
        <div className={style.profileActivityComponent}>
            <section id='profileActivitySectionOne'>
                {
                    activityProps && Object.values(activityProps).map(({ propertyLength, propertyName }, index) => (
                        <div className={style.profileActivityBox} key={index}>
                            <div>
                                <PropertyIcon index={index}></PropertyIcon>
                            </div>
                            <div>
                                <span>{ propertyLength }</span>
                                <h3>{ firstToUpper(propertyName) }</h3>
                            </div>
                        </div>
                    ))
                }
            </section>
            <section>
                <hr />
                <h2>Recent Activity</h2>
            </section>
            <section id='beautifyScrollbar'>
                <ProfileActivitiesList
                userId={_id}
                ></ProfileActivitiesList>
            </section>
        </div>
    );
}

export default ProfileActivities;