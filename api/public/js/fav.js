
window.onload = async () => {
    let id, str;
    let fav = [];

    const containers = document.querySelectorAll('.products_container-product')
    
    if (localStorage.getItem('fav') != null) {
        fav = JSON.parse(localStorage.getItem('fav'));
    } else {
        localStorage.setItem('fav', '[]');
        fav = JSON.parse(localStorage.getItem('fav'));
    }


    for (let container of containers) {
        if (fav.length < 1) {
            str = document.createElement("i");
            str.classList.add('star', 'fa-star', 'far')
            container.appendChild(str)
        } else {
            if (fav.includes(Number(container.dataset.id))) {
                str = document.createElement("i");
                str.classList.add('star', 'fa-star', 'fas')
                container.appendChild(str)
            } else {
                str = document.createElement("i");
                str.classList.add('star', 'fa-star', 'far')
                container.appendChild(str)
            }
        }
    }
    
    
    const stars = document.querySelectorAll('.star')


    for (let i = 0; i < stars.length; i++) {
        stars[i].addEventListener('click', () => {
            id = Number(containers[i].dataset.id)
            console.log('bololo');
            console.log(id);
            const index = fav.indexOf(id);
            console.log(index);

            if (index == -1) {
                fav.push(id)
                stars[i].classList.replace("far", "fas");
                console.log(1);
            } else {
                fav.splice(index, 1)
                stars[i].classList.replace("fas", "far");
                console.log(2);
            }

            
            localStorage.setItem('fav', JSON.stringify(fav))
        })
        
    }
}
