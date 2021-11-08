import axios from 'axios';

import { SERVER_HOSTNAME, SERVER_PORT } from '../../../env';


const Logout = async (req, res) => {

    if ( req.method === 'POST' ) {
        const { cookie: userToken } = req.body;

        let response = null;

        if ( !userToken )
            return res.status(200).setHeader('Content-Type', 'text/plain').send({ message: 'Logout Action Frontend API.' });

        try {
            response = await axios.post(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/user/logout`, {}, {
                headers: {
                    authorization: `Bearer ${userToken}`
                }
            });
        } catch (e) {
            if ( e?.code === 'ECONNRESET' )
                console.log('Server Connection Was Interrupted!');
        } finally {
            if ( response && response?.status === 401 )
                return res.status(200).setHeader('Content-Type', 'text/plain').send({ message: 'Cookie expired' });

            return res.status(200).setHeader('Content-Type', 'text/plain').send({ message: 'Logout Action Frontend API.' });
        }        
    }
};

export default Logout;