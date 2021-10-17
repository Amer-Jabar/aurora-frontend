import axios from "axios";
import jwt from 'jsonwebtoken';

import { SECRET_COOKIE_PASSWORD } from "../../env";

const addProductToStore = async (productData, userId, router) => {

    const { name, price, description, image, category } = productData;
    const userToken = jwt.sign(userId ? { userId } : { userId: '' }, userId ? SECRET_COOKIE_PASSWORD : 'random');

    let body = {
        name, price, description
    }

    let err = null;

    try {
        const { data: { _id } } = await axios.post(`http://localhost:4445/api/products/${category}`, body, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })

        body = new FormData();
        body.append('image', image, _id);
        
        await axios.put(`http://localhost:4445/api/products/${category}`, body, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })
        
    } catch (e) {
        err = e;
    } finally {
        if ( err )
            console.log(err)
        else 
            router.push(`/Pages/Categories/${category}`);
    }
}

export default addProductToStore;