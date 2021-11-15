const track = document.querySelector('#carousel-slide-container');
const slides = Array.from(track.children);
const nextButton = document.querySelector('#carousel-next');
const prevButton = document.querySelector('#carousel-prev');
const dotsNav = document.querySelector('#carousel-nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;


// arrange the slides one next to the other

const setSlidePosition = (slide , index) => {
    slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);


const moveToSlide = (track, currentSlide, targetSlide) => {

    if (targetSlide === null){return};

    track.style.transform = 'translateX(-'   + targetSlide.style.left + ')';
    currentSlide.classList.remove('carousel-item-current');
    targetSlide.classList.add('carousel-item-current');
};


const updateDots = (currentDot, targetDot) => {

    if (targetDot === null){
        console.log(this.width)
        return};

    currentDot.classList.remove('carousel-current-indicator');
    targetDot.classList.add('carousel-current-indicator')

}

// when i click next move slides to the left

nextButton.addEventListener('click' , e =>{
    // find current slide
    const currentSlide = track.querySelector('.carousel-item-current');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.carousel-current-indicator');
    const nextDot = currentDot.nextElementSibling;
    
    // move to the next slide
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot , nextDot);
});


// when i click prev move slides to the right

prevButton.addEventListener('click' , e =>{
    //find current slide
    const currentSlide = track.querySelector('.carousel-item-current')
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.carousel-current-indicator');
    const prevDot = currentDot.previousElementSibling;
    
    // move to previous slide
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot , prevDot);
});


// when i click indicator move to selected slide

dotsNav.addEventListener('click' , e => {
    const targetDot = e.target.closest('button')

    if (!targetDot) return;

    const currentSlide = track.querySelector('.carousel-item-current');
    const currentDot = dotsNav.querySelector('.carousel-current-indicator');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot , targetDot);
 
})
