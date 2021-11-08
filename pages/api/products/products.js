import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../env';


const postProductBodyThroughAPI = async (req, res) => {
    
    if ( req.method !== 'POST' )
        return res.status(403).end();

    const { products } = req.body;
    const userToken = req.headers.authorization.split(' ')[1];

    const productUrl = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/products`;
    const response = await axios.post(productUrl, { products }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    });

    return res.status(200).json({ ...response.data });
}

export default postProductBodyThroughAPI;