import axios from 'axios';

const fetchStoresData = async () => {
    const url = 'http://localhost:4445/api/stores';

    const data = (await axios.get(url)).data;
    return data;
}

export default fetchStoresData;