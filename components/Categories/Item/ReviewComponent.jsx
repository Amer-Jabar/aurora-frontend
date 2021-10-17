import { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IoCloseOutline } from 'react-icons/io5';

import ReviewComponentList from './ReviewComponentList';
import ReviewRatingForm from './ReviewRatingForm';
import hideReviewAddForm from '../../../helper/category/categoryView/item/hideReviewAddForm';
import createIO from '../../../helper/category/categoryView/item/createIO';
import addReview from '../../../helper/category/categoryView/item/addReview';

import style from '../../../styles/Categories.module.sass';


const ReviewComponent = ({ ownerId, productId, reviews, setReviews, setReviewSectionToggled }) => {

    const [addReviewForm, setAddReviewForm] = useState(false);
    const [io, setIO] = useState(null);

    const [reviewRating, setReviewRating] = useState(0);
    const [reviewContent, setReviewContent] = useState(null);

    const { userInfo } = useSelector(state => state.User);
    const userId = userInfo?._id;

    useEffect(() => {
        if ( !io )
            setIO(createIO());
        else {
            const reviewAddForm = document.querySelector('#reviewAddForm');
            if ( reviewAddForm )
                io.observe(reviewAddForm);
        }
        
    }, [reviews, addReviewForm, io]);

    return (
        <Fragment>
            <IoCloseOutline
            className={style.reviewCloseButton}
            onClick={() => setReviewSectionToggled(false)}
            />
            <div className={style.reviewsHeader}>
                <h1>Reviews</h1>
            </div>
            <div className={style.reviewBody}>
                {
                    userId
                    ? 
                    addReviewForm
                    ? (
                        <div className={style.reviewAddForm} id='reviewAddForm'>
                            <label>Add review *</label>
                            <div className={style.reviewFormBody}>
                                <ReviewRatingForm setRating={setReviewRating} />
                                <textarea cols='30' rows='8' onChange={({ target }) => setReviewContent(target.value)}></textarea>
                                <div className={style.reviewButtons}>
                                    <button
                                    onClick={() => 
                                        addReview(ownerId, productId, userId, reviewContent, reviewRating)
                                        .then(newReview => setReviews([...reviews, newReview]))
                                        .catch(err => console.log(err))
                                        .finally(() => setAddReviewForm(false))
                                    }
                                    >Add</button>
                                    <button onClick={() =>
                                        hideReviewAddForm()
                                        .catch(err => console.log(err))
                                        .finally(err => setAddReviewForm(false))
                                    }>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )
                    : <button className={style.showReviewFormButton} onClick={() => setAddReviewForm(true)}>Add Review</button>
                    : <></>
                }
                <hr />
                <div className={style.reviewList}>
                    <ReviewComponentList
                    userId={userId}
                    reviews={reviews}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default ReviewComponent;