import axios from 'axios';


const fetchAllReviews = async (reviews) => {

    let response = null;

    const requests = reviews.map(review => axios.get(`/api/server/reviews/${review}`));

    try {
        response = (await Promise.all(requests)).map(resolve => resolve.data);
        return response;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export default fetchAllReviews;