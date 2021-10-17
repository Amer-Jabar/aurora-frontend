import Head from 'next/head';

import Navbar from '../../components/Partials/Navbar';
import MessageForm from '../../components/Contact/MessageForm'
import InfoSection from '../../components/Contact/InfoSection'

import style from '../../styles/Contact.module.sass'


const Contact = () => {

    return (
        <div className={style.contact}>
            <Head>
                <title>Aurora Contact</title>
                <meta 
                name='description' 
                content='Aurora E-Commerce websites help page. You can contact us the easiest way.'
                key='desc'
                />
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            </Head>
            <Navbar></Navbar>
            <div className={style.contactBodyContainer}>
                <MessageForm></MessageForm>
                <InfoSection></InfoSection>
            </div>
        </div>
    )
}

export default Contact;