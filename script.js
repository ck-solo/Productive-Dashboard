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
let allTask = document.querySelector(".allTask")

console.log(allTask)
form.addEventListener("submit",function(e){
    e.preventDefault()
    console.log(taskInput.value)
    console.log(taskDetailsInput.value)
    console.log(taskCheckBox.checked)
})