const setHeightFull = () => {
    const main = document.querySelector('main');
    const nextDiv = document.querySelector('#__next');
    const body = document.querySelector('body');
    const html = document.querySelector('html');

    [main, nextDiv, body, html].forEach(element => element.style.height = '100%');
}

export default setHeightFull;