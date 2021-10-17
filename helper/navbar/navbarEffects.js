export const landingStyle = ({ navbar, links }) => {
    navbar.style.height = '80px';
    navbar.style.backgroundColor = '#f6f6f6';
    links.forEach(el => {
        el.style.fontSize = '20px';
        el.style.color = '#313131';
    });
}

export const movingStyle = ({ navbar, links }) => {
    navbar.style.height = '60px';
    navbar.style.backgroundColor = 'rgba(246, 246, 246, 0.85)';
    links.forEach(el => el.style.fontSize = '18px');
}