import axios from 'axios';


const fetchCategoryTourProducts = async (category, length, sortBy) => {

    const route = `/api/server/products/${category ? 'category/' : ''}${category ? `${category}/` : ''}${sortBy || 'default'}/${length}`;
    let categoryProducts = null;

    try {
        categoryProducts = await axios.get(route, { category, length, sortBy });
    } catch (e) {}
    finally {
        return categoryProducts.data;
    }
}

export default fetchCategoryTourProducts;