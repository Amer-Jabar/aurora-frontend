import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../../components/Partials/Navbar';
import CategoryBar from '../../components/Categories/CategoryBar';
import CategoryView from '../../components/Categories/CategoryView';
import fetchCategoryData from '../../helper/category/fetchCategoryData';
import ProductAddForm from '../../components/Categories/ProductAddForm';

import style from '../../styles/Categories.module.sass';


export const productCategories = {
    0: "Furniture",
    1: "Mattresses",
    2: "Kitchen",
    3: "Kids",
    4: "Bath",
    5: "Bedding",
    6: "Decor",
    7: "Rugs",
    8: "Lighting"
}

const Categories = () => {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [sortedBy, setSortedBy] = useState('default');
    const [productAddForm, setProductAddForm] = useState(false);

    const { userInfo, loggedIn } = useSelector(state => state.User);
    const showProductFormButton = userInfo && loggedIn;

    console.log({ selectedCategory, categoryData });

    useEffect(() => {

        if ( selectedCategory !== null && !categoryData && !error ) {
            setLoading(true);
            fetchCategoryData(productCategories[selectedCategory], sortedBy, 10)
            .then(response => setCategoryData(response || []))
            .catch(err => setError(true))
            .finally(() => setLoading(false))
        }

    }, [selectedCategory, categoryData, loading, error, sortedBy]);

    const CategoryFilters = dynamic(() => import('../../components/Categories/CategoryFilters'));
    const CategoryMoreToFetch = dynamic(() => import('../../components/Categories/CategoryMoreToFetch'));

    return(
        <div>
            <Head>
                <title>Categories</title>
                <meta 
                name='description' 
                content='Aurora E-Commerce websites product categories. You can browse all products by type.'
                key='desc'
                />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            </Head>
            {
                productAddForm 
                ? <div className={style.categoriesBackgroundBlock}></div>
                : <></>
            }
            <Navbar></Navbar>
            <div className={style.categoriesContainer} id='categoriesContainer'>
                <CategoryBar 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setSortedBy={setSortedBy}
                setCategoryData={setCategoryData}
                setError={setError}
                />
                <CategoryFilters
                categoryIndex={selectedCategory}
                setCategoryData={setCategoryData}
                setError={setError}
                sortedBy={sortedBy}
                setSortedBy={setSortedBy}
                />
                <CategoryView
                selectedCategory={selectedCategory}
                categoryData={categoryData}
                loading={loading}
                error={error}
                productAddForm={productAddForm}
                setProductAddForm={setProductAddForm}
                showProductFormButton={showProductFormButton}
                />
                {
                    categoryData && categoryData.length > 0
                    ? (
                        <CategoryMoreToFetch
                        categoryTitle={productCategories[selectedCategory]}
                        categoryData={categoryData}
                        setCategoryData={setCategoryData}
                        sortedBy={sortedBy}
                        />
                    )
                    : <></>
                }
                {
                    productAddForm
                    ? (
                        <ProductAddForm
                        setProductAddForm={setProductAddForm}
                        />
                    )
                    : <></>
                }
            </div>
        </div>
    )
}

export default Categories;