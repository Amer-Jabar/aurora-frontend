import { useState } from 'react';

import style from '../../../../styles/Categories.module.sass';


const ItemDetailSpecs = ({ dimensions, details }) => {

    const [selectedSpec, setSelectedSpec] = useState({ detail: false, dimensions: false });

    const selectedSpecStyle = { 
        paddingInline: '4em',
        color: 'white', 
        background: '#2f2f2f', 
        fontWeight: 600,
    };

    return (
        <div className={style.itemDetailSpecs}>
            <div className={style.itemDetailSpecsBar}>
                <span
                style={ selectedSpec.detail ? selectedSpecStyle : {}}
                onClick={() => setSelectedSpec({
                    detail: true, dimensions: false
                })}
                >
                    Dimensions
                </span>
                <span
                style={ selectedSpec.dimensions ? selectedSpecStyle : {}}
                onClick={() => setSelectedSpec({
                    detail: false, dimensions: true
                })}
                >
                    Details
                </span>
            </div>
            {
                selectedSpec.dimensions
                ? (
                    <div className={style.selectedItemDetailSpecsBody}>
                        <label>Dimensions</label>
                        <div className={style.itemSpecBodyList}>
                        {
                            dimensions.length > 0
                            ? dimensions.map((dimension, index) => <p key={index}>{ dimension }</p>)
                            : <p>There are no dimensions</p>
                        }
                        </div>
                    </div>
                )
                :
                selectedSpec.detail
                ? (
                    <div className={style.selectedItemDetailSpecsBody}>
                        <label>Details</label>
                        <div className={style.itemSpecBodyList}>
                        {
                            details.length > 0
                            ? details.map((detail, index) => <p key={index}>{ detail }</p>)
                            : <p>There are no details</p>
                        }
                        </div>
                    </div>
                )
                : (
                    <div className={style.unselectedItemDetailSpecsBody}>
                        <p>Please choose a spec.</p>
                    </div>
                )
            }
        </div>
    )
}

export default ItemDetailSpecs;