/* =========================
   GET HTML ELEMENTS
========================= */

const hoursElement =
    document.getElementById("hours");

const minutesElement =
    document.getElementById("minutes");

const secondsElement =
    document.getElementById("seconds");

const ampmElement =
    document.getElementById("ampm");

const dayElement =
    document.getElementById("day");

const dateElement =
    document.getElementById("date");

const progressBar =
    document.getElementById("progressBar");

const format12Button =
    document.getElementById("format12");

const format24Button =
    document.getElementById("format24");


/* =========================
   DEFAULT FORMAT
========================= */

let is24Hour = false;


/* =========================
   MONTH NAMES
========================= */

const months = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

];


/* =========================
   DAY NAMES
========================= */

const days = [

    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"

];


/* =========================
   UPDATE CLOCK
========================= */

function updateClock() {

    /*
       Create a new Date object.

       It gets the current
       date and time from
       the user's device.
    */

    const now = new Date();


    /* =====================
       GET TIME
    ===================== */

    let hours = now.getHours();

    const minutes = now.getMinutes();

    const seconds = now.getSeconds();


    /* =====================
       AM / PM
    ===================== */

    const period =
        hours >= 12 ? "PM" : "AM";


    /* =====================
       12 HOUR FORMAT
    ===================== */

    if (!is24Hour) {

        hours = hours % 12;

        /*
           When hour is 0,
           display 12 instead.
        */

        if (hours === 0) {

            hours = 12;

        }

    }


    /* =====================
       ADD ZERO
    ===================== */

    const formattedHours =
        String(hours).padStart(2, "0");

    const formattedMinutes =
        String(minutes).padStart(2, "0");

    const formattedSeconds =
        String(seconds).padStart(2, "0");


    /* =====================
       DISPLAY TIME
    ===================== */

    hoursElement.textContent =
        formattedHours;

    minutesElement.textContent =
        formattedMinutes;

    secondsElement.textContent =
        formattedSeconds;


    /* =====================
       DISPLAY AM / PM
    ===================== */

    if (is24Hour) {

        ampmElement.textContent = "";

    } else {

        ampmElement.textContent =
            period;

    }


    /* =====================
       DISPLAY DAY
    ===================== */

    dayElement.textContent =
        days[now.getDay()];


    /* =====================
       DISPLAY DATE
    ===================== */

    const dateNumber =
        String(now.getDate()).padStart(2, "0");

    const monthName =
        months[now.getMonth()];

    const year =
        now.getFullYear();

    dateElement.textContent =
        `${dateNumber} ${monthName} ${year}`;


    /* =====================
       SECOND PROGRESS BAR
    ===================== */

    const progress =
        (seconds / 59) * 100;

    progressBar.style.width =
        `${progress}%`;

}


/* =========================
   12 HOUR BUTTON
========================= */

format12Button.addEventListener(
    "click",
    function () {

        is24Hour = false;

        format12Button.classList.add("active");

        format24Button.classList.remove("active");

        updateClock();

    }
);


/* =========================
   24 HOUR BUTTON
========================= */

format24Button.addEventListener(
    "click",
    function () {

        is24Hour = true;

        format24Button.classList.add("active");

        format12Button.classList.remove("active");

        updateClock();

    }
);


/* =========================
   RUN CLOCK
========================= */

/*
   Run once immediately
   so the clock doesn't wait
   for one second before showing.
*/

updateClock();


/*
   Run the function every
   1000 milliseconds = 1 second.
*/

setInterval(updateClock, 1000);