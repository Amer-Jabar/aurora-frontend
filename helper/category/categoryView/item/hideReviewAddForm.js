const hideReviewAddForm = async () => new Promise(
    (resolve, reject) => {
        const reviewAddForm = document.querySelector('#reviewAddForm');
        if ( !reviewAddForm )
            return;

        reviewAddForm.style.setProperty('margin-top', '2em');
        reviewAddForm.style.setProperty('transform', 'scale(0.75)');
        reviewAddForm.style.setProperty('opacity', '0');

        setTimeout(() => reviewAddForm !== null 
        ? resolve(true)
        : reject(false)
        , 750)
    }
)

export default hideReviewAddForm;