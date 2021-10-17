import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import fetchCategoryData from '../../helper/category/fetchCategoryData';

import style from '../../styles/Categories.module.sass';


const getCategoryDataLength = async (category) => {
    const url = `http://localhost:4445/api/products/category/${category}/length`;
    try {
        const length = await axios.get(url);
        return length.data.productsLength;    
    } catch (e) {
        console.log(e);
        return 15;
    }
}

const CategoryMoreToFetch = ({ categoryTitle, categoryData, setCategoryData, sortedBy }) => {

    const [loading, setLoading] = useState(false);
    const [categoryDataLength, setCategoryDataLength] = useState(null);

    useEffect(() => {

        if ( categoryDataLength === null )
            getCategoryDataLength(categoryTitle)
            .then(length => setCategoryDataLength(length));

        const loadingContainer = document.querySelector('#categoryMoreToFetch');
        const loadingObserver = new IntersectionObserver((entry) => {
            if ( entry[0].isIntersecting ) {
                if ( categoryDataLength > categoryData.length ) {
                    setLoading(true);
                    fetchCategoryData(categoryTitle, sortedBy, categoryData.length + 5)
                    .then(fetchedCategoryData => setCategoryData(fetchedCategoryData))
                    .catch(err => console.log(err))
                    .finally(() => setLoading(false));
                }
            }
        })

        loadingContainer && loadingObserver.observe(loadingContainer);
        return () => loadingObserver.disconnect();

    }, [categoryDataLength, categoryData, categoryTitle, setCategoryData, loading]);

    return (
        categoryDataLength === categoryData.length
        ? (
            <div 
            className={style.categoryMoreToFetch}
            style={{ paddingBlock: '1em' }}
            >There are no more products to load.</div>    
        ) 
        : (
            <div className={style.categoryMoreToFetch} id='categoryMoreToFetch'>
            {
                loading
                ? < AiOutlineLoading3Quarters />
                : <></>
            }
            </div>    
        )
    )
}

export default CategoryMoreToFetch;