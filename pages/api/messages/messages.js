import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../env';


const postMessageThroughAPI = async (req, res) => {

    const { username, email, message } = req.body;

    try {
        await axios.post(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/messages`, { username, email, message })
        return res.status(200).json({});
    } catch (e) {
        return res.status(403).json();
    }
}

export default postMessageThroughAPI;