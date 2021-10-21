import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import ReviewRating from './ReviewRating';
import { adjustDate } from '../../Auth/Pofile/ProfileContainer/ProfileComponents/ProfileActivities/ActivityDescription'
import blankProfileImage from '../../../public/Auth/default-avatar-profile-icon-vector-18942381.jpg';

import style from '../../../styles/Categories.module.sass';


const ReviewComponentList = ({ reviews }) => {

    return (
        <Fragment>
            {
                reviews && reviews?.length > 0
                ? (
                    <Fragment>
                        {
                            reviews && reviews?.map((review, index) => (
                                <div className={style.reviewElement} key={index}>
                                    {
                                        typeof(review) == 'object'
                                        ? (
                                            <Fragment>
                                                <div className={style.reviewElementImage}>
                                                    <Image
                                                    alt='profile picture for review component'
                                                    src={
                                                        review?.owner?.image
                                                        ? `http://localhost:4445/api/users/${review?.owner?._id}/image`
                                                        : blankProfileImage
                                                    }
                                                    width={100}
                                                    height={100}
                                                    quality={25}
                                                    ></Image>
                                                </div>
                                                <div className={style.reviewBody}>
                                                    <Link href={`/Pages/Auth/${review?.owner?.username}-${review?.owner?._id}`} passHref>
                                                        <a>{ review?.owner?.username }</a>
                                                    </Link>
                                                    <div>
                                                        <p>{ review?.content }</p>
                                                        <ReviewRating value={review?.rating} />
                                                    </div>
                                                    <span>{ adjustDate(review?.createdAt) }</span>
                                                </div>
                                            </Fragment>
                                        )
                                        : (
                                            <div className={style.reviewLoadingSpinner}>
                                                <AiOutlineLoading3Quarters />
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </Fragment>
                )
                : <h4>This product has not been reviewed.</h4>
            }
        </Fragment>
    )
}

export default ReviewComponentList;