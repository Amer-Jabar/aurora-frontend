import reviewFormPopupEffect from "./reviewFormPopupEffect";

const createIO = () => {
    const io = new IntersectionObserver((entry) => {
        if ( entry[0].isIntersecting )
            reviewFormPopupEffect();
    });

    return io;
}

export default createIO;