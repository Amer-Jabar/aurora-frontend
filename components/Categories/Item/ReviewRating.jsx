import { AiTwotoneStar } from 'react-icons/ai';

import style from '../../../styles/Categories.module.sass';


const ReviewRating = ({ value }) => (
    <div className={style.reviewRatingComponent}>
    {
    Array.from({ length: 5 }).map(
        (v, i) => (
            i < value 
            ? <AiTwotoneStar color='gold' />
            : <AiTwotoneStar color='aliceblue' />
        ))
    }
    </div>
)

export default ReviewRating;