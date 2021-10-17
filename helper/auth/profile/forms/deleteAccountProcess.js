import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../../env';


const deleteAccountProcess = async (_id) => {
    
    const token = jwt.sign(_id, SECRET);

    await axios.delete(`http://localhost:4445/api/users/${_id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

export default deleteAccountProcess;