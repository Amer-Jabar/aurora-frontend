const observeIntersection = () => {
    const trendingProductsContainer = document.querySelector('#trendingProductsContainer');
    const io = new IntersectionObserver((entry) => {
        if ( entry[0].isIntersecting ) {
            trendingProductsContainer.style.setProperty('margin-left', '0em', 'important');
            trendingProductsContainer.style.setProperty('opacity', '1', 'important');

            setTimeout(() => trendingProductsContainer.style.transitionDuration = '0.25s', 3000);
        }
    })
    io.observe(trendingProductsContainer);

    return io;
}

export default observeIntersection;