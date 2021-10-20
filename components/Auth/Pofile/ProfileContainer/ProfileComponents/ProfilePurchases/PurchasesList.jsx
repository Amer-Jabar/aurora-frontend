import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';

import { adjustDate } from '../ProfileActivities/ActivityDescription';

import style from '../../../../../../styles/Profile.module.sass';


const PurchaseList = ({ userPurchases }) => {
    console.log(userPurchases);
    return (
        <Fragment>
            { 
            userPurchases && userPurchases.map((purchase, index) => (
                <div className={style.userPurchaseCardContainer} key={index}>
                    <div className={style.purchaseCardDividor}>
                        <Image
                        alt='product image'
                        src={`http://localhost:4445/api/products/${purchase?.product?._id}/image`}
                        width={150}
                        height={135}
                        layout='fixed'
                        quality={20}
                        />
                        <div className={style.userPurchaseCardInfo}>
                            <div>
                                <p className={style.purchaseInfoLabel}>Product Name</p>
                                <p className={style.purchaseInfoValue}>{ purchase?.product?.name }</p>
                            </div>
                            <p className={style.purchaseCardInfoCategory}>{ purchase?.product?.category }</p>
                        </div>
                    </div>
                    <div className={style.purchaseCardDividor}>
                        <span className={style.verticalLine}></span>
                        <div className={style.userPurchaseCardInfo}>
                            <div>
                                <p className={style.purchaseInfoLabel}>Seller</p>
                                <p className={style.purchaseInfoValue}>{ purchase?.seller?.username }</p>
                            </div>
                            <div>
                                <p className={style.purchaseInfoLabel}>Payment Amount</p>
                                <p className={style.purchaseInfoValue}>{ purchase?.payment }$</p>
                            </div>
                        </div>
                        <span className={style.verticalLine}></span>
                        <div className={style.userPurchaseCardInfo}>
                            <div>
                                <p className={style.purchaseInfoLabel}>Entity</p>
                                <p className={style.purchaseInfoValue}>{ purchase?.productEntity || 0 }</p>
                            </div>
                            <div>
                                <p className={style.purchaseInfoLabel}>Date</p>
                                <p className={style.purchaseInfoValue}>{ adjustDate(purchase?.createdAt) }</p>
                            </div>
                        </div>
                    </div>
                    <div className={style.purchaseCardDividor}>
                        <Link href={`/Pages/Categories/${purchase?.product?._id}`}><a>Go To Product</a></Link>
                    </div>
                </div>
            ))
            } 
        </Fragment>
    )
}

export default PurchaseList; 