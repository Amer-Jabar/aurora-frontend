import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const updateUserActivityThroughAPI = async (req, res) => {

    if ( req.method !== 'PUT' )
        return res.status(403).end();

    const { userId } = req.query;
    const { activityId } = req.body;
    const userToken = req.headers.authorization.split(' ')[1];

    const url = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/users/${userId}/activity`;
    let response = null;

    response = await axios.put(url, { activityId }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    })

    return res.status(200).json({});
}

export default updateUserActivityThroughAPI;