import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../env';


const addActivityActionThroughAPI = async (req, res) => {

    if ( req.method !== 'POST' )
        return res.status(403).end();

    const { activityId, activityName, productId } = req.body;
    const userToken = req.headers.authorization.split(' ')[1];

    let url = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/activities`;

    let response = (await axios.post(url, { activityId, activityName, productId }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    }));

    return res.status(200).json({ ...response.data });
}

export default addActivityActionThroughAPI;