import Link from 'next/link';

import style from '../../styles/Home.module.sass';

const Header = () => (
    <div className={style.header} id='header'>
        <section>
            <h1>Top Trending Brands Available Today At Our Shops.</h1>
            <p>Aurora ecommerce brings the most ideal & luxurious type of furniture and home utilities into your house.</p>
            <Link href={`/Pages/Categories`}>
                <a>Categories</a>
            </Link>
        </section>
        <section className={style.headerImage}></section>
    </div>
)

export default Header;