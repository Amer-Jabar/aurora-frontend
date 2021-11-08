import axios from 'axios';


const fetchCategoryData = async (categoryTitle, sortBy, length) => {
    
    const url = `/api/server/products/category/${categoryTitle}/${sortBy}/${length}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        console.log('Error In Fetching Category Data On Next.JS Server.');
    }
}

export default fetchCategoryData;