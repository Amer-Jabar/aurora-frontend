import Image from 'next/image';

import categoriesLib from '../../pages/api/categories.json'

import style from '../../styles/Categories.module.sass';


export const categoryColors = [
    'linear-gradient(45deg, #9d658c, #7F3F6B)',
    'linear-gradient(45deg, #C7E923, #aecf0e)',
    'linear-gradient(45deg, #c08672, #A25337)',
    'linear-gradient(45deg, #7a38bc, #531593)',
    'linear-gradient(45deg, #7cae82, #55845B)',
    'linear-gradient(45deg, #D874B7, #bd5099)',
    'linear-gradient(45deg, #86a5d5, #5674A3)',
    'linear-gradient(45deg, #499e3c, #1D5E13)',
    'linear-gradient(45deg, #ae4a2b, #862609)'
]

const CategoryBar = ({ selectedCategory, setSelectedCategory, setSortedBy, setCategoryData, setError }) => (
    <div className={style.categoryBar}>
        <h2>Categories</h2>
        <div className={style.categorySelectorContainerScroller}>
            <div
            className={style.categorySelectorContainer} 
            id='categorySelectorContainer'>
                <div 
                className={style.categorySelectorContainerBackground}
                id='categorySelectorContainerBackground' 
                />
                {
                    categoriesLib.categories.map(({ title: categoryTitle, image }, index) => (
                        <div
                        className={style.categoryCard} 
                        key={index}
                        onClick={() => {
                            if ( selectedCategory === index )
                                return;
                            
                            setSelectedCategory(index);
                            setSortedBy('default');
                            setError(false);
                            setCategoryData(null);
                        }}>
                            <div style={{ padding: '0em 1.5em' }}>
                                <Image 
                                src={`/Categories/${image}`} 
                                width='200' 
                                height='150' 
                                alt='category image' 
                                />
                            </div>
                            <p style={{ background: categoryColors[index] }}>{ categoryTitle }</p>
                        </div>
                    ))
                }
            </div>                
        </div>
    </div>
)

export default CategoryBar;