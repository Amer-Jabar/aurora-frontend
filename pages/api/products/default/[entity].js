import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../env';


const getProductFromServer = async (req, res) => {

    const { entity } = req.query;
    if ( entity === null || entity === undefined )
        return res.status(409).end();

    let response = null;
    try {
        response = await axios.get(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/products/default/${entity}`);
    } catch (e) {
        products = [];
    }

    return res.status(200).send({ ...response.data });
}


export default getProductFromServer;