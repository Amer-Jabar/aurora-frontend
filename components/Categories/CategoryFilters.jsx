import { categoryColors } from './CategoryBar';
import { firstToUpper } from '../../helper/auth/profile/profileContainer/profileAnalytics/createForecastDashboard'
import { extractColorFromString } from '../../helper/category/categoryView/styleEffects';

import style from '../../styles/Categories.module.sass';


const filters = ['default', 'review', 'view', 'price', 'entity', 'like'];

const CategoryFilters = ({ categoryIndex, setCategoryData, setError, sortedBy, setSortedBy }) => {
    return (
        categoryIndex !== null
        ? (
            <div className={style.categoryFilters}>
            {
                filters.map((filter, index) => (
                    <span key={index}
                    style={
                        sortedBy === filter
                        ? { 
                            color: 'white', background: categoryColors[categoryIndex], 
                            marginLeft: `${ index === 0 ? '4em' : 'none' }` 
                        }
                        : { 
                            color: extractColorFromString(categoryColors[categoryIndex]), background: 'white', 
                            marginLeft: `${ index === 0 ? '4em' : 'none' }` 
                        }
                    }
                    onClick={() => {
                        if ( sortedBy === filter )
                            return;
                            
                        setSortedBy(filter);
                        setError(false);
                        setCategoryData(null);
                    }}
                    >{ firstToUpper(filter) }</span>
                ))
            }
            </div>
        )
        : <></>
    )
}

export default CategoryFilters;