import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../../env';


const UploadImageProcess = async (e, image, _id) => {
    e.preventDefault();

    const token = jwt.sign(_id, SECRET);

    const body = new FormData();
    body.append('image', image, image.name);

    await axios.post(`/api/server/users/${_id}/image`, body, {
        headers: { authorization: `Bearer ${token}` }
    });
}

export default UploadImageProcess;