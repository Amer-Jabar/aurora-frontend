const setCategoryHeight = () => {
    const navbar = document.querySelector('#navbar');
    navbar.style.paddingBlock = '1.5em';
    const categoriesContainer = document.querySelector('#categoriesContainer');
    categoriesContainer.style.paddingTop = `${navbar.clientHeight / 16}em `;
}

export default setCategoryHeight;