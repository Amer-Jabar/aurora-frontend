export const setHeightFull = () => {
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    const next = document.querySelector('#__next');

    [html, body, next].forEach((element) => element.style.height = '100%')
}

export const fullHeightMap = () => {
    const main = document.querySelector('main');
    main.style.height = '100%';
}