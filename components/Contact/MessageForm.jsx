import { Fragment, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import { MdError } from 'react-icons/md';

import style from '../../styles/Contact.module.sass';


const submittedButtonStyle = {
    backgroundColor: '#42c762',
    borderColor: '#4ed36e',
    boxShaow: '0px 10px 15px -10px #39be59',
    pointerEvents: 'none'
}

const submitErrorButtonStyle = {
    backgroundColor: 'rgb(199 66 66)',
    borderColor: 'rgb(134 27 27)',
    boxShaow: '0px 10px 15px -10px #d44949'
}

const MessageForm = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

    const [buttonLoading, setButtonLoading] = useState(false);
    const [messageSubmitted, setMessageSubmitted] = useState(false);
    const [messageSubmitError, setMessageSubmitError] = useState(false);

    const submitMessage = () => {

        if ( messageSubmitError )
            return setMessageSubmitError(false);

        const { current: nameElement } = nameRef;
        const { current: emailElement } = emailRef;
        const { current: messageElement } = messageRef;
        
        setButtonLoading(true);
        axios.post(`/api/server/messages`, {
            username: nameElement.value,
            email: emailElement.value,
            message: messageElement.value
        })
        .then(() => setMessageSubmitted(true))
        .catch((e) => setMessageSubmitError(true))
        .finally(() => {
            nameElement.value = '';
            emailElement.value = '';
            messageElement.value = '';

            setButtonLoading(false);
        })
    }

    useEffect(() => {}, [buttonLoading, messageSubmitted, messageSubmitError])

    return (
        <div className={style.messageForm}>
            <div className={style.messageFormHeader}>
                <h1>Contact Us</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis consectetur sunt mollitia consequuntur deleniti rem autem accusamus harum, temporibus sequi.</p>
            </div>
            <div className={style.messageFormContainer}>
                <label>Your Name</label>
                <input 
                type='text' 
                ref={nameRef}
                />
                <label>Your Email</label>
                <input 
                type='text' 
                ref={emailRef}
                />
                <label>Your Message</label>
                <textarea 
                rows='10' 
                ref={messageRef}
                />
                <button
                style={ 
                    messageSubmitted 
                    ? submittedButtonStyle 
                    : 
                    messageSubmitError
                    ? submitErrorButtonStyle
                    : {}
                }
                onClick={submitMessage}>
                    { 
                        buttonLoading
                        ? <AiOutlineLoading3Quarters className={style.messageButtonLoading} />
                        : 
                        messageSubmitted
                        ? (
                            <Fragment>
                                <IoCheckmarkCircleOutline />
                                <p>Message sent</p>
                            </Fragment>
                        )
                        :
                        messageSubmitError
                        ? (
                            <Fragment>
                                <MdError />
                                <p>Try Again</p>
                            </Fragment>
                        )
                        : <p>Send a message</p>
                    }
                </button>
            </div>
        </div>
    )
}

export default MessageForm;