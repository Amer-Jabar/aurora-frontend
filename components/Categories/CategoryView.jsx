import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ImSpinner3 } from 'react-icons/im';
import { CgSmileSad } from 'react-icons/cg';
import { IoIosAddCircle } from 'react-icons/io';

import ProductCard from './CategoryView/ProductCard';
import fetchUserLikes from '../../helper/category/categoryView/fetchUserLikes';
import userLikesProduct from '../../helper/category/categoryView/userLikesProduct';
import { categoryColors } from './CategoryBar';

import style from '../../styles/Categories.module.sass';


const CategoryView = ({ selectedCategory, categoryData, loading, error, setProductAddForm, showProductFormButton }) => {

    const { userInfo } = useSelector(state => state.User);
    const userId = userInfo?._id || '';

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if ( !userData && categoryData && userId )
            fetchUserLikes(userId)
            .then(response => setUserData(response))
            .catch(err => console.log(err))
    }, [categoryData, userId, userData]);

    return (
        <div className={style.categoryView}>
            {
                showProductFormButton
                ? (
                    <button className={style.productAddFormButton}
                    onClick={() => setProductAddForm(true)}
                    style={{ background: selectedCategory !== null ? categoryColors[selectedCategory] : 'black' }}>
                        <p>Add Product</p>
                        <IoIosAddCircle />
                    </button>
                )
                : <></>
            }
            {
                categoryData && categoryData.length > 0
                ? (
                    <div className={style.categoryProductListContainer}>
                        {
                            categoryData.map((product, index) => {
                                const likeRef = userLikesProduct(userData && userData?.likes, product);
                                return (
                                <ProductCard
                                key={index}
                                product={product}
                                userData={userData}
                                setUserData={setUserData}
                                userLikesProduct={likeRef ? true : false}
                                likeId={likeRef}
                                userIsOwner={userData && userData._id === product.owner}
                                selectedCategory={selectedCategory}
                                />
                            )
                        })
                        }
                    </div>
                )
                :
                loading
                ? (
                    <div className={style.categoryViewLoading}>
                        <ImSpinner3 />
                    </div>
                )
                :
                error 
                ? (
                    <div className={style.categoryFetchError} id='categoryTourError'>
                        <CgSmileSad />
                        <p>oops! something went wrong!</p>
                    </div>
                )
                : 
                categoryData?.length === 0 && !error && !loading
                ? (
                    <div 
                    className={style.categoryMoreToFetch}
                    style={{
                        paddingBlock: '2em',
                        marginTop: '1em'
                    }}>
                        There are no products to load.
                    </div>
                )
                :
                !categoryData && !error && !loading
                ? (
                    <div className={style.categorySelectionMessage}>
                        Please select a category
                    </div>
                )
                : <></>
            }
        </div>
    )
}

export default CategoryView;