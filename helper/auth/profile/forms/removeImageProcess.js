import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../../env';


const removeImageProcess = async (e, _id) => {
    e.preventDefault();

    const token = jwt.sign({ _id }, SECRET);

    await axios.delete(`/api/server/users/${_id}/image`, {
        headers: { authorization: `Bearer ${token}` }
    });
    
}

export default removeImageProcess;