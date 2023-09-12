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


if (window.location.pathname == "/countdown.html") {
    let clockDays = document.querySelector("div.days");
    let clockHours = document.querySelector("div.hours");
    let clockMinutes = document.querySelector("div.minutes");
    let clockSeconds = document.querySelector("div.seconds");
    let firstClock = createDomTimeObject(clockDays, clockHours, clockMinutes, clockSeconds);
    let pickDate = '2023-09-06'; //T00:00

    let clockDays2 = document.querySelector("div.days2");
    let clockHours2 = document.querySelector("div.hours2");
    let clockMinutes2 = document.querySelector("div.minutes2");
    let clockSeconds2 = document.querySelector("div.seconds2");
    let secondClock = createDomTimeObject(clockDays2, clockHours2, clockMinutes2, clockSeconds2);

    let newValue;
    setInterval(function () {displayTimeObject(createTimeObject(calculateCountDown(pickDate)), firstClock)}, 1000);
    setInterval(function () {displayTimeObject(createTimeObject(calculateCountDown(newValue)), secondClock)}, 1000);

    const input = document.querySelector("input");

    input.addEventListener("input", (e) => {
        newValue = input.value;
    });
}

if(window.location.pathname == "/Exercises.html") {
    let form = document.getElementById("convertForm")
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let fromSelection = document.querySelectorAll('[name=from]');
        let toSelection = document.querySelectorAll('[name=to]');
        let currentValue = document.querySelector('[name=quantity]').value;

        let currentFrom = checkRadio(fromSelection);
        let currentTo = checkRadio(toSelection);
        let result = convertUnit(currentFrom, currentTo, currentValue);
        console.log(`${currentValue} ${currentFrom.value} converts to ${result} ${currentTo.value}`);

        displayResult(currentValue, result, currentFrom, currentTo, form);
    });
}

function displayResult(currentValue, result, currentFrom, currentTo, form) {
    let pResult = document.getElementById("result");

    let displayParagraph = document.createElement("p");
    let fromSingular, toSingular;
    if(+currentValue === 1) {
        fromSingular = currentFrom.value.slice(0, currentFrom.value.length - 1);
    } else {
        fromSingular = currentFrom.value;
    }
    if(+result === 1) {    
        toSingular = currentTo.value.slice(0, currentTo.value.length - 1);
    } else {
        toSingular = currentTo.value;
    }
    
    pResult.innerText = `${currentValue} ${fromSingular} converts to ${result} ${toSingular}`
}

    


function checkRadio(value) {
    for(let fro of value) {
        if (fro.checked == true) {
            return fro;
        }
    }
}

function convertUnit(from, to, value) {
    if (value < 0) return null;
    if (from.value == "grams" && to.value == "grams") return +value;
    if (from.value == "grams" && to.value == "kilograms") return +value / 1000;
    if (from.value == "grams" && to.value == "tonnes") return (+value / 1000) / 1000;

    if (from.value == "kilograms" && to.value == "grams") return +value * 1000;
    if (from.value == "kilograms" && to.value == "kilograms") return +value;
    if (from.value == "kilograms" && to.value == "tonnes") return +value / 1000;

    if (from.value == "tonnes" && to.value == "grams") return (+value * 1000) * 1000;
    if (from.value == "tonnes" && to.value == "kilograms") return +value * 1000;
    if (from.value == "tonnes" && to.value == "tonnes") return +value;
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

function createTimeObject(dateTime) {
    timeObject = {};
    timeObject.days = (dateTime / 1000) / 60 / 60 / 24;
    timeObject.hours = (dateTime / 1000) / 60 / 60;
    timeObject.minutes = (dateTime / 1000) / 60;
    timeObject.seconds = (dateTime / 1000);
    return timeObject;
}

function calculateCountDown(date) {
    let releaseDate = new Date(date).getTime();
    let currentTime = new Date().getTime();
    let difference = releaseDate - currentTime;
    return difference;
}