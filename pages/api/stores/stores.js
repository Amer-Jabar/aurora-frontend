import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../env';


const fetchStoresDataThroughAPI = async (req, res) => {

    const url = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/stores`;

    try {
        const response = await axios.get(url);
        return res.status(200).json({ ...response.data });
    } catch (e) {
        return res.end(null);
    }
}

export default fetchStoresDataThroughAPI;