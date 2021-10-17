import axios from 'axios';
import jwt from 'jsonwebtoken';
import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../../../env';


const fetchAnalyticProps = async (userId, propertyName, propertyIds) => {

    const userToken = jwt.sign(userId, SECRET);
    const baseUrl = 'http://localhost:4445/api';

    let response = null;

    try {
        const promises = propertyIds.map( async (id) => (await axios.get(`${baseUrl}/${propertyName}/${id}`, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })).data);
    
        response = await Promise.all(promises);
        return response;
    } catch (e) {
        return {};
    }
}

export default fetchAnalyticProps;