import { verify } from 'jsonwebtoken';

import { removeUser } from '../../redux/reducers/userReducer';
import {
    COOKIE_NAME as NAME, 
    SECRET_COOKIE_PASSWORD as SECRET 
} from '../../env';
import { expireNow } from '../../helper/auth/authentication/cookieProps';

const handleCookieVerification = (token, dispatcher, setUser) => {
    
    console.log({ token, dispatcher, setUser });

    let expireIn;
    let userInfo;

    try {
        const verifiedToken = verify(token, SECRET);

        userInfo = verifiedToken.userInfo;
        expireIn = verifiedToken.exp - verifiedToken.iat;

        setTimeout(() => {
            dispatcher(removeUser());
            document.cookie = `${NAME}=; ${expireNow}`;
        }, expireIn * 1000);
    } catch (e) {
        console.log('JWT EXPIRED!');
    } finally {
        if ( userInfo )
            dispatcher(setUser(userInfo));
    }

}

export default handleCookieVerification;