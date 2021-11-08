import axios from 'axios';


const fetchStoresData = async () => {
    const response = await axios.get('/api/server/stores');
    return response.data;
}

export default fetchStoresData;