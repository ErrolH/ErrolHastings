"use strict";
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
    let pickDate = '2026-01-01T00:00'; //T00:00

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
    let timeObject = {};
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

let p1 = 'X';
let p2 = 'O';
let currentPlayer = p1;
let p1Name = 'Player 1';
let p2Name = 'Player 2';
let curName = p1Name;
let winText = document.querySelector(".winText");
let resetButton = document.getElementById("reset");
let p1Array = [];
let p2Array = [];
let winComb = []
let winCombinations = ["123", "456", "789", "147", "258", "369", "159", "357"];
let testWinComb = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
let pool = {
    "1": "1",
    "2": "2", 
    "3": "3",
    "4": "4", 
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
};
let board = document.querySelector(".board");

if (window.location.pathname == "/games.html") {


// console.log(board);

// think of a way to tag the specific cell when clicked with an X or O (you might need a variable that rotates after each sucessful click) and also fill the text with X or O.


board.addEventListener("click", eventListener);

resetButton.addEventListener("click", () => {
    resetGame();
 });

let submitButton = document.getElementById("submit");

submitButton = document.addEventListener("click", () => {
    let p1Field = document.getElementById("P1Name");
    let p2Field = document.getElementById("P2Name");
    p1Name = p1Field.value;
    p2Name = p2Field.value;
    
});
}
function eventListener(event) {
    if (Object.keys(pool).length === 0){
        console.log("Game Over");
        return;
    }

    if (event.target.closest(".boardCell") === null) {
        return;
    }

    let cell = event.target.closest(".boardCell");
    cell.innerText = currentPlayer;

    let i = cell.dataset.cell;
    delete pool[i];

    if(currentPlayer === p1) {
        p1Array.push(Number(cell.dataset.cell));
    }
    if(currentPlayer === p2) {
        p2Array.push(Number(cell.dataset.cell));
    }

    if (Object.keys(pool).length === 0){

        if(checkWinner(currentPlayer)) {
            winAndLock(curName, winComb);
            return;
        }
        //This is where you'll call a function to handle a draw.
            winText.innerText = `Draw.`
        return;
    }

    if(checkWinner(currentPlayer)) {
        winAndLock(curName, winComb);
        return;
    }

    if(currentPlayer === p1) {
        currentPlayer = p2;
        curName = p2Name;
    } else if (currentPlayer === p2){
        currentPlayer = p1;
        curName = p1Name;
    }
} 

// create a function that checks for a winner after each move.
function checkWinner(player) {
    //picks the array to compare to.
    let candidate = player === p1 ? p1Array : p2Array;
    //makes sure it has 3 numbers before checking, as winner can't be less than 3
    if(candidate.length < 3) return false;
    //sorts the array numerically
    candidate.sort();

    //loops through the array of winning combinations [123], [456]...
    for (let i = 0; i < testWinComb.length; i++) {
        let arrComb = testWinComb[i];
        let winner = 0;
        //loops through the individual numbers in a winning combination 1,2,3.
        for(let j = 0; j < arrComb.length; j++) {

            if(candidate.includes(arrComb[j])) {
                winComb.push(arrComb[j]);
                winner++;
                continue;
            }

            winner = 0;
            winComb = [];
            break;
        }

        if(winner === 3) {
            return true;
        }
    
    }
    return false;
}

// Check if there's a winner, display this, and lock the game. However, make sure to remember when pool hit's 0, it's a draw every time.
function winAndLock(currentPlayer, winComb) {

    winText.innerText = `${currentPlayer} is the winner.`
    let cell1 = document.querySelector(`[data-cell='${winComb[0]}']`)
    let cell2 = document.querySelector(`[data-cell='${winComb[1]}']`)
    let cell3 = document.querySelector(`[data-cell='${winComb[2]}']`)
    cell1.classList.add("strikethrough",checkDirection(winComb));
    cell2.classList.add("strikethrough",checkDirection(winComb));
    cell3.classList.add("strikethrough",checkDirection(winComb));

    //WIN IS DONE, NOW LOCK.
    board.style.pointerEvents = 'none';
}

//Check if the arrays are equal in some way to map what direction the line should go.
function checkDirection (winComb) {
    let myMap = new Map();
    myMap.set("1,2,3","strikeHor");
    myMap.set("4,5,6","strikeHor");
    myMap.set("7,8,9","strikeHor");
    myMap.set("1,4,7","strikeVer");
    myMap.set("2,5,8","strikeVer");
    myMap.set("3,6,9","strikeVer");
    myMap.set("1,5,9","strikeDia2");
    myMap.set("3,5,7","strikeDia");
    let dir = myMap.get(winComb.toString());
    return dir;
}



//Function for resetting the game, once all other criteria is met.
function resetGame() {
    board.style.removeProperty('pointer-events');
    let arrCells = document.querySelectorAll(".boardCell");

    for(let i = 0; i < arrCells.length; i++) {
        arrCells[i].innerHTML = "";
        arrCells[i].className = "boardCell";
    }

    p1 = 'X';
    p2 = 'O';
    currentPlayer = p1;
    winText.innerHTML = "";
    p1Array = [];
    p2Array = [];
    winComb = []
    winCombinations = ["123", "456", "789", "147", "258", "369", "159", "357"];
    testWinComb = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
    pool = {
        "1": "1",
        "2": "2", 
        "3": "3",
        "4": "4", 
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
    }
};
