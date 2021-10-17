import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CgSmileSad } from 'react-icons/cg';

import fetchTrendingProducts from '../../helper/home/header/fetchTrendingProducts';

import style from '../../styles/Home.module.sass';


const Header = () => {

    const [trendingProducts, setTrendingProducts] = useState(null);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        if ( !trendingProducts && !fetchError ) {
            fetchTrendingProducts('http://localhost:4445/api/products/default/3')
            .then(products => setTrendingProducts(products))
            .catch(err => setFetchError(true))
        }
    }, [trendingProducts, fetchError])

    const TrendingProductsSidebar = () => {
        if ( !trendingProducts && !fetchError )
            return <></>;
        if ( trendingProducts && !fetchError )
            return trendingProducts.map((element, index) => {
                return (
                    <div
                    key={index}>
                        <Link href={`/Pages/Categories/${element._id}`} passHref>
                            <Image
                            src={`http://localhost:4445/api/products/${element._id}/image`}
                            layout='fill'
                            quality={5}
                            alt={index} />
                        </Link>
                    </div>
                )
            });
        if ( fetchError )
            return (
                <div className={style.trendingProductsFetchError}>
                    <CgSmileSad />
                    <p>oops!</p>
                    { trendingProductsLanding(null, null, fetchError) }
                </div>
            )
    }

    return (
        <div className={style.header} id='header'>
            <section>
                <h1>Top Trending Brands Available Today At Our Shops.</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <button>Categories</button>
            </section>
            <section className={style.headerImage}></section>
            <section id='headerTrendingProducts'>
                <TrendingProductsSidebar />
            </section>
        </div>
    )
}

export default Header;