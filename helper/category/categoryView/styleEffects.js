export const extractColorFromString = (string) => string?.split(',')[2].replace(")", "").replace(" ", "");

export const linkMouseOver = ({ target }, backgroundColor) => {
    target.style.color = 'white';
    target.style.background = backgroundColor;
}

export const linkMouseLeave = ({ target }, backgroundColor) => {
    target.style.color = extractColorFromString(backgroundColor);
    target.style.background = 'white';
}
