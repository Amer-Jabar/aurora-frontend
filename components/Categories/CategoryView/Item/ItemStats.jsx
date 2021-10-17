import Link from 'next/link';
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { BsFillHeartFill, BsCheckAll } from 'react-icons/bs';
import { FaRegHeart } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';

import userPurchasedProduct from '../../../../helper/category/categoryView/item/userPurchasedProduct';
import { likeProduct, dislikeProduct } from '../ProductCard';

import style from '../../../../styles/Categories.module.sass';


const ItemStats = ({ ownerId, productId, likesCount, likes = [], views = 0, buyer = [], entity }) => {

    const [likeState, setLikeState] = useState(likes);
    const [likesCountState, setLikesCountState] = useState(likesCount);

    const { userInfo } = useSelector(state => state.User);

    const likeStatus = () => {
        let liked = false;
        likeState?.forEach(like => like?.user === userInfo?._id ? liked = true : null);
        return liked;
    };
    const purchaseStatus = userPurchasedProduct(buyer, userInfo?._id || null);

    useEffect(() => {}, [likeState]);

    return (
        <Fragment>
            {
            !userInfo
            ? (
                <div 
                className={style.itemStatsPart}>
                    <FaRegHeart />
                    <p>{ likesCountState }</p>
                </div>
            )
            : (
                <Fragment>
                    {
                        !likeStatus()
                        ? (
                            <div 
                            className={style.itemStatsPart} 
                            style={{ cursor: userInfo && userInfo._id !== ownerId ? 'pointer' : '' }}
                            onClick={() => {
                                if ( userInfo && userInfo._id === ownerId )
                                    return;
                                
                                likeProduct(productId, userInfo._id)
                                .then(like => like._id)
                                .then(likeId => {
                                    setLikeState([...likeState, 
                                            {
                                            _id: likeId,
                                            user: userInfo._id,
                                            product: productId,
                                            createdAt: new Date().toISOString(),
                                            __v: 0
                                        }
                                    ])
                                    setLikesCountState(Number(likesCountState) + 1)
                                })
                                .catch(err => console.log(err));
                            }}
                            >
                                <FaRegHeart />
                                <p>{ likesCountState }</p>
                            </div>
                        )
                        : (
                            <div 
                            className={style.itemStatsPart} 
                            style={{ cursor: userInfo && userInfo._id !== ownerId ? 'pointer' : '' }}
                            onClick={() => {
                                if ( userInfo && userInfo._id === ownerId )
                                    return;

                                let likeId = null;
                                likeState.forEach(like => like.user === userInfo?._id ? likeId = like._id : null);
                                dislikeProduct(likeId, userInfo._id, productId)
                                .then(dislikeResponse => {
                                    const updatedLikeState = likeState.filter(like => like._id !== dislikeResponse._id);
                                    setLikeState([...updatedLikeState])
                                    setLikesCountState(Number(likesCountState) - 1)
                                })
                                .catch(err => console.log(err));
                            }}
                            >
                                <BsFillHeartFill />
                                <p>{ likesCountState }</p>
                            </div>
                        )
                    }
                </Fragment>
            )             
            }
            <div className={style.itemStatsPart}>
                <AiOutlineEye />
                <p>{ views }</p>
            </div>
            {
                ownerId === userInfo?._id || entity === 0
                ? <></>
                : (
                    <div className={style.itemStatsPart}>
                        <Link href={`/Pages/Categories/${productId}/Shop`} passHref>
                            <a>
                            {
                                purchaseStatus
                                ? <BsCheckAll />
                                : (
                                    <Fragment>
                                        <FiShoppingCart />
                                        <p>Purchase</p>
                                    </Fragment>
                                )
                            }
                            </a>
                        </Link>
                    </div>
                )
            }
        </Fragment>
    )
}

export default ItemStats;