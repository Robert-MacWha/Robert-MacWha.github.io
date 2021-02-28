// Make sure that all transitions occur instantly when loading the page
window.addEventListener('load', (event) => {
    document.querySelector('body').classList.remove('preload');
});

window.onresize = updateVhUnit;
window.onload = updateVhUnit;

function updateVhUnit () {
    // Create a css variable that contains the vh unite for mobile
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}