const burguerNav = document.querySelector('.header_container-burguer');
const burguerButton = document.querySelector('.header_button-burguer');

burguerButton.addEventListener('click' , () => {
    const burguerClasses = burguerNav.classList;
    for(let clas of burguerClasses){
        if (clas == 'header_visible'){
            burguerNav.classList.remove('header_visible');
            burguerNav.classList.add('header_not-visible');
        }
        else if (clas == 'header_not-visible'){
            burguerNav.classList.remove('header_not-visible');
            burguerNav.classList.add('header_visible');
        }
    }
})