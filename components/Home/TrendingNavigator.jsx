import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { 
    SiAirbnb, 
    SiAircanada, 
    SiAmazonalexa, 
    SiApacheairflow, 
    SiBmcsoftware, 
    SiCloudsmith,
    SiFlood,
} from 'react-icons/si';

import fetchCategoryTourProducts from '../../helper/home/categoriesNavigator/fetchCategoryTourProducts';
import observeIntersection from '../../helper/home/trendingNavigator/observeIntersection';

import style from '../../styles/Home.module.sass';


const TrendingNavigator = () => {

    const [trendingProducts, setTrendingProducts] = useState(null);
    const [error, setError] = useState(false);

    const tempErrRef = useRef();
    const componentIO = useRef();

    useEffect(() => {

        if ( !trendingProducts && !error )
            fetchCategoryTourProducts(null, 3, 'view')
            .then(response => setTrendingProducts(response))
            .catch(err => {
                setError(true);
                tempErrRef.current = err;
            })
            .finally(() => {
                const body = document.querySelector('body');
                body.style.overflowX = 'hidden';                
            })

            return () => {
                if ( tempErrRef.current )
                    tempErrRef.current = null;
                if ( componentIO.current )
                    componentIO.current = null;
            }
    }, [trendingProducts, error]);

    return (
        <div className={style.trendingNavigator}>
            <h1>Trending Products</h1>
            <div className={style.trendingProductsContainer} id='trendingProductsContainer'
            onLoad={() => componentIO.current = observeIntersection()}>
                {
                    trendingProducts
                    ? (
                        trendingProducts.map(({ _id, name, category, price }, index) => (
                            <div style={{ height: 'max-content', display: 'block' }} key={index}>
                                <div 
                                className={style.trendingProductComponent}
                                key={index}>
                                    <div className={style.trendingProductComponentInfo}>
                                        <h2>{ name }</h2>
                                        <h5>Category: { category }</h5>
                                        <p>Price: ${ price }.00</p>
                                        <button><Link href={`/Pages/Categories/${_id}`}>Shop</Link></button>
                                    </div>
                                    <Image
                                    className={style.trendingProductComponentImage}
                                    src={`/api/server/products/${_id}/image`}
                                    height='288'
                                    width='288'
                                    alt='trending product'
                                    quality={10}
                                    />
                                </div>
                            </div>
                        ))
                    )
                    : error 
                        ? <div className={style.trendingProductsFetchError}>oops! an error occured!</div>
                    : <></>
                }
            </div>
            <div className={style.trendingProductsBrands}>
                <SiAirbnb /> 
                <SiAircanada /> 
                <SiAmazonalexa /> 
                <SiApacheairflow /> 
                <SiBmcsoftware /> 
                <SiCloudsmith />
                <SiFlood />
            </div>
        </div>
    )

}

export default TrendingNavigator;