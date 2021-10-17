const getComponentTranslate = (index) => {

    if ( innerWidth <= 768 && innerWidth > 600 ) {
        return index * 32;
    } if ( innerWidth <= 600 && innerWidth > 500 ) {
        return index * 22;
    } if ( innerWidth <= 500 ) {
        return index * 17;
    } else {
        return index * 37;
    }
}

export default getComponentTranslate;