import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const updateUserDepositThroughAPI = async (req, res) => {

    if ( req.method !== 'PUT' )
        return res.status(403).end();

    const { userId } = req.query;
    const { deposit } = req.body;
    const userToken = req.headers.authorization.split(' ')[1];

    await axios.put(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/users/${userId}/deposit`, { deposit }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    });

    return res.status(200).json({});
}

export default updateUserDepositThroughAPI;