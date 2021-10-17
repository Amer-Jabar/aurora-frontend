import style from '../../styles/Partials/ProcessLoadingSpinner.module.sass'


const ProcessLoadingSpinner = ({ loading, fillScreen, relative, height }) => {
    if ( !loading )
        return <></>

    let customStyle = null;
    
    if ( fillScreen )
        customStyle = { width: '100%', height: '100%' };
    if ( relative )
        customStyle = { ...customStyle, position: 'relative' };
    if ( height )
        customStyle = { ...customStyle, height: `${height}px` };

    return (
        <div className={style.processLoadingContainer} 
        style={customStyle}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default ProcessLoadingSpinner;