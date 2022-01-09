const setResponsiveNavbar = () => {
    const navbar = document.querySelector('#navbar');
    navbar.style.setProperty('width', '90%', 'important');
    navbar.style.setProperty('top', '-8em', 'important');
    navbar.style.setProperty('margin-inline', '5%', 'important');
    navbar.style.setProperty('border-radius', '5em', 'important');
}

export default setResponsiveNavbar;