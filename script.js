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
let firstClock = createDomTimeObject(clockDays, clockHours, clockMinutes, clockSeconds);
let pickDate = '2023-09-06T00:00';

let clockDays2 = document.querySelector("div.days2");
let clockHours2 = document.querySelector("div.hours2");
let clockMinutes2 = document.querySelector("div.minutes2");
let clockSeconds2 = document.querySelector("div.seconds2");
let secondClock = createDomTimeObject(clockDays2, clockHours2, clockMinutes2, clockSeconds2);

function calculateCountDown(date) {
    let releaseDate = new Date(date).getTime();
    let currentTime = new Date().getTime();
     let difference = releaseDate - currentTime;
     return difference;
}

function createTimeObject(dateTime) {
    timeObject = {};
    timeObject.days = (dateTime / 1000) / 60 / 60 / 24;
    timeObject.hours = (dateTime / 1000) / 60 / 60;
    timeObject.minutes = (dateTime / 1000) / 60;
    timeObject.seconds = (dateTime / 1000);
    return timeObject;
}

function displayTimeObject(timeObject, domTimeObject) {
    if(isNaN(timeObject.seconds)) {
        domTimeObject.clockSeconds.innerText = `selected.`;
        domTimeObject.clockMinutes.innerText = `currently`;
        domTimeObject.clockHours.innerText = `date`;
        domTimeObject.clockDays.innerText = `No`;  
    } else if(timeObject.seconds < 0) {
        domTimeObject.clockSeconds.innerText = `past.`;
        domTimeObject.clockMinutes.innerText = `already`;
        domTimeObject.clockHours.innerText = `has`;
        domTimeObject.clockDays.innerText = `Date`; 
    } else {
    domTimeObject.clockSeconds.innerText = `${Math.floor(timeObject.seconds % 60)} seconds`;
    domTimeObject.clockMinutes.innerText = `${Math.floor(timeObject.minutes % 60)} minutes`;
    domTimeObject.clockHours.innerText = `${Math.floor(timeObject.hours % 24)} hours`;
    domTimeObject.clockDays.innerText = `${Math.floor(timeObject.days)} days`;
}
}

function createDomTimeObject (days, hours, minutes, seconds) {
    let domTimeObject = {}
    domTimeObject.clockSeconds = seconds;
    domTimeObject.clockHours = hours;
    domTimeObject.clockMinutes = minutes;
    domTimeObject.clockDays = days;
    return domTimeObject;
}
let newValue;
setInterval(function () {displayTimeObject(createTimeObject(calculateCountDown(pickDate)), firstClock)}, 1000);
setInterval(function () {displayTimeObject(createTimeObject(calculateCountDown(newValue)), secondClock)}, 1000);

const input = document.querySelector("input");

input.addEventListener("input", (e) => {
    newValue = input.value;
});