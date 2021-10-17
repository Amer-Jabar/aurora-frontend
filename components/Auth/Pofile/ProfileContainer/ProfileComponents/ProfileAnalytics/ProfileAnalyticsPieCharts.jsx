import { useEffect } from 'react';

import { BsCircle } from 'react-icons/bs'
import createPieChart from '../../../../../../helper/auth/profile/profileContainer/profileAnalytics/createPieChart';

import style from '../../../../../../styles/Profile.module.sass';


const ProfileAnalyticsPieCharts = ({ userProps }) => {

    const { deposit, earnedMoney, spentMoney, totalMoneyExchange } = userProps;

    useEffect(() => {

        const labels = ['Deposit', 'Spent Money', 'Earned Money', 'Total Exchange'];
        const values = [deposit, spentMoney, earnedMoney, totalMoneyExchange];

        createPieChart(values, labels)
        .then(pieChart => pieChart.render())
        .catch(err => console.log('Bad Rendering...'));

    }, [])

    return (
        <section id='analyticsSectionOne'>
            <div className={style.pieChartDescriptionContainer}>
                <div>
                    <span><BsCircle /></span>
                    <h2>Total Exchange</h2>
                    <p>${ totalMoneyExchange }</p>
                </div>
                <div>
                    <span><BsCircle  /></span>
                    <h2>Spent Money</h2>
                    <p>${ spentMoney }</p>
                </div>
                <div>
                    <span><BsCircle  /></span>
                    <h2>Earned Money</h2>
                    <p>${ earnedMoney }</p>
                </div>
            </div>
            <div className={style.pieChartContainer}>
                <div id='analyticsPieChart'></div>
            </div>
        </section>
    )
}


export default ProfileAnalyticsPieCharts;