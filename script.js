window.addEventListener("DOMContentLoaded", (event) => {
    let onOff = false;
    const hamBurger = document.getElementsByClassName('hamWrapper')[0];
    const mobMenu = document.getElementsByClassName('mobileNav')[0];


 const menuWrapper = document.getElementsByClassName('nav1')[0];

 hamBurger.addEventListener('click', () => {
    if(!onOff){
        mobMenu.style.display = "block";
        onOff = true;
    }else if (onOff) {
        mobMenu.style.display = "none";
        onOff = false;
    }
 })

 window.addEventListener("resize", () => {
    if(window.innerWidth >= 1137) {
        mobMenu.style.display = "none";
        onOff = false;
    }
 })

})

let clockDays = document.querySelector("div.days");
let clockHours = document.querySelector("div.hours");
let clockMinutes = document.querySelector("div.minutes");
let clockSeconds = document.querySelector("div.seconds");

function countDown() {
    let releaseDate = new Date('September 6 2023').getTime();
    let currentTime = new Date().getTime();
    let difference = releaseDate - currentTime;
    
    timeObject = {};
    timeObject.days = (difference / 1000) / 60 / 60 / 24;
    timeObject.hours = (difference / 1000) / 60 / 60;
    timeObject.minutes = (difference / 1000) / 60;
    timeObject.seconds = (difference / 1000);
    
    clockSeconds.innerText = `${Math.floor(timeObject.seconds % 60)} seconds`;
    clockMinutes.innerText = `${Math.floor(timeObject.minutes % 60)} minutes`;
    clockHours.innerText = `${Math.floor(timeObject.hours % 24)} hours`;
    clockDays.innerText = `${Math.floor(timeObject.days)} days`;

}

setInterval(countDown, 1000);