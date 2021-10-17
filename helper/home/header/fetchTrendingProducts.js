import axios from 'axios';


const fetchTrendingProducts = async (url) => {

    let products = null;

    try {
        products = await axios.get(url);
        return products.data;
    } catch (e) {
        return null;
    }
}

export default fetchTrendingProducts;