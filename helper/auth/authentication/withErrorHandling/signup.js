import SignupAction from '../signup';
import { errMessage } from '../../../exception/errorMessages';

const Signup = async (username, password, setAuthenticated, error, setError) => {
    try {
        await SignupAction({ username, password });
        setAuthenticated(true);
    } catch (e) {
        console.log(e);
        if ( e == errMessage(406) )
            setError({
                ...error,
                UsernameDuplicate: true
            });
        if ( e == errMessage(404) )
            setError({
                ...error,
                DatabaseError: true
            });
            
        setAuthenticated(false);
    }
}

export default Signup;