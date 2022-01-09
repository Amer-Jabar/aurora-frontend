import ProfileAnalyticsForecast from './ProfileAnalytics/ProfileAnalyticsForecast';
import ProfileAnalyticsPieCharts from './ProfileAnalytics/ProfileAnalyticsPieCharts';

import style from '../../../../../styles/Profile.module.sass';


const ProfileAnalytics = ({ props }) => {

    console.log(props);

    return (
        <main className={style.profileAnalyticsComponentContainer}>
            <ProfileAnalyticsPieCharts userProps={props} />
            <ProfileAnalyticsForecast userProps={props} />
        </main>
    );
}

export default ProfileAnalytics;