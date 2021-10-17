import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { categoryColors } from '../CategoryBar';
import { FaRegHeart } from 'react-icons/fa';
import { BsFillHeartFill } from 'react-icons/bs';
import {
    likeCreationAction,
    userLikeAction,
    productLikeAction
} from '../../../helper/category/categoryView/likeActions';
import addActivityAction from '../../../helper/category/addActivityAction';
import { 
    productDislikeAction,
    userDislikeAction,
    activityDeletionAction,
    likeDeletionAction
} from '../../../helper/category/categoryView/dislikeActions'
import {
    extractColorFromString,
} from '../../../helper/category/categoryView/styleEffects';
import { SECRET_COOKIE_PASSWORD as SECRET } from '../../../env';

import style from '../../../styles/Categories.module.sass';
import { Fragment } from 'react';


export const likeProduct = async (productId, userId) => {

    const userToken = jwt.sign(userId, SECRET);

    try {

        const like = await likeCreationAction(productId, userToken);
        const { _id: likeId } = like;
        const activityStatus = await addActivityAction(likeId, 'Like', productId, userToken);
        const productStatus = await productLikeAction(likeId, productId, userToken);
        const userStatus = await userLikeAction(likeId, userId, userToken, productId);

        if ( userStatus === 200 && productStatus === 200 && activityStatus )
            return like;
            
    } catch (e) {
        return null;
    }
}

export const dislikeProduct = async (likeId, userId, productId) => {

    const userToken = jwt.sign(userId, SECRET);

    try {
        const productStatus = await productDislikeAction(likeId, productId, userToken);
        const userStatus = await userDislikeAction(likeId, productId, userId, userToken);
        const activityStatus = await activityDeletionAction(likeId, userToken);
        const dislike = await likeDeletionAction(likeId, userToken);

        if ( productStatus.status === 200 && userStatus.status === 200 && activityStatus.status )
            return dislike;

    } catch (e) {
        console.log(e);
        return null;
    }
}

const ProductCard = ({ key, product, userData, setUserData, userLikesProduct, likeId, userIsOwner, selectedCategory }) => {
    
    useEffect(() => {}, [product]);

    return (
        <div 
        className={style.catgoryProductComponent} 
        key={key}
        >
        {
            product
            ? (
                <Fragment>
                    <Image
                    src={`http://localhost:4445/api/products/${product._id}/image`}
                    layout='fill'
                    alt='product picture'
                    quality={5}
                    ></Image>
                    {
                        userData && !userIsOwner
                        ?
                            userLikesProduct
                            ? <BsFillHeartFill onClick={() => {
                                dislikeProduct(likeId, userData?._id, product._id)
                                .then(() => {
                                    const { likes } = userData;
                                    setUserData({
                                        ...userData,
                                        likes: likes.filter(like => like._id !== likeId)
                                    })
                                })
                                .catch(err => console.log('A Fucking error happened'))
                            }} />
                            : <FaRegHeart onClick={() => {
                                likeProduct(product._id, userData?._id)
                                .then(like => {
                                    const { likes } = userData;
                                    setUserData({
                                        ...userData,
                                        likes: [...likes, like]
                                    })
                                })
                                .catch(err => console.log(err))
                            }} />
                        : <></>
                    }
                    <div className={style.productComponentBody}>
                        <label 
                        style={{ background: categoryColors[selectedCategory] }}
                        >${ product.price }.00
                        </label>
                        <h3>{ product.name }</h3>
                        <h6>{ product.category }</h6>
                        <Link href={`/Pages/Categories/${product._id}`}>
                            <a
                            style={{
                                border: `solid 2px ${extractColorFromString(categoryColors[selectedCategory])}`,
                                color: extractColorFromString(categoryColors[selectedCategory]), 
                                background: 'white'
                            }}
                            >Go To Product</a>
                        </Link>
                    </div>
                </Fragment>
            )
            : <></>
        }
        </div>
    )
}

export default ProductCard;