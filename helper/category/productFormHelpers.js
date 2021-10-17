export const entityOptions = () => {
    let arr = [];
    for ( let i = 1; i <= 25; i++ ) {
        arr.push(i);
    }
    return arr;
}

export const allFieldsAreValid = (name, price, entity, details, dimensions, description, image) => {

    let condition = false;
    if ( name && price && entity && description && image ) {
        let firstCheck = true;
        let secondCheck = true;
        details.forEach(field => field.length > 0 ? null : firstCheck = false);
        dimensions.forEach(field => field.length > 0 ? null : secondCheck = false);

        if ( firstCheck && secondCheck )
            condition = true;
    }

    return condition;
}