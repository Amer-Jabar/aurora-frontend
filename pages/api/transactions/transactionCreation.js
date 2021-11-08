import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../env';


const createTransactionActionThroughAPI = async (req, res) => {

    if ( req.method !== 'POST' )
        return res.status(403).end();

    const { productId, ownerId, productEntity, productPrice } = req.body;
    const userToken = req.headers.authorization.split(' ')[1];

    const response = await axios.post(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/transactions`, {
        productId, ownerId, productEntity, productPrice
    }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    })

    return res.status(200).json({ ...response.data });
}

export default createTransactionActionThroughAPI;