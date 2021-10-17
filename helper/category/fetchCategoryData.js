import axios from 'axios';


const fetchCategoryData = async (categoryTitle, sortBy, length) => {
    const url = `http://localhost:4445/api/products/category/${categoryTitle}/${sortBy}/${length}`;

    return (await axios.get(url)).data;
}

export default fetchCategoryData;