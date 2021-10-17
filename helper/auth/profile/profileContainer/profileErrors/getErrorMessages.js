
const errorMessagesMap = new Map();

errorMessagesMap.set(400, 'You have not entered anything!');
errorMessagesMap.set(401, 'You are unauthorized to do this action!');
errorMessagesMap.set(404, 'No such user was found!');
errorMessagesMap.set(409, 'An error occured updating your account!');
errorMessagesMap.set(500, 'An internal server error occured, please try again later!');

export const errorMessages = (errorCode) => errorMessagesMap.get(errorCode);

const getErrorMessage = (error) => {

    if ( error === 'Network Error' )
        return 'Network connection error occured!';
        
    const endPadding = 3;
    const errorLength = error.length;
    const errorCode = Number(error.substr(errorLength - endPadding));

    return errorMessages(errorCode);
}

export default getErrorMessage;