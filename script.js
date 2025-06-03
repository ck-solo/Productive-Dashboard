function openFeatures() {
  let elem = document.querySelectorAll(".elem");
  let allfullElem = document.querySelectorAll(".fullElem");
  let backbtn = document.querySelectorAll(".fullElem .backbtn");
  elem.forEach(function (elem) {
    elem.addEventListener("click", function () {
      allfullElem[elem.id].style.display = "block";
    });
  });

  backbtn.forEach(function (back) {
    back.addEventListener("click", function () {
      allfullElem[back.id].style.display = "none";
    });
  });
}

// openFeatures();

function todoList(){
 
var currentTask = []
 
if(localStorage.getItem("currentTask")){
  currentTask = JSON.parse(localStorage.getItem("currentTask"))
}else{
  console.log("Task is not empty")
} 


function renderTask() {
    localStorage.setItem("currentTask",JSON.stringify (currentTask))
  var allTask = document.querySelector(".allTask");
  var sum = "";
  currentTask.forEach(function (elem,index) {
    sum =
      sum +
      `<div class="task"> 
                <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
                <button id=${index}>Mark as Completed</button>
            </div>`;
  });
  allTask.innerHTML = sum;
  
} 

renderTask()

let form = document.querySelector(".addTask form");
let taskInput = document.querySelector(".addTask form #task-input");
let taskDetailsInput = document.querySelector(".addTask form textarea ");
let taskCheckBox = document.querySelector(".addTask form #check");


form.addEventListener("submit", function (e) {
  e.preventDefault();
  currentTask.push({
    task: taskInput.value,
    details: taskDetailsInput.value,
    imp: taskCheckBox.checked,
  });
  
  renderTask();
  

  taskInput.value = ''
  taskDetailsInput.value = ''
  taskCheckBox.value = false
  renderTask()
  location.reload()
}); 



var markCompletedBtn = document.querySelectorAll(".task button")     
markCompletedBtn.forEach(function(button){
  button.addEventListener("click",function(){
     currentTask.splice(button.id,1) 
     console.log("data")
     renderTask()
     location.reload()
  })
})
}


todoList()