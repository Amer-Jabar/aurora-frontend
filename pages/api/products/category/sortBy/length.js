import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../../env';


const fetchCategoryTourProductsThroughAPI = async (req, res) => {

    if ( req.method !== 'POST' )
        return res.status(403).end();

    const { category, length, sortBy } = req.body;

    const url = `http://${SERVER_HOSTNAME}:${SERVER_PORT}`;
    let categoryProducts = null;

    try {
        categoryProducts = await axios.get(url, { category, length, sortBy });
    } catch (e) {
        categoryProducts = [];
    } finally {
        return res.status(200).json({ ...categoryProducts.data });
    }

}


export default fetchCategoryTourProductsThroughAPI;