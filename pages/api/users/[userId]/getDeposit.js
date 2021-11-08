import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const checkUserDepositThroughAPI = async (req, res) => {

    if ( req.method !== 'GET' )
        return res.status(403).end();

    const { userId } = req.query;
    const userToken = req.headers.authorization.split(' ')[1];

    const response = await axios.get(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/users/${userId}/deposit`, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    });

    return res.status(200).json({ ...response.data });
}

export default checkUserDepositThroughAPI;