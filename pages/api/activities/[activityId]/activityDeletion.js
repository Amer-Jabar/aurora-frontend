import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const activityDeletionActionThroughAPI = async (req, res) => {

    if ( req.method !== 'DELETE' )
        return res.status(403).end();

    const { activityId } = req.query;
    const userToken = req.headers.authorization.split(' ')[1];

    const activityUrl = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/activities/${activityId}`;

    await axios.delete(activityUrl, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    })
    
    return res.status(200).json({});
}

export default activityDeletionActionThroughAPI;