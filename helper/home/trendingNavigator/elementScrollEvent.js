const elementScrollEvent = (elementId, error, rightLimit) => {

    if ( error )
        return;

    const trendingProductContainer = document.querySelector(`#${elementId}`);
    let timeoutId = null;

    trendingProductContainer.onmousewheel = ({ deltaX }) => {

        const pxToMargin = deltaX * -1;
        const clientMargin = Number(trendingProductContainer.style.marginLeft.split('e')[0]) * 16;

        const freezeLeftMargin = (-1 * clientMargin / 16) > 75 && deltaX > 0;

        if ( (pxToMargin + clientMargin) <= 0 && !freezeLeftMargin ) {
            const marginLeft = `${((pxToMargin + clientMargin) / 16)}em`;
            trendingProductContainer.style.setProperty('margin-left', marginLeft, 'important');            
        }
    }

    trendingProductContainer.onmouseenter = () => clearTimeout(timeoutId);
    trendingProductContainer.onmouseleave = () => {
            timeoutId = setTimeout(() => {
                trendingProductContainer.style.setProperty('margin-left', '0em', 'important');
            }, 5000);
    }
}

export default elementScrollEvent;