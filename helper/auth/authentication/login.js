import axios from 'axios';


const Login = async ({ username, password }) => {
    await axios.post('/api/login', {
        username,
        password
    });    
}

export default Login;