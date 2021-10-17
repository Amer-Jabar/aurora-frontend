export const observeNavbarIntersection = () => {  
    
    if ( !document )
        return;
    
    const header = document.querySelector('#header');
    const io = new IntersectionObserver((entry) => {
        const { intersectionRatio } = entry[0];
        if ( intersectionRatio === 0 )
            navbar.style.paddingBlock = '0.5em';
        else
            navbar.style.paddingBlock = '1.5em';
    })

    io.observe(header);

    return io;
}