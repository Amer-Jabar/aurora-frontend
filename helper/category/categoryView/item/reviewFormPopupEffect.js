const reviewFormPopupEffect = () => {
    const reviewAddForm = document.querySelector('#reviewAddForm');
    if ( !reviewAddForm )
        return;

    reviewAddForm.style.marginTop = '0em';
    reviewAddForm.style.transform = 'scale(1)';
    reviewAddForm.style.opacity = '1';
}

export default reviewFormPopupEffect;