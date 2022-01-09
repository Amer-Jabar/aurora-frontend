import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import hexToHsl from 'hex-to-hsl';

import Navbar from '../../../components/Partials/Navbar';
import ItemDetailSpecs from '../../../components/Categories/CategoryView/Item/ItemDetailSpecs';
import ItemStats from '../../../components/Categories/CategoryView/Item/ItemStats';
import ReviewComponent from '../../../components/Categories/Item/ReviewComponent';
import { categoryColors } from '../../../components/Categories/CategoryBar';
import { productCategories } from '../Categories';
import { extractColorFromString } from '../../../helper/category/categoryView/styleEffects';
import addViewToProduct from '../../../helper/category/categoryView/item/addViewToProduct';
import fetchAllReviews from '../../../helper/category/categoryView/item/fetchAllReviews';
import { adjustDate } from '../../../components/Auth/Pofile/ProfileContainer/ProfileComponents/ProfileActivities/ActivityDescription';
import { SERVER_HOSTNAME, SERVER_PORT } from '../../../env';

import style from '../../../styles/Categories.module.sass';


const isEmptyObject = (object) => Object.values(object).length === 0;

const categoryToIndex = (categoryName) => {
    let indexValue = -1;
    Object.values(productCategories).forEach((category, index) => categoryName === category ? indexValue = index : null);
    return indexValue;
}

const setReviewsStyle = () => {
    try {
        if ( innerWidth > 600 )
            return toggledReviewStyle
        else
            return {
                ...toggledReviewStyle,
                height: '60%'
            }
    } catch (e) {
        return {};
    }
};

const unsetReviewsStyle = () => {
    try {
        if ( innerWidth > 600 )
            return untoggledReviewStyle;
        else
            return {
                ...untoggledReviewStyle,
                width: '50%',
                left: '25%'
            }
    } catch (e) {
        return {};
    }
}

const untoggledReviewStyle = {
    width: '25%',
    height: '55px',
    bottom: '25px',
    left: '37.5%',
    borderRadius: '5em'
}

const toggledReviewStyle = {
    width: '80%',
    height: '80%',
    bottom: '25px',
    left: '10%',
    borderRadius: '1em'
}

const Item = (itemProps) => {
    const { 
        _id, name, category, likesCount, likes, views, buyer, owner, createdAt,
        description, price, entity, dimensions, details, reviewCounts, reviews 
    } = itemProps;

    const headerGradientColor = categoryToIndex(category);
    const headerColor = extractColorFromString(categoryColors[headerGradientColor]);
    const [hue] = hexToHsl(headerColor);

    const [reviewSectionToggled, setReviewSectionToggled] = useState(false);

    const [reviewsState, setReviewsState] = useState(reviews);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        let watchTimeout = setTimeout(() => {
            addViewToProduct(_id)
            .catch(err => console.log('Error In Adding View To Product Through Next.JS Server.'))
        }, 5000);

        return () => clearTimeout(watchTimeout);
    }, [_id])

    useEffect(() => {}, [reviewSectionToggled]);

    useEffect(() => {
        if ( !mounted )
            fetchAllReviews(reviews)
            .then(response => setReviewsState(response))
            .finally(() => setMounted(true))
        
    }, [reviews, mounted])

    return (
        <div className={style.itemContainer}>
            {
                isEmptyObject(itemProps)
                ? <div><h1>Were not able to connect!</h1></div>
                : (
                    <Fragment>
                        <Head>
                            <title>{ name }</title>
                            <meta 
                            name='description' 
                            content={`${name} product from category ${category}.`}
                            key='desc'
                            />
                            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                        </Head>
                        <Navbar />
                        <main>
                            <section>
                                <Image
                                alt='item image'
                                src={`/api/server/products/${_id}/image`}
                                layout='fill'
                                quality={50}
                                />
                            </section>
                            <section>
                                <div className={style.itemDetailIntroduction}>
                                    <h1 
                                    style={{ color: headerColor }}
                                    >{ name }</h1>
                                    <p
                                    style={{
                                        color: '#474747',
                                        fontWeight: '700',
                                        fontFamily: 'Varela Round'
                                    }}>Posted by: <Link href={`/Pages/Auth/${owner?.username}-${owner?._id}`}><a>{ owner?.username }</a></Link>, { adjustDate(createdAt) }</p>
                                    <p>{ description }</p>
                                    <label 
                                    style={{ 
                                        width: 'max-content',
                                        borderRadius: '0em 0.5em 0.5em 0em',
                                        borderLeft: '2px solid black',
                                        backgroundColor: `hsl(${hue}deg ${20}% ${95}%)`
                                    }}
                                    >${ price }.00</label>
                                </div>
                                {
                                    entity === 0
                                    ? (
                                        <label
                                        style={{
                                            borderRadius: '5px',
                                            background: '#ffcaca',
                                            fontSize: '16px',
                                            fontWeight: '100',
                                        }}>This item is left out of store!</label>
                                    )
                                    : (
                                        <select>
                                        {
                                            Array.from({ length: entity }, (_, index) => <option key={index} value={index + 1}>{ index + 1 }</option>)
                                        }
                                        </select>        
                                    )
                                }
                                <ItemDetailSpecs
                                dimensions={ dimensions}
                                details={ details}
                                />
                            </section>
                            <section style={{ background: `linear-gradient(90deg, hsl(${hue}deg ${20}% ${95}%), transparent)` }}>
                                <ItemStats
                                ownerId={owner?._id}
                                productId={_id}
                                likesCount={likesCount}
                                likes={likes}
                                views={views}
                                buyer={buyer}
                                entity={entity}
                                />
                            </section>
                            <section
                            id='reviewToggleButton'
                            style={
                                reviewSectionToggled
                                ? setReviewsStyle()
                                : unsetReviewsStyle()
                            }>
                                {
                                    reviewSectionToggled
                                    ? (
                                        <ReviewComponent
                                        ownerId={owner?._id}
                                        productId={_id}
                                        reviewCounts={reviewCounts}
                                        reviews={reviewsState}
                                        setReviews={setReviewsState}
                                        setReviewSectionToggled={setReviewSectionToggled}
                                        />
                                    )
                                    : (
                                        <button 
                                        className={style.showReviewsButton} 
                                        onClick={() => setReviewSectionToggled(true)}
                                        >Reviews</button>
                                    )
                                }
                            </section>
                        </main>
                    </Fragment>
                )
            }
        </div>
    )
}

export const getServerSideProps = async (context) => {

    const { ItemId } = context.query;

    let props = null;
    
    try {
        props = (await axios.get(`https://${SERVER_HOSTNAME}/api/products/${ItemId}`)).data;
    } catch (e) {
        console.log('Error In Fetching Item Properties On Next.JS Server.');
        props = {};
    }

    return { props }
}

export default Item;