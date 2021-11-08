import moment from 'moment';
import { BiCreditCardAlt } from 'react-icons/bi';
import { FiBox } from 'react-icons/fi';
import { MdFavoriteBorder, MdRateReview } from 'react-icons/md';

import style from '../../../../../../styles/Profile.module.sass';


export const adjustDate = (date) => {

    const stamp = new Date(date).getTime();
    const [month, day, year] = new Date(stamp).toLocaleString().split(', ')[0].split('/');
    const [hour, minute, second] = new Date(stamp).toTimeString().split(' ')[0].split(':');

    const currentStamp = Date.now();
    const [currentMonth, currentDay, currentYear] = new Date(currentStamp).toLocaleString().split(', ')[0].split('/');
    const [currentHour, currentMinute, currentSecond] = new Date(currentStamp).toTimeString().split(' ')[0].split(':');

    const dateTimeToPreview = moment()
                                .subtract(currentYear - year, 'year')
                                .subtract(currentMonth - month, 'month')
                                .subtract(currentDay - day, 'day')
                                .subtract(currentHour - hour, 'hour')
                                .subtract(currentMinute - minute, 'minute')
                                .subtract(currentSecond - second, 'second')
                                .calendar();
    
    return dateTimeToPreview;
}

const ActivityDescription = (activityData, userId, key) => {

    const activityPropsTable = ['Transaction', 'Product', 'Like', 'Review']
    const { originalActivity } = activityData;
    const { product, seller, buyer } = originalActivity || {};

    const { activityName, createdAt: unadjustedDateTime } = activityData || {};

    const date = adjustDate(unadjustedDateTime);

    let RenderedComponent = null;

    switch ( activityName ) {
        //Transaction Activity
        case activityPropsTable[0]:
            RenderedComponent = (
                <div className={style.activityElement} key={key}>
                    <div><BiCreditCardAlt style={{ backgroundColor: 'rgb(30, 144, 255)' }} /></div>
                    <label>You did a transaction with { 
                            seller?._id === userId 
                            ? buyer?.username 
                            : seller?.username 
                        } - { date }
                    </label>
                </div>
            )
            break;
        //Product Adding Activity
        case activityPropsTable[1]:
            RenderedComponent = (
                <div className={style.activityElement} key={key}>
                    <div><FiBox style={{ backgroundColor: 'rgb(0, 139, 139)' }} /></div>
                    <label>You added a product by name { originalActivity?.name } in { originalActivity?.category } category - { date }</label>
                </div>
            )
            break;
        //Like Activity
        case activityPropsTable[2]:
            RenderedComponent = (
                <div className={style.activityElement} key={key}>
                    <div><MdFavoriteBorder style={{ color: 'rgb(177, 44, 44)', backgroundColor: 'whitesmoke' }} /></div>
                    <label>You liked { product?.owner?.username }`s product { product?.name } in { product?.category } category - { date }</label>
                </div>
            )
            break;
        //Review Activity
        case activityPropsTable[3]:
            RenderedComponent = (
                <div className={style.activityElement} key={key}>
                    <div><MdRateReview style={{ backgroundColor: 'rgb(201, 203, 67)' }} /></div>
                    <label>You reviewed product { product.name } in { product.category } - { date }</label>
                </div>
            )
            break;
    }

    return RenderedComponent;
}

export default ActivityDescription;