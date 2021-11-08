import { IoIosAddCircle } from 'react-icons/io'

import style from '../../../styles/Categories.module.sass';


const DetailsComponent = ({ details, setDetails }) => {

    return (
        <div className={style.productAddFieldsContainer}>
            {
                details.map((field, index) => (
                    <input 
                    key={index} 
                    type='text'
                    onChange={({ target }) => {
                        const tempDetails = details.map((detail, innerIndex) => index !== innerIndex ? detail : target.value);
                        setDetails(tempDetails);
                    }}
                    />
                ))
            }
            <IoIosAddCircle
            onClick={() => setDetails([...details, ''])}
            />
        </div>
    )
}

export default DetailsComponent;