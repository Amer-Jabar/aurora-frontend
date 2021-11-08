import { IoIosAddCircle } from 'react-icons/io'

import style from '../../../styles/Categories.module.sass';


const DimensionsComponent = ({ dimensions, setDimensions }) => {

    return (
        <div className={style.productAddFieldsContainer}>
            {
                dimensions.map((field, index) => (
                    <input 
                    key={index} 
                    type='text'
                    onChange={({ target }) => {
                        const tempDimensions = dimensions.map((dimension, innerIndex) => index !== innerIndex ? dimension : target.value);
                        setDimensions(tempDimensions);
                    }}
                    />
                ))
            }
            <IoIosAddCircle
            onClick={() => setDimensions([...dimensions, ''])}
            />
        </div>
    )
}

export default DimensionsComponent;