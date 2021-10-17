import { errorDisplayMessage } from "../../../helper/exception/errorMessages";

const ErrorMessageDisplay = ({ style, errorIndex, setError }) => {
    return (
        <div className={style.authenticationErrorContainer} key={errorIndex}>
            <p>{ errorDisplayMessage[errorIndex] }</p>
            <button
            onClick={() => {
                setError({
                    notFound: false,
                    unAuthenticated: false,
                    UsernameDuplicate: false,
                    DatabaseError: false
                })
            }}>Ok</button>
        </div>
    )
}

export default ErrorMessageDisplay;