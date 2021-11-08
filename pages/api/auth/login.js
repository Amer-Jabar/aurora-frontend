

import { serialize } from 'cookie';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD as SECRET, COOKIE_NAME, SERVER_HOSTNAME, SERVER_PORT } from '../../../env';


export const userCredentialsExists = (body, res) => {
    if ( body.username === null || body.password === null )
        return res.status(409).send('An Error Occured!')
    else {}
}

const catchResponseError = ({ response }, res) => {
    if ( response?.status === 403 )
        return res.status(403).send('Unauthenticated!')
    if ( response?.status ===  404 )
        return res.status(404).send('Account Not Found!')
    else
        return res.status(409).send('An Error Occured!')
}


const processResponse = (response, res) => {

    const { token } = response.data;

    return res
    .status(200)
    .setHeader('Set-Cookie', serialize(COOKIE_NAME, token, {
        maxAge: 3600,
        httpOnly: false,
        sameSite: 'strict',
        secure: false,
        path: '/'
    }))
    .send('You Logged In On The Frontend API!');   
}


const Login = async (req, res) => {

    if ( req.method === 'POST' ) {
        const { body: userCredentials } = req;
        let response = null,
            error = null;

        userCredentialsExists(userCredentials, res);

        try {

            const userCredentialsToken = jwt.sign(userCredentials, SECRET);

            response = await axios.get(`http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/user/login`, {
                headers: {
                    authorization: `Bearer ${userCredentialsToken}`
                }
            });
        } catch (e) {
            if ( e?.code === 'ECONNRESET' )
                console.log('Server Connection Was Interrupted!');

            error = e;
        } finally {
            response
            ? processResponse(response, res)
            : catchResponseError(error, res);
        }
    }

}

export default Login;