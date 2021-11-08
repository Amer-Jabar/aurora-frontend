import style from '../../../styles/Partials/Errors.module.sass';


const UpdateProfileError = ({ error: { errorState, errorMessage } }) => errorState 
    ? <div className={style.errorContainer}>{ errorMessage }</div>
    : <></>

export default UpdateProfileError;