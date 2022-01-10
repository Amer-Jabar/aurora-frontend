import { useState, useEffect } from 'react';

import createForecastDashboard, { firstToUpper } from '../../../../../../helper/auth/profile/profileContainer/profileAnalytics/createForecastDashboard';
import fetchAnalyticProps from '../../../../../../helper/auth/profile/profileContainer/profileAnalytics/fetchAnalyticProps';
import { arrangeWeeklyData } from '../../../../../../helper/auth/profile/profileContainer/profileAnalytics/arrangeWeeklyData';

import style from '../../.././../../../styles/Profile.module.sass';


const analyticsPropertyNameTable = ['transactions', 'products', 'likes', 'reviews', 'activities'];

const ProfileAnalyticsForecastComponent = ({ userProps }) => {

    const [mounted, setMounted] = useState(false);
    const [forecastIndex, setForecastIndex] = useState(-1);
    const [chart, setChart] = useState(null);

    const { _id, transactions, products, likes, reviews, activities } = userProps;
    const propertyMap = {
        0: transactions,
        1: products,
        2: likes,
        3: reviews,
        4: activities
    }

    useEffect(() => {}, [userProps, mounted, forecastIndex]);

    return (
        <section id='analyticsSectionTwo'>
            <div className={style.profileAnalyticsForecastSelector} id='analyticsForecastSelector'>
                {
                    analyticsPropertyNameTable.map((propertyName, index) => (
                        <label key={index}
                        style={ 
                            forecastIndex === index 
                            ? { paddingInline: '2em', color: 'white', backgroundColor: 'rgb(105 153 199)' } 
                            : {} 
                        }
                        onClick={() => {
                            if ( !mounted && !chart ) {

                                fetchAnalyticProps(_id, propertyName, propertyMap[index])
                                .then(response => {
                                    const forecastData = arrangeWeeklyData(response)
                                    createForecastDashboard(forecastData, propertyName)
                                    .then(chart => {
                                        if ( chart?.el ) {
                                            chart.render();
                                            setChart(chart)    
                                        }
                                    })
                                    .catch(() => {});
                                }).finally(() => {
                                    setMounted(true)
                                    setForecastIndex(index)
                                })

                            } else if ( mounted && chart ) {

                                fetchAnalyticProps(_id, propertyName, propertyMap[index])
                                .then(response => {
                                    const forecastData = arrangeWeeklyData(response)
                                    chart.updateOptions({
                                        series: [{
                                            name: firstToUpper(propertyName),
                                            data: forecastData
                                        }],
                                        title: {
                                            text: firstToUpper(propertyName),
                                            align: 'center'
                                        }
                                    })
                                }).finally(() => setForecastIndex(index))
                            }

                        }}
                        >{ firstToUpper(propertyName) }</label>
                    ))
                }
            </div>
            <div className={style.profileAnalyticsForecastContainer}>
                {
                    !mounted
                    ? <div className={style.profileAnalyticsForecastSuggester}>Please choose a property...</div>
                    : <></>
                }
                <div id='analyticsForecastChart'></div>
            </div>
        </section>
    )
}

export default ProfileAnalyticsForecastComponent;