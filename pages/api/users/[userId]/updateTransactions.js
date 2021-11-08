import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const updateUserTransactionsThroughAPI = async (req, res) => {

    if ( req.method !== 'POST' )
        return res.status(403).end();

    const { userId } = req.query;
    const { transactionId, userRole } = req.body;
    const userToken = req.headers.authorization.split(' ')[1];

    await axios.post(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/server/users/${userId}/transactions`, 
        { transactionId, userRole }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    });

    return res.status(200).json({});
}

export default updateUserTransactionsThroughAPI;