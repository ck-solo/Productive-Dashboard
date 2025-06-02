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


let form = document.querySelector(".addTask form")
let taskInput = document.querySelector(".addTask form #task-input") 
let taskDetailsInput = document.querySelector(".addTask form textarea ")
let taskCheckBox = document.querySelector(".addTask form #check")
let currentTask = [
       {
        task:"Eat",
        details:"khana khana",
        imp:true
       },
       {
        task:"Sleep",
        details:"time pr sona",
        imp:false
       },
       {
        task:"Code",
        details:"Code Likhna",
        imp:true
       }, 
]

form.addEventListener("submit",function(e){
    e.preventDefault()
    console.log(taskInput.value)
    console.log(taskDetailsInput.value)
    console.log(taskCheckBox.checked)
})

var sum = ''
// var allTask = document.querySelector(".allTask")
// var sum = ''
// allTask.addEventListener("")

currentTask.forEach(function(elem){
  sum = sum + `<div class="task">
                <h5>Go Gym</h5>
                <button>Mark as Completed</button>
            </div>`
})
allTask.innerHTML = sum