import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import ActivityDescription from './ActivityDescription';
import { SECRET_COOKIE_PASSWORD as SECRET, SERVER_HOSTNAME, SERVER_PORT } from '../../../../../../env';

import style from '../../../../../../styles/Profile.module.sass';


const fetchSortedActivityIds = async (id, upperBound) => {

    const userId = jwt.sign(id, SECRET);

    let response = null;
    try {
        response = (await axios.get(`/api/server/users/${id}/activities/${0}-${upperBound}`, {
            headers: {
                authorization: `Bearer ${userId}`
            }
        })).data;
    } catch (e) {
        console.log(e);
    } finally {
        if ( response )
            return response;
    }
}

const fetchPopulatedActivities = async (activityId, userId) => {
    
    const userToken = jwt.sign(userId, SECRET);
    const url = `/api/server/activities`;

    let response = null;

    try {
        response = (await axios.get(`${url}/${activityId}`, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })).data;

        return response;
    } catch (e) {
        return activityId;
    }
}

const fetchActivitiesProcess = async (userId, activitiesLength) => {

    let activitiesList = await fetchSortedActivityIds(userId, Number(activitiesLength + 5))
    const resolvedActivityArray = await Promise.all(
        activitiesList.map( async (activityId) => await fetchPopulatedActivities(activityId, userId)
    ));

    return {
        activities: resolvedActivityArray,
        activitiesAreFetched: true
    }
}

const observeLastActivityForUpdate = async (userId, activitiesLength, setActivities, setFreeze) => {   
    const io = new IntersectionObserver( async (entry) => {
        if ( entry[0].isIntersecting && entry[0].intersectionRatio > 0 ) {
            const { activities } = await fetchActivitiesProcess(userId, activitiesLength);
            if ( activities.length === activitiesLength ) {
                setFreeze(true);
                return;                
            }
            
            setActivities([...activities]);
        }
    })

    return io;
}

const ActivitySection = ({ userId }) => {

    const [activities, setActivities] = useState([]);
    const [activitiesAreFetched, setActivitiesAreFetched] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [freeze, setFreeze] = useState(false);
    const [io, setIO] = useState(null);

    useEffect(() => {

        if ( !mounted )
            fetchActivitiesProcess(userId, 0)
            .then(({ activities, activitiesAreFetched }) => {
                setActivities(activities);
                setActivitiesAreFetched(activitiesAreFetched);
                setMounted(true);
            })

        const lastActivityElement = document.querySelector('#profileActivityActivitiesList')?.lastChild;
        if ( !lastActivityElement )
            return;
            
        if ( !freeze )
            observeLastActivityForUpdate(userId, activities.length, setActivities, setFreeze)
            .then(io => {
                io.observe(lastActivityElement);
                setIO(io);
            })
        else
            io && io?.disconnect();

        return () => io && io?.disconnect();
    }, [userId, activities, mounted, freeze]);

    const ActivitiesList = activities && activities?.length === 0 && activitiesAreFetched
    ? (
        <div>
            <p style={{
                color: '#1a78a8',
                fontWeight: '700',
                fontFamily: 'Varela Round'
            }}>There are no activities.</p>
        </div>    
    )
    : 
    activitiesAreFetched && activities && activities?.length > 0
    ? (
        <div className={style.profileActivityActivitiesList} id='profileActivityActivitiesList'>
            {
                activities.map((activityData, index) => (
                    ActivityDescription(activityData, userId, index)
                ))
            }
        </div>
    )
    : <div>loading...</div>

    return ActivitiesList;
}

export default ActivitySection;