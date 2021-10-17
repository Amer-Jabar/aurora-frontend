import axios from 'axios';


const addActivityAction = async (activityId, activityName, productId, userToken) => {

    let baseUrl = `http://localhost:4445/api/activities`;

    let response = null;

    try {
        response = (await axios.post(baseUrl, { activityId, activityName, productId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })).data
    } catch (e) {
        response = 403;
    } finally {
        return response;
    }
}

export default addActivityAction;