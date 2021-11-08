import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const addViewToProductThroughAPI = async (req, res) => {

    if ( req.method !== 'POST' )
        return res.status(403).end();

    const { productId } = req.query;
    const { product } = req.body;

    const url = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/products/${productId}/view`;

    await axios.post(url, { product });

    return res.status(200).json({});
}

export default addViewToProductThroughAPI;