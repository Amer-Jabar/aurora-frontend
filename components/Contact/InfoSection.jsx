import Image from 'next/image';
import { ImLocation, ImPhone } from 'react-icons/im';
import { MdEmail } from 'react-icons/md';
import { FaFacebook } from 'react-icons/fa';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { RiInstagramFill } from 'react-icons/ri';

import messagingIllustration from '../../public/Contact/messaging illustration.png'

import style from '../../styles/Contact.module.sass'


const InfoSection = () => {
    return (
        <section className={style.infoSection}>
            <div className={style.infoSectionImage}>
                <Image
                src={messagingIllustration}
                layout='fill'
                quality={100}
                alt='messaging illustration'
                />
            </div>
            <div className={style.infoSectionDetails}>
                <div className={style.locationDetails}>
                    <section>
                        <ImLocation />
                        <p>501 Dartmouth West Avenue, CA 99540, United States</p>
                    </section>
                    <section>
                        <ImPhone />
                        <p>(+964) - (751-137-93-94)</p>
                    </section>
                    <section>
                        <MdEmail />
                        <p>Amerjabar0000@gmail.com</p>
                    </section>
                </div>
                <div className={style.socialMediaIcons}>
                    <FaFacebook />
                    <AiFillTwitterCircle />
                    <RiInstagramFill />
                </div>
                <div></div>
            </div>
        </section>
    )
}

export default InfoSection;