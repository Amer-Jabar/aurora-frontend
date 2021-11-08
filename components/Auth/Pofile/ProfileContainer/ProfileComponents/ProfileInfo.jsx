import { useCallback } from 'react';
import { MdStars } from 'react-icons/md';
import { AiFillEdit } from 'react-icons/ai';

import ProfileImageComponent from '../Components/ProfileImageComponent';

import style from '../../../../../styles/Profile.module.sass';


const propertyTable = ['Username', 'Email', 'Address', 'Phone', 'ZIP'];

const ProfileInfo = ({ props, forms, setForms, setDescriptiveIndex, isLoggedInUser }) => {

    const { _id, username, email, image, address, phone, ZIP, transactions, products, reviews } = props;

    const TransactionsComponent = useCallback(() => <div className={style.profileInfoWidget}><span>{ transactions?.length || 0 }</span><p>Transactions</p></div>, [transactions])
    const ProductsComponent = useCallback(() => <div className={style.profileInfoWidget}><span>{ products?.length || 0 }</span><p>Products</p></div>, [products])
    const ReviewsComponent = useCallback(() => <div className={style.profileInfoWidget}><span>{ reviews?.length || 0 }</span><p>Reviews</p></div>, [reviews])

    const ProfileImage = ProfileImageComponent(0, _id, image, 75);

    return (
        <div className={style.profileInfoComponent} id='beautifyScrollbar'>
            <div className={style.profileInfoComponentHeader}>
                <ProfileImage />
                <label>ID: { _id }</label>
                <h3>{ username } { <MdStars /> }</h3>
                <div className={style.profileInfoWidgetContainer}>
                    <TransactionsComponent></TransactionsComponent>
                    <ProductsComponent></ProductsComponent>
                    <ReviewsComponent></ReviewsComponent>
                </div>
            </div>
            <div className={style.profileInfoComponentHeader}>
                {
                    [username, email, address, phone, ZIP].map((property, index) => {
                        return (
                            <div className={style.profileInfoDescriptive} key={index}>
                                <label>{ propertyTable[index] }</label>
                                <p>
                                    { property ? property : '........' }
                                    {
                                        isLoggedInUser
                                        ? (
                                            <AiFillEdit onClick={() => {
                                                setDescriptiveIndex(index);
                                                setForms({
                                                    ...forms,
                                                    descriptive: true
                                                })
                                            }}/>
                                        )
                                        : <></>
                                    }
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ProfileInfo;