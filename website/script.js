// Eye movement
const eye = document.getElementById('eye');
const pupil = document.getElementById('pupil');
const customCursor = document.getElementById('custom-cursor');
const cursor = document.getElementById('custom-cursor');

// Mouse movement for eye tracking
document.addEventListener('mousemove', (event) => {
    const eyeRect = eye.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;
    
    const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);
    const maxRadius = 18;
    
    const pupilX = Math.cos(angle) * maxRadius;
    const pupilY = Math.sin(angle) * maxRadius;
    
    pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
});



// Custom cursor movement
document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        const offsetX = e.clientX - (customCursor.offsetWidth / 2);
        const offsetY = e.clientY - (customCursor.offsetHeight / 2);
        
        customCursor.style.left = offsetX + 'px';
        customCursor.style.top = offsetY + 'px';
    });
});

// Cursor change on eye hover
const changeToCursor = () => {
    customCursor.src = './click.png';
};

const changeToFeather = () => {
    customCursor.src = './feather.png';
};

eye.addEventListener('mouseenter', changeToCursor);
eye.addEventListener('mouseleave', changeToFeather);

// Menu functionality
const eyeContainer = document.getElementById('eye-container');
const menuOverlay = document.getElementById('menu-overlay');

eyeContainer.addEventListener('click', () => {
    menuOverlay.classList.toggle('active');
});

menuOverlay.addEventListener('click', (e) => {
    if (e.target === menuOverlay) {
        menuOverlay.classList.remove('active');
    }
});

// Lamp animation
const lampContainer = document.getElementById('lamp-container');
const lamp = document.getElementById('lamp');

lampContainer.style.animation = 'dropLamp 1.5s ease-in-out forwards';

lampContainer.addEventListener('animationend', () => {
    lampContainer.style.animation = '';
    lamp.style.animation = 'swingLamp 4s ease-in-out infinite';
});

// Scroll effect
document.addEventListener('scroll', () => {
    const eye = document.getElementById('eye-container');
    const textElements = document.querySelectorAll('.additional-text p');
    const eyeBottom = eye.getBoundingClientRect().bottom;
    const buffer = 40;

    textElements.forEach(text => {
        const textTop = text.getBoundingClientRect().top;
        if (textTop < (eyeBottom + buffer)) {
            text.style.opacity = '0';
        } else {
            text.style.opacity = '1';
        }
    });
});

// Initial resize trigger
window.dispatchEvent(new Event('resize')); 

document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const page1Height = 2160; // Height of page.png
    const page1 = document.querySelector('.page1');
    const page2 = document.querySelector('.page2');
    
    // Start transition when user has scrolled to 80% of page1
    if (scrollPosition > page1Height * 0.8) {
        const progress = (scrollPosition - page1Height * 0.8) / (page1Height * 0.2);
        page1.style.opacity = Math.max(0, 1 - progress);
        page2.classList.add('visible');
    } else {
        page1.style.opacity = 1;
        page2.classList.remove('visible');
    }
});




const stickySections = [...document.querySelectorAll('.sticky')]
let images = [
    "content/artb.png",
    "content/comic.png",
    "content/drug.png",
    "content/visual.png",
    "content/artb.png",
    "content/comic.png",
    "content/drug.png",
    "content/visual.png"
]

images.forEach(img => {
stickySections.forEach(section => {
    let image = document.createElement('img')
    image.src = img;
    section.querySelector('.scroll_section').appendChild(image)
})
})

window.addEventListener('scroll', (e) => {
for (let i=0; i < stickySections.length; i++){
    transform(stickySections[i])
}
})


function transform(section){
    const offsetTop = section.parentElement.offsetTop;
    const scrollSection = section.querySelector('.scroll_section');
    
    let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
    percentage = percentage < 0 ? 0 : percentage > 400 ? 400 : percentage;
    scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`;


}

