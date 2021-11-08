import axios from 'axios';


const addActivityAction = async (activityId, activityName, productId, userToken) => {

    let url = `/api/server/activities`;
    let response = null;

    try {
        response = (await axios.post(url, { activityId, activityName, productId }, {
            headers: {
                authorization: `Bearer ${userToken}`
            }
        })).data
    } catch (e) {
        console.log('Error In Activity Creation On Next.JS Server.');
        response = null;
    } finally {
        return response;
    }
}

export default addActivityAction;