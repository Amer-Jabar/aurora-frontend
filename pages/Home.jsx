import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Navbar from '../components/Partials/Navbar';
import Header from '../components/Home/Header';
import CategoriesNavigator from '../components/Home/CategoriesNavigator';
import TrendingNavigator from '../components/Home/TrendingNavigator';
import { observeNavbarIntersection } from '../helper/home/setNavbarEffects';

import style from '../styles/Home.module.sass';


const Home = () => {

    const { loggedIn } = useSelector(state => state.User);
    const [io, setIO] = useState(null);

    useEffect(() => {
        if ( !io )
            setIO(observeNavbarIntersection());
        
        return () => io && io.disconnect();
    }, [loggedIn, io])

    return(
        <div className={style.container}>
            <Head>
                <title>Aurora E-Commerce</title>
                <meta 
                name='description' 
                content='Aurora E-Commerce website, dilevering the best of furniture to you.'
                key='desc'
                />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            </Head>
            <Navbar></Navbar>
            <Header></Header>
            <CategoriesNavigator></CategoriesNavigator>
            <TrendingNavigator></TrendingNavigator>
        </div>
    )
}

export default Home;