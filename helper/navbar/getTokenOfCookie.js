import { COOKIE_NAME } from '../../env';

const getTokenOfCookie = () => {
    const cookies = (document.cookie && document.cookie.split('; '));
        
    let userCookie;
    if ( cookies && cookies.length > 0 ) {
        cookies.forEach(
            cookie => cookie.split('=')[0] == COOKIE_NAME
            ? userCookie = cookie.split('=')[1]
            : null
        );
    }

    return userCookie ? userCookie : null
}

export default getTokenOfCookie;