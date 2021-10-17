import axios from 'axios';


const fetchCategoryTourProducts = async (category, length, sortBy) => {

    const url = 'http://localhost:4445/api/products';
    const route = `${url}/${category ? 'category/' : ''}${category ? `${category}/` : ''}${sortBy || 'default'}/${length}`;
    let categoryProducts = null;

    try {
        categoryProducts = await axios.get(route);
    } catch (e) {}
    finally {
        return categoryProducts.data;
    }
}

export default fetchCategoryTourProducts;