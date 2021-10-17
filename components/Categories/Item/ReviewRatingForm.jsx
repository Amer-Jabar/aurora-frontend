import { useState } from 'react';

import { AiTwotoneStar } from 'react-icons/ai';

import style from '../../../styles/Categories.module.sass';


const ReviewRatingForm = ({ setRating }) => {

    const [stars, setStars] = useState(Array.from({ length: 5 }).map((v => false)));
    const [staticValue, setStaticValue] = useState(0);

    return (
        <div className={style.reviewRatingForm}>
            {
                stars.map((value, index) => 
                    <AiTwotoneStar
                    key={index}
                    color={ value === false ? '#dbe7f1' : 'gold' }
                    onMouseEnter={() => setStars(stars.map((value, innerIndex) => innerIndex <= index ? true : false))}
                    onMouseLeave={() => setStars(Array.from({ length: 5 }).map((v, i) => i < staticValue ? true : false))}
                    onClick={() => {
                        setStaticValue(index + 1);
                        setRating(index + 1);
                    }}
                    />
                )
            }
        </div>
    )
}

export default ReviewRatingForm;