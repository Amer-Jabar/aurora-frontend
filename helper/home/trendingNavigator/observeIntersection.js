const observeIntersection = () => {
    const trendingProductsContainer = document.querySelector('#trendingProductsContainer');
    const io = new IntersectionObserver((entry) => {
        if ( entry[0].isIntersecting ) {
            trendingProductsContainer.style.setProperty('margin-left', '0em', 'important');
            trendingProductsContainer.style.setProperty('opacity', '1', 'important');

            setTimeout(() => trendingProductsContainer.style.transitionDuration = '0.25s', 3000);
            setTimeout(() => {
                trendingProductsContainer.style.width = '100%';
                trendingProductsContainer.style.overflowX = 'scroll';
                trendingProductsContainer.style.scrollbarColor = '#ebebeb white';
                trendingProductsContainer.style.scrollbarWidth = 'thin';
            }, 1500);
        }
    })
    io.observe(trendingProductsContainer);

    return io;
}

export default observeIntersection;