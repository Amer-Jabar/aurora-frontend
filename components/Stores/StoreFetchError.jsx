import { Fragment } from 'react';
import { BiError } from 'react-icons/bi';

import style from '../../styles/Stores.module.sass';


const StoreFetchError = ({ children, error }) => {
    return (
        <Fragment>
            {
                error
                ? (
                    <div className={style.storeFetchError}>
                        <div>
                            <BiError />
                            <p>An error occured while fetching resources!</p>
                        </div>
                    </div>
                )
                : { ...children }
            }
        </Fragment>
    )
}

export default StoreFetchError;