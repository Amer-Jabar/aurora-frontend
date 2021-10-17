import LoginAction from '../login';
import { errMessage } from '../../../exception/errorMessages';

const Login = async (username, password, setAuthenticated, error, setError) => {
    try {
        await LoginAction({ username, password });
        setAuthenticated(true);
    } catch (e) {
        if ( String(e) === errMessage(404) ) 
            setError({
                ...error,
                notFound: true
            });
        if ( String(e) === errMessage(403) )
            setError({
                ...error,
                unAuthenticated: true
            });

        setAuthenticated(false);
    }
}

export default Login;