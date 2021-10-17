import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import { COOKIE_NAME, SECRET_COOKIE_PASSWORD } from '../../env';


const catchResponseError = async ({ response }, res) => {
    if ( response.status === 406 )
        return res.status(406).send('User Already Exists!')
    if ( response.status === 404 )
        return res.status(404).send('Database Failed In Creating User Account!')
};


const processRequest = async (response, res) => {
    const { token } = response.data;

    res
    .status(201)
    .setHeader('Set-Cookie', serialize(COOKIE_NAME, token, {
        maxAge: 3600,
        httpOnly: false,
        sameSite: 'strict',
        secure: false,
        path: '/'
    }))
    .send('You Logged In On The Frontend API!');
}


const Signup = async (req, res) => {

    if ( req.method === 'POST' ) {
        const user = req.body;
        let response = null,
            error = null;

        const userToken = jwt.sign(user, SECRET_COOKIE_PASSWORD);

        try {
            response = await axios.post('http://localhost:4445/api/user/signup', { userToken });
        } catch (e) {
            if ( e?.code === 'ECONNRESET' )
                console.log('Server Connection Was Interrupted!');
            error = e;
        } finally {
            response
            ? processRequest(response, res)
            : catchResponseError(error, res)
        }

    }
    
};

export default Signup;