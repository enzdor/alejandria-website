
window.onload = async () => {
    let id;
    let fav = [];
    const stars = document.querySelectorAll('.star')

    if (localStorage.getItem('fav') != null) {
        fav = JSON.parse(localStorage.getItem('fav'));
    } else {
        localStorage.setItem('fav', '[]');
        fav = JSON.parse(localStorage.getItem('fav'));
    }

    console.log(fav);

    stars.forEach((star) => {
        star.addEventListener('click', () => {
            id = Number(star.dataset.id)
            console.log('bololo');
            console.log(id);
            const index = fav.indexOf(id);
            console.log(index);
            console.log(star);

            if (index == -1) {
                fav.push(id)
                star.classList.replace("far", "fas");
                console.log(1);
            } else {
                fav.splice(index, 1)
                star.classList.replace("fas", "far");
                console.log(2);
            }

            
            localStorage.setItem('fav', JSON.stringify(fav))
        })
    })


    console.log('hola');

    


}
