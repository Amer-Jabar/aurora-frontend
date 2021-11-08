import axios from 'axios';


const fetchTrendingProducts = async (url = '/api/server/products/default/3') => {

    let response = null;

    try {
        response = await axios.get(url);
        return response.data;
    } catch (e) {
        return null;
    }
}

export default fetchTrendingProducts;