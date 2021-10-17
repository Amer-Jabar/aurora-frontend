import axios from "axios";


const Signup = async ({ username, password }) => {
    const response = await axios.post('/api/signup', {
        username,
        password
    });

    if ( response.status !== 201 )
        return;
}

export default Signup;