import axios from 'axios';


const Login = async ({ username = null, password = null }) => {
    await axios.post('/api/auth/login', {
        username,
        password
    });
}

export default Login;