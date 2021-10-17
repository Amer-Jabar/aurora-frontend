import Image from 'next/image';
import { useState, useEffect } from 'react';

import { GiSofa, GiForkKnifeSpoon, GiWallLight } from 'react-icons/gi';
import { IoBedOutline } from 'react-icons/io5';
import { MdToys } from 'react-icons/md';
import { FaShower, FaBed } from 'react-icons/fa';
import { SiCodecov } from 'react-icons/si';
import { ImSpinner3 } from 'react-icons/im';
import { BiRectangle } from 'react-icons/bi';
import { CgSmileSad } from 'react-icons/cg';
import { productCategories } from '../../pages/Pages/Categories';
import fetchCategoryTourProducts from '../../helper/home/categoriesNavigator/fetchCategoryTourProducts';

import style from '../../styles/Home.module.sass';


const iconColors = [
    'rgb(18, 87, 27)',
    'rgb(88, 31, 67)',
    'rgb(188, 183, 26)',
    'rgb(98, 18, 89)',
    'rgb(195, 8, 171)',
    'rgb(69, 43, 123)',
    'rgb(197, 164, 50)',
    'rgb(237, 85, 234)',
    'rgb(223, 76, 156)'
]

const icons = [
    GiSofa,
    IoBedOutline,
    GiForkKnifeSpoon,
    MdToys,
    FaShower,
    FaBed,
    SiCodecov,
    BiRectangle,
    GiWallLight,
]

const CategoriesNavigator = () => {

    const [categoryTourIndex, setCategoryTourIndex] = useState(-1);
    const [categoryTourProducts, setCategoryTourProducts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {}, [categoryTourProducts, loading, error]);

    const CategoryProductTour = () => {
        if ( error && !loading )
            return (
                <div className={style.categoryTourError} id='categoryTourError'>
                    <CgSmileSad />
                    <p>oops! something went wrong!</p>
                </div>
            )
        else if ( loading )
            return (
                <div className={style.categoryTourLoading}>
                    <ImSpinner3 />
                </div>
            )
        else if ( categoryTourProducts ) {
            return (
                <div className={style.categoryTourProducts} id='categoryTourProducts'>
                    {
                        categoryTourProducts?.length > 0 ? categoryTourProducts.map(({ _id, name, price }, index) => (
                            <div className={style.categoryTourProductComponent} key={index}>
                                <Image
                                src={`http://localhost:4445/api/products/${_id}/image`}
                                layout='fill'
                                alt='category tour image'
                                quality={10}
                                />
                                <div className={style.categoryTourProductInfo}>
                                    <div>
                                        <p>{ name }</p>
                                        <p>${ price }.00</p>
                                    </div>
                                    <button>Go To Product</button>
                                </div>
                            </div>
                        ))
                        : <div className={style.categoryTourProductsMessage}>There are no products in this category.</div>
                    }
                </div>
            )
        } else if ( !error && !loading && !categoryTourProducts )
            return (
                <div className={style.categoryTourProductsMessage}>
                    Please choose a category.
                </div>
            )
    }

    return (
        <div className={style.categoriesNavigator}>
            <h1>Categories</h1>
            <div className={style.categoryIcons}>
                {
                    icons.map((Icon, index) => 
                        <div key={index}
                            style={{ backgroundColor: categoryTourIndex === index ? '#a9a9a940' : '' }}
                            onClick={() => {
                                if ( categoryTourIndex !== index ) {
                                    setCategoryTourIndex(index);
                                    setError(false);
                                    setLoading(true);
                                    fetchCategoryTourProducts(productCategories[index], 4)
                                    .then(response => setCategoryTourProducts(response))
                                    .catch(err => setError(true))
                                    .finally(() => setLoading(false));
                                }
                            }}>
                            <Icon 
                            key={index} 
                            color={iconColors[index]}
                            ></Icon>
                            <p>{ productCategories[index] }</p>
                        </div>
                    )
                }
            </div>
            <div className={style.headerCategoryTour}>
                <CategoryProductTour />
            </div>
        </div>
    )

}

export default CategoriesNavigator;