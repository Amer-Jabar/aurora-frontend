import Image from 'next/image';
import { useCallback } from 'react';

import profileBlankImage from '../../../../../public/Auth/default-avatar-profile-icon-vector-18942381.jpg';

import style from '../../../../../styles/Profile.module.sass';


const ProfileImageComponent = (key = '0', userId, imageId, size) => useCallback(() => 
    imageId
    ? (
        <div className={style.profileImageContainer}>
            <Image
            key={key}
            loader={({ src }) => src}
            src={`/api/server/users/${userId}/image`}
            width={ size ? size : 50}
            height={ size ? size : 50}
            alt='null'
            quality={15}
            priority={true}
            loading='eager'
            ></Image>
        </div>
    )
    : (
        <div className={style.profileImageContainer}>
            <Image
            key={key}
            src={profileBlankImage}
            width={ size ? size : 50}
            height={ size ? size : 50}
            alt='blank profile image'
            quality={10}
            >
            </Image>
        </div>
    )
, [key, userId, imageId, size])

export default ProfileImageComponent;