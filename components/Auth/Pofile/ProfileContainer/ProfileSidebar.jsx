import { BiShoppingBag } from 'react-icons/bi';
import { AiOutlineDotChart } from 'react-icons/ai';
import { IoSettingsOutline, IoCartOutline } from 'react-icons/io5';

import ProfileImageComponent from './Components/ProfileImageComponent';

import style from '../../../../styles/Profile.module.sass';


const settingComponentHeirarchy = (index, baseCase, componentHeirarchy, setComponentHeirarchy) => {
    switch ( index ) {
        case 0:
            if ( !componentHeirarchy.info )
            setComponentHeirarchy({
                ...baseCase,
                info: true
            })
            break;

        case 1:
            if ( !componentHeirarchy.activities )
            setComponentHeirarchy({
                ...baseCase,
                activities: true
            })
            break;

        case 2:
            if ( !componentHeirarchy.analytics )
            setComponentHeirarchy({
                ...baseCase,
                analytics: true
            })
            break;

        case 3:
            if ( !componentHeirarchy.purchases )
            setComponentHeirarchy({
                ...baseCase,
                purchases: true
            })
            break;

        case 4:
            if ( !componentHeirarchy.settings )
            setComponentHeirarchy({
                ...baseCase,
                settings: true
            })
            break;
    }
}

const applyActiveLinkStyle = (index, property) => property ? (
    index === 0
    ? ({
        border: 'solid 3px #7992c3',
        padding: '2px'
    })
    : ({ 
        color: '#abc7ff', 
        backgroundColor: '#547ce7' 
    })
) : {};

const ProfileSidebar = ({ userId, imageId, componentHeirarchy, setComponentHeirarchy, isLoggedInUser }) => {

    const baseCase = {
        info: false,
        activities: false,
        analytics: false,
        purchases: false,
        settings: false
    }

    const ProfileImage = ProfileImageComponent(0, userId, imageId, 50);
    const components = [
        <ProfileImage key='0' />, 
        <BiShoppingBag key='1' />, 
        <AiOutlineDotChart key='2' />, 
        <IoCartOutline key='3' />, 
        <IoSettingsOutline key='4' />
    ]

    return (
        <nav className={style.profileSidebar}>
            <ul>
                {
                    components.map((component, index) => {
                        if ( !isLoggedInUser && index !== 0 )
                            return;

                        const componentHeirarchyToArray = Object.values(componentHeirarchy);
                        
                        return (
                            <li key={index}
                            style={ applyActiveLinkStyle(index, componentHeirarchyToArray[index]) }
                            onClick={() => settingComponentHeirarchy(index, baseCase, componentHeirarchy, setComponentHeirarchy)}>
                                { component }
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default ProfileSidebar;