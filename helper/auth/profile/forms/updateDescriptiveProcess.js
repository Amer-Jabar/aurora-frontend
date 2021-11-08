import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../../env';


const updateDescriptiveProcess = async (value, title, { _id }) => {

    const userToken = jwt.sign(_id, SECRET);

    await axios.patch(`/api/server/users/${_id}`, { title, value }, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    });
}

export default updateDescriptiveProcess;