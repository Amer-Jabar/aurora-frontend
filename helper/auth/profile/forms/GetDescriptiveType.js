
export const descriptiveTable = ['Username', 'Email', 'Address', 'Phone', 'ZIP']

export const GetDescriptiveType = (props, descriptiveIndex) => {
    let property = null;

    switch ( descriptiveIndex ) {
        case 0:
            property = props.username
            break;
        case 1:
            property = props.email
            break;
        case 2:
            property = props.address
            break;
        case 3:
            property = props.phone
            break;
        case 4:
            property = props.ZIP
            break;                                  
    }

    return property;
};