import { SERVER_HOSTNAME, SERVER_PORT } from "../../../../env";

const likeDeletionActionThroughAPI = async (req, res) => {

    if ( req.method !== 'DELETE' )
        return res.status(403).end();

    const { likeId } = req.query;
    const userToken = req.headers.authorization.split(' ')[1];

    const likeUrl = `http://${SERVER_HOSTNAME}:${SERVER_PORT}/api/likes/${likeId}`;

    const response = await axios.delete(likeUrl, {
        headers: {
            authorization: `Bearer ${userToken}`
        }
    })
    
    return res.status(200).json({ ...response.data });
}

export default likeDeletionActionThroughAPI;