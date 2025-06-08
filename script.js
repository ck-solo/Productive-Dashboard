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


// ++++++++++++++++Weather function++++++++++++++++++++++=

function weatherfunction(){
  var city = "Delhi"
let data = null
let header1Date = document.querySelector(".header1 h1");
let header1Time = document.querySelector(".header1 h2");
let header2Time = document.querySelector(".header2 h2");
let header2Weather = document.querySelector(".header2 h4");
let heat = document.querySelector(".header2 .heat");
let humidity = document.querySelector(".header2 .humi");
let wind = document.querySelector(".header2 .wind");


async function weatherAPICall(){
  var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
 data = await response.json()  

 console.log(data.current)
 header2Time.innerHTML = `${data.current.temp_c}°C` 
 header2Weather.innerHTML = `${data.current.condition.text}`
 heat.innerHTML = `HeatIndex: ${data.current.heatindex_c}%`
 humidity.innerHTML = `Humidity: ${data.current.humidity}%`
 wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`
//  perc.innerHTML = ${data}

 
}

weatherAPICall()

function timeDate(){
  const totaldaysOfWeek = ['Sunday',"Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"] ;
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = new Date()
  let dayOfWeek = totaldaysOfWeek[date.getDay()]
  let hours = date.getHours()
  let minute = date.getMinutes()
  let dates = date.getDate()
  let month = monthNames[date.getMonth()]
  let year = date.getFullYear()
  
  header1Time.innerHTML = `${dates} ${month} ${year}`

  if(hours>12){
  header1Date.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart(2,'0')}:${String(minute).padStart(2, "0")} PM`
}
else{
    header1Date.innerHTML = `${dayOfWeek}, ${String(hours).padStart(2,'0')}:${String(minute).padStart(2, "0")} AM` 
  }
  
}

setInterval(()=>{
  timeDate()

},1000)

 

function setBackgroundBasedOnTime() {
  const landingPage = document.querySelector(".allElems header");
  const hour = new Date().getHours();
  
  const backgrounds = {
    morning: "url('https://images.unsplash.com/photo-1661591242935-004bc7f71ada?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1vcm5pbmclMjBzdW4lMjBza3l8ZW58MHx8MHx8fDA%3D')",
    afternoon: "url('https://images.unsplash.com/photo-1715543903784-571b3feca30c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFmdGVybm9vbiUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D')",
    evening: "url('https://plus.unsplash.com/premium_photo-1727792438882-d88192cb9a1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGV2ZW5pbmclMjAlMjB3ZWF0aGVyfGVufDB8fDB8fHww')",
    night: "url('https://images.unsplash.com/photo-1610798018989-001c5150766a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fG5pZ2h0d2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D')",
  };

  let bgImage = backgrounds.night;

  if (hour >= 5 && hour < 12) bgImage = backgrounds.morning;
  else if (hour >= 12 && hour < 17) bgImage = backgrounds.afternoon;
  else if (hour >= 17 && hour < 20) bgImage = backgrounds.evening;

  landingPage.style.backgroundImage = bgImage;
  landingPage.style.backgroundSize = "cover";
  landingPage.style.backgroundPosition = "center";
}

setBackgroundBasedOnTime();

}

weatherfunction()



function changeTheme(){

  let theme = document.querySelector('.theme')
  let rootElement = document.documentElement 
  
  let flag = 0
theme.addEventListener('click',function(){
  if(flag == 0){
    rootElement.style.setProperty('--pri',"#52357B")
    rootElement.style.setProperty('--sec',"#5459AC")
    rootElement.style.setProperty('--tri1',"#648DB3")
    rootElement.style.setProperty('--tri2',"#B2D8CE")
    rootElement.style.setProperty('--tri3',"#52357B")
    flag = 1
  } else if(flag == 1){
    
    rootElement.style.setProperty('--pri',"#ADB2D4")
    rootElement.style.setProperty('--sec',"#C7D9DD")
    rootElement.style.setProperty('--tri1',"#D5E5D5")
    rootElement.style.setProperty('--tri2',"#EEF1DA")
    rootElement.style.setProperty('--tri3',"#5C7285")
    flag = 2
    
  } else if (flag == 2){

    rootElement.style.setProperty('--pri',"#497D74")
    rootElement.style.setProperty('--sec',"#27445D")
    rootElement.style.setProperty('--tri1',"#71BBB2")
    rootElement.style.setProperty('--tri2',"#EFE9D5")
    rootElement.style.setProperty('--tri3',"#DD88CF")
    
    flag = 0
    
  } else {
      rootElement.style.setProperty('--pri',"#e61c1c")
      rootElement.style.setProperty('--sec',"#2A4759")
      rootElement.style.setProperty('--tri1',"#90D1CA")
      rootElement.style.setProperty('--tri2',"#D2D0A0")
      rootElement.style.setProperty('--tri3',"#7F8CAA")
      
    } 
    
  })
  
}

changeTheme()