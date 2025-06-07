const apiKey = "b08fb931e24a409e98f123136250606"


function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var fullElemPage = document.querySelectorAll(".fullElem");
  var fullElemPageBackBtn = document.querySelectorAll(".fullElem .backbtn");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}
openFeatures();

function todoList() {
  let currentTask = [];

  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is Empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");

    let sum = "";

    currentTask.forEach(function (elem, idx) {
      sum =
        sum +
        `<div class="task">
        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
        <button id=${idx}>Mark as Completed</button>
        </div>`;
    });

    allTask.innerHTML = sum;

    localStorage.setItem("currentTask", JSON.stringify(currentTask));

    document.querySelectorAll(".task button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".addTask form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    renderTask();

    taskCheckbox.checked = false;
    taskInput.value = "";
    taskDetailsInput.value = "";
  });
}

todoList();

// +++++++++++++++++++++DailyPlanner++++++++++++++++++++++++++

function DailyData() {
  var DayPlanner = document.querySelector(".day-planner");

  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  let time = Array.from(
    { length: 18 },
    (elem, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );

  let Wholesum = "";
  time.forEach(function (elem, idx) {
    let saveData = dayPlanData[idx] || "";

    Wholesum =
      Wholesum +
      `<div class="day-planner-time">
            <p>${elem}</p>
            <input id=${idx} type="text" placeholder="..." value=${saveData}>
     </div>`;
  });

  DayPlanner.innerHTML = Wholesum;

  var dayPlannerInput = document.querySelectorAll(".day-planner input");

  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

DailyData();

// ++++++++++++++++++MotivationPage++++++++++++++++++++++++++++++++

function motivationQuote() {
  let quote = document.querySelector(".motivation-2 h1");
  let author = document.querySelector(".motivation-3 h2");

  async function fetchQuote() {
    let response = await fetch(
      "https://random-quotes-freeapi.vercel.app/api/random"
    );
    let data = await response.json();
    quote.innerHTML = data.quote;
    author.innerHTML = data.author;
  }

  fetchQuote();
}

motivationQuote();

// ++++++++++++Pomodoro++++++++++++++

var timer = document.querySelector(".pomo-timer h1");
var startbtn = document.querySelector(".pomo-timer .start-timer");
var pausebtn = document.querySelector(".pomo-timer .pause-timer");
var resetbtn = document.querySelector(".pomo-timer .reset-timer");
let session = document.querySelector(".pomodoro-fullpage .session");

let isworkSession = true;

let timeinterval = null;
let totalSeconds = 25 * 60;

function pomodoro(){


function updateTime() {
  let minute = Math.floor(totalSeconds / 60);
  let second = totalSeconds % 60;
  timer.innerHTML = `${String(minute).padStart("2", "0")}:${String(
    second
  ).padStart("2", "0")}`;
}

function startTimer() {
  clearInterval(timeinterval);

  if (isworkSession) {
    timeinterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTime()
      } else {
        isworkSession = false;
        clearInterval(timeinterval);
        timer.innerHTML = "05:00";
    session.innerHTML = "Break"
    session.style.backgroundColor = "var(--blue)"
    totalSeconds = 5 * 60;
      }
      updateTime();
    }, 1000);
  } else {
    timeinterval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        updateTime();
      } else {
        isworkSession = true;
        clearInterval(timeinterval);
        timer.innerHTML = "25:00";
    session.innerHTML = "Work Session"
    session.style.backgroundColor = "var(--green)"
    totalSeconds = 25 * 60;

      }
    }, 1000);
  }
}

startbtn.addEventListener("click", startTimer);

function pauseTimer() {
  clearInterval(timeinterval);
}

pausebtn.addEventListener("click", pauseTimer);

function resetTimer() {
  totalSeconds = 25 * 60;
  clearInterval(timeinterval);
  updateTime();
}

resetbtn.addEventListener("click", resetTimer);

}

pomodoro()


// ++++++++++++++++Landing Page++++++++++++++++++++++=

var city = "Delhi"
let data = null
let header1Date = document.querySelector(".header1 h1");

async function weatherAPICall(){
  var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
 data = await response.json() 
}

weatherAPICall()

function timeDate(){
  const totaldaysOfWeek = ['Sunday',"Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  let date = new Date()
  let hours = date.getHours()
  let minute = date.getMinutes()
  let dayOfWeek = totaldaysOfWeek[date.getDay()]
  if(hours>12){
  header1Date.innerHTML = `${dayOfWeek}, ${hours - 12}:${minute} PM`
  }
  else{
  header1Date.innerHTML = `${dayOfWeek}, ${hours}:${minute} AM`

  }
  
}
timeDate()
