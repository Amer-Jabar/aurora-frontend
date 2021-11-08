import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../../../../env';


const fetchCategoryDataThroughAPI = async (req, res) => {

    const { categoryTitle, sortBy, length } = req.query;

    const url = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/products/category/${categoryTitle}/${sortBy}/${length}`;

    let response = await axios.get(url);

    return res.status(200).json({ ...response.data });
}

export default fetchCategoryDataThroughAPI;