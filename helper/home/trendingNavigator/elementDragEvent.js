const elementDragEvent = (elementId, error, minMargin, maxMargin) => {

    if ( error )
    return;

    const trendingProductContainer = document.querySelector(`#${elementId}`);
    trendingProductContainer.ondragstart = (e) => e.preventDefault();

    let startPosition = 0;
    let prevMargin = 0;

    trendingProductContainer.ontouchstart = (e) => {
        const { clientX } = e.touches[0];
        startPosition = clientX;

        console.log({ minMargin, maxMargin });
    }

    trendingProductContainer.ontouchmove = (e) => {

        const { clientX: currentPosition } = e.touches[0];
        const shiftValue = prevMargin + currentPosition / 15 - startPosition / 15;

        if ( prevMargin > maxMargin && shiftValue > maxMargin || prevMargin < minMargin && shiftValue < minMargin )
            return;

        prevMargin = shiftValue;
        setAnimation(false, trendingProductContainer, shiftValue);
    }

    trendingProductContainer.ontouchend = (e) => {
        if ( prevMargin > maxMargin ) {
            trendingProductContainer.style.marginLeft = `0px`;
            prevMargin = 0;
            startPosition = 0;
        } else if ( prevMargin < minMargin ) {
            trendingProductContainer.style.marginLeft = `${minMargin}px`;
            prevMargin = minMargin + 10;
            startPosition = 0;
        }
    }
}

const setAnimation = (condition, element, shiftValue) => {
    if ( condition )
        element.style.setProperty('margin-left', `${shiftValue}px`, 'important');

    requestAnimationFrame(() => setAnimation(true, element, shiftValue));    
}

export default elementDragEvent;