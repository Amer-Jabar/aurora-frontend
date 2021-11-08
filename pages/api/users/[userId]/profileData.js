import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const fetchProfileDataThroughAPI = async (req, res) => {

    const { userId } = req.query;
    const userToken = req.headers.authorization.split(' ')[1];

    if ( req.method !== 'GET' || userToken === null || userToken === undefined )
        return res.status(401).end();

    let props = null;
    
    try {
        props = (await axios.get(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/users/${userId}`, {
            headers: {
                authorization: `Bearer ${userToken}`
            },
        })).data;
    
    } catch (e) {
        props = {};
    }

    return res.status(200).send({ ...props });
};

export default fetchProfileDataThroughAPI;