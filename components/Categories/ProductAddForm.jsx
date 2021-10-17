import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import DetailsComponent from './ProductAddForm/DetailsComponent';
import DimensionsComponent from './ProductAddForm/DimensionsComponent';
import { entityOptions, allFieldsAreValid } from '../../helper/category/productFormHelpers';
import { productCategories } from '../../pages/Pages/Categories';
import productFormAdd from '../../helper/category/productFormAdd';

import style from '../../styles/Categories.module.sass';


const ProductAddForm = ({ setProductAddForm }) => {

    const [name, setName] = useState(null);
    const [category, setCategory] = useState('Furniture');
    const [price, setPrice] = useState(null);
    const [entity, setEntity] = useState(1);
    const [details, setDetails] = useState(['']);
    const [dimensions, setDimensions] = useState(['']);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);

    const { userInfo } = useSelector(state => state.User);

    const [loading, setLoading] = useState(false);

    useEffect(() => {}, [name, category, price, entity, details, dimensions, description, image]);

    return (
        <div className={style.productAddForm}>
            <div className={style.productAddFormContainer}>
                <div className={style.productAddFormHeader}>
                    <h2>Add Product</h2>
                    <IoIosCloseCircleOutline
                    onClick={() => setProductAddForm(false)}
                    />
                </div>
                <div className={style.productAddFormBody}>
                    <label>Name</label>
                    <input type='text' onChange={({ target }) => setName(target.value)}/>
                    <label>Category</label>
                    <select onChange={({ target }) => setCategory(target.value)}>
                    {
                        Object.values(productCategories).map((optionValue, index) => <option key={index}>{ optionValue }</option>)
                    }
                    </select>
                    <label>Price</label>
                    <input type='text' onChange={({ target }) => setPrice(target.value)}/>
                    <div className={style.productHorizontalLine}></div>
                    <label>Entity</label>
                    <select onChange={({ target }) => setEntity(Number(target.value))}>
                    {
                        entityOptions().map((optionValue, index) => <option key={index}>{ optionValue }</option>)
                    }
                    </select>
                    <div className={style.productHorizontalLine}></div>
                    <label>Details</label>
                    <DetailsComponent
                    details={details}
                    setDetails={setDetails}
                    />
                    <div className={style.productHorizontalLine}></div>
                    <label>Dimensions</label>
                    <DimensionsComponent
                    dimensions={dimensions}
                    setDimensions={setDimensions}
                    />
                    <div className={style.productHorizontalLine}></div>
                    <label>Description</label>
                    <textarea rows='10' onChange={({ target }) => setDescription(target.value)}></textarea>
                    <div className={style.productHorizontalLine}></div>
                    <label>Picture</label>
                    <input type='file' id='imageSelector' onChange={({ target }) => setImage(target.files[0])} />
                    <button
                    className={style.formSubmissionButton}
                    style={ 
                        allFieldsAreValid(name, price, entity, details, dimensions, description, image) && !loading
                        ? { pointerEvents: 'all', opacity: '1' } 
                        : { pointerEvents: 'none', opacity: '0.5' }
                    }
                    onClick={() => {
                        setLoading(true);
                        productFormAdd(name, category, price, entity, details, dimensions, description, image, userInfo._id)
                        .then(response => setProductAddForm(false))
                        .catch(err => console.log(err))
                        .finally(() => setLoading(false))
                    }}
                    >
                        { 
                            loading 
                            ? <AiOutlineLoading3Quarters /> 
                            : <p>Add</p> 
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}


export default ProductAddForm;