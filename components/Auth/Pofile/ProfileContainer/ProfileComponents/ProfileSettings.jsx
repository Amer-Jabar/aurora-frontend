import { useState, useLayoutEffect } from 'react';
import { IoIosArrowForward, IoIosCloseCircleOutline } from 'react-icons/io'
import { MdDelete } from 'react-icons/md';

import ProfileImageComponent from '../Components/ProfileImageComponent';
import profileBlankImage from '../../../../../public/Auth/default-avatar-profile-icon-vector-18942381.jpg';

import style from '../../../../../styles/Profile.module.sass';


const ProfileSettings = ({ props, forms, setForms }) => {

    const { _id, image } = props;

    const [showProfileImage, setShowProfileImage] = useState(false);

    useLayoutEffect(() => {
        const backgroundBlur = document.querySelector('#profileBackgroundBlurEffect');
        const prefImageWidth = document.querySelector('#profileSettingsContainer').clientWidth - (10 * 16);
        const profileImageViewContainer = document.querySelector('#profileImageViewer');

        if ( showProfileImage ) {
            backgroundBlur.style.backgroundColor = 'rgb(0, 0, 0, 0.6)';
            backgroundBlur.style.pointerEvents = 'all';
            profileImageViewContainer.style.width = `${prefImageWidth}px`;
        } else {
            backgroundBlur.style.backgroundColor = 'rgb(0, 0, 0, 0)';
            backgroundBlur.style.pointerEvents = 'none';
        }
    }, [props, showProfileImage])

    const ProfileImage = ProfileImageComponent(0, _id, image, 100);

    return (
        <div 
        className={style.profileSettingsContainer}
        id='profileSettingsContainer'
        >
            <section>
                <div onClick={() => setShowProfileImage(true)}>
                    <ProfileImage />
                </div>
                <div className={style.profileImageConfig}>
                    <button
                    onClick={() => setForms({
                        ...forms,
                        uploadImage: true
                    })}>Upload New Photo<IoIosArrowForward color='#8aa7d3' /></button>
                    <button
                    onClick={() => setForms({
                        ...forms,
                        removeImage: true
                    })}>Remove Profile Photo<MdDelete color='#bc5959' /></button>
                </div>
            </section>
            <section>
                <hr />
                <h2>Rights of this website is reserved and must be respected without copyright! the project is under MIT license.</h2>
                <button
                onClick={() => setForms({
                    ...forms,
                    deleteAccount: true
                })}>Delete Acount</button>
            </section>
            {
                showProfileImage
                ? (
                    <div 
                    className={style.profileImageViewer} 
                    id='profileImageViewer'
                    >
                        <IoIosCloseCircleOutline
                        onClick={() => setShowProfileImage(false)} />
                        <img
                        src={ image 
                            ? `/api/server/users/${_id}/image` 
                            : `${profileBlankImage.src}`
                        }
                        alt='profile image'
                        ></img>
                    </div>
                )
                : <></>
            }
        </div>
    );
}

export default ProfileSettings;