import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const checkProductAvailabilityThroughAPI = async (req, res) => {

    if ( req.method !== 'GET' )
        return res.status(403).end();

    const { productId } = req.query;

    const response = await axios.get(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/products/${productId}/entity`);
    return res.status(200).json({ ...response.data });
}

export default checkProductAvailabilityThroughAPI;