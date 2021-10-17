import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { MdError } from 'react-icons/md';

import Navbar from '../../../../components/Partials/Navbar';
import purchaseProductAction from '../../../../helper/category/categoryView/item/shop/purchaseProductAction';

import style from '../../../../styles/ItemShop.module.sass';


const Shop = ({ props }) => {

    const [purchaseStatus, setPurchaseStatus] = useState({
        loading: false,
        success: false,
        error: false
    });
    const [entity, setEntity] = useState(1);

    const { userInfo } = useSelector(state => state.User);

    const PurchaseButton = () => {
        if ( purchaseStatus.loading )
            return <button className={style.purchaseLoading}><AiOutlineLoading3Quarters /></button>
        else if ( purchaseStatus.success )
            return (
                <button className={style.purchaseSuccess}>
                    <IoCheckmarkCircleOutline />
                    <p>Purchased</p>
                </button>
            )
        else if ( purchaseStatus.error )
            return (
                <button className={style.purchaseError}
                onClick={() => setPurchaseStatus({
                    ...purchaseStatus,
                    error: false
                })}>
                    <MdError />
                    <p>Try Again</p>
                </button>
            )
        else
            return (
                <button
                onClick={() => {
                    setPurchaseStatus({
                        ...purchaseStatus,
                        loading: true
                    })

                    purchaseProductAction(userInfo?._id, props?.owner?._id, props?._id, entity, props?.price)
                    .then((resolved) => setPurchaseStatus({
                        ...purchaseStatus,
                        loading: false,
                        success: true
                    }))
                    .catch(err => setPurchaseStatus({
                        ...purchaseStatus,
                        loading: false,
                        error: true
                    }))
                }}>Confirm Purchase</button>
            )
    }

    return (
        <div className={style.shopContainer}>
            <Head>
                <title>Purchase Product</title>
                <meta 
                name='description' 
                content='Purchase product with applied filters.'
                key='desc'
                />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            </Head>
            <Navbar></Navbar>
            <div className={style.shopBody}>
                {
                    userInfo
                    ? (
                        <div className={style.purchaseCard}>
                            <h2>Purchase action needs verification.</h2>
                            <section className={style.userInfo}>
                                <p>Buyer: { userInfo?.username }</p>
                            </section>
                            <section className={style.productInfo}>
                                <p>Name: { props.name }</p>
                                <p>Category: { props.category }</p>
                                <p>Price: { props.price }$</p>
                                <div className={style.productEntitySelector}>
                                    <div>
                                        <p>Entity: </p>
                                        <select onChange={({ target }) => setEntity(target.value)}>
                                        {
                                            Array.from({ length: props.entity }, (_, index) => <option key={index} value={index + 1}>{ index + 1 }</option>)
                                        }
                                        </select>                                        
                                    </div>
                                </div>
                                <div className={style.productTotalPrice}>
                                    Total Price: { Number(entity * props.price).toFixed(2) }$
                                </div>
                            </section>
                            <section className={style.paymentMethod}>
                                <hr />
                                <div className={style.paymentMethodButtons}>
                                    <PurchaseButton />
                                </div>
                            </section>
                        </div>
                    )
                    : <div className={style.authenticationIssueMessage}>You Must Log In First!</div>
                }
            </div>
        </div>
    )
}

Shop.getInitialProps = async (context) => {
    
    const itemId = context.query?.ItemId;

    let props;

    try {
        props = await axios.get(`http://localhost:4445/api/products/${itemId}`);
    } catch (e) {
        props = null;
    }

    return {
        props: props.data
    };
}

export default Shop;