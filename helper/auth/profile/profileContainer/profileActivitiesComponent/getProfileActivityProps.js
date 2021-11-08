import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../../../env';


const activityPropsTable = ['transactions', 'products', 'likes', 'reviews']

const getProfileStoreProps = async (_id) => {

    const userId = jwt.sign(_id, SECRET);   
    let response = null;

    const requestPromises = activityPropsTable.map(property => {
        const url = `/api/server/users/${_id}/${property}/length`;
        return axios.get(url, {
            headers: {
                authorization: `Bearer ${userId}`
            }
        })
    });

    try {
        response = (await Promise.all(requestPromises)).map(({ data }, index) => {
            const { userPropertiesLength: propertyLength } = data;
            return {
                propertyName: activityPropsTable[index],
                propertyLength
            }
        });
    } catch (e) {
        console.log(e);
    } finally {
        if ( response )
            return response;
    }

};

export default getProfileStoreProps;