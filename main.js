var currentNumber = 1;
var startTime;
var divCount;

function checkedValue(){
  divCount = parseInt(document.querySelector('input[name="board-size"]:checked').value);
}

function restart(){
  document.querySelectorAll(".start").forEach(function(element) {
    element.classList.remove("invisible");
  });
  document.querySelectorAll("#board").forEach(function(element) {
    element.remove();
  });
  document.querySelectorAll("#result").forEach(function(element) {
    element.remove();
  });
  currentNumber = 1;
  createDivs();
}

function showDivContent(event) {
    var clickedNumber = parseInt(event.target.innerHTML);
    if (clickedNumber === currentNumber) {
        event.target.classList.add("correct");
        currentNumber++;
    }else {
        event.target.style.backgroundColor = "red";
    }

    if (currentNumber > divCount) {
        var endTime = Date.now();
        var finalTime = (endTime - startTime) / 1000;
        console.log("Final time: " + finalTime + " seconds");
        
        document.querySelector('#board').style.filter = 'blur(2px)';
        var resultCreate = document.createElement("div");
        resultCreate.setAttribute("id","result");
        document.body.appendChild(resultCreate);
        var newButton = document.createElement("button");
        resultCreate.appendChild(newButton);
        newButton.setAttribute("id","restart");
        newButton.textContent = ("Restart");
        newButton.addEventListener("click", restart);
        var newButton2 = document.createElement("button");
        resultCreate.appendChild(newButton2);
        newButton2.setAttribute("id","Menu");
        newButton2.textContent = ("Menu");
        newButton2.addEventListener("click", createMenu);
    }
}

function createMenu(){
  currentNumber = 1;
  document.querySelectorAll(".start").forEach(function(element) {
    element.classList.remove("invisible");
  });
  document.querySelectorAll("#board").forEach(function(element) {
    element.remove();
  });
  document.querySelectorAll("#result").forEach(function(element) {
    element.remove();
  });
}

function createDivs() {
  checkedValue();
  startTime = Date.now();
  var boardCreate = document.createElement("div");
  boardCreate.setAttribute("id","board");
  boardCreate.setAttribute("class","boardStyle");
  document.body.appendChild(boardCreate);
  document.querySelectorAll(".start").forEach(function(element) {
    element.classList.add("invisible");
  });
  var arr = Array.apply(null, Array(divCount)).map(function (y, i) { return i+1; });
  arr = arr.sort(function () {
    return Math.random() - 0.5;
  });
  arr = arr.sort(function (){
return Math.random() - 0.5;
});
var board = document.getElementById("board");
for (var i = 0; i < divCount; i++) {
var newDiv = document.createElement("div");
newDiv.textContent = (arr[i]);
newDiv.classList.add("new-div");
if (divCount == 9) {
newDiv.classList.add("three");
} else if (divCount == 16) {
newDiv.classList.add("four");
} else if (divCount == 25) {
newDiv.classList.add("five");
}
newDiv.addEventListener("click", showDivContent);
board.appendChild(newDiv);
}
}