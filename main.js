  var currentNumber = 1;
var startTime;

// divCount = parseInt(radioValue);
// var radioValue = document.querySelector('input[name="board-size"]:checked').value;
// var divCount = parseInt(radioValue);
// console.log(divCount)

function checkedValue(){
  var radioValue = document.querySelector('input[name="board-size"]:checked').value;
  var divCount = parseInt(radioValue);
}

function restart(){

  var startElements = document.querySelectorAll(".start");
  startElements.forEach(function(element) {
    element.classList.remove("invisible");
  });
  var boardElements = document.querySelectorAll("#board");
  boardElements.forEach(function(element) {
    element.remove();
  });
  currentNumber = 1;
  divCount = parseInt(radioValue);
  createDivs();
  var removeResult = document.querySelectorAll("#result");
    removeResult.forEach(function(element) {
    element.remove();
  });
  startTime = Date.now();
}


  function showDivContent(event) {
    var clickedNumber = parseInt(event.target.innerHTML);
  console.log(clickedNumber);
  if (clickedNumber === currentNumber) {
    // If correct, highlight the number and move on to the next one
    event.target.classList.add("correct");
    currentNumber++;

    
    }else {
        // If incorrect, highlight the number in red
        event.target.style.backgroundColor = "red";
    }

    // Check if the player has reached the end of the board
    if (currentNumber > divCount) {
        // If so, stop the timer and show the final time
        endTime = Date.now();
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

  var startElements = document.querySelectorAll(".start");
  startElements.forEach(function(element) {
    element.classList.remove("invisible");
  });
  var boardElements = document.querySelectorAll("#board");
  boardElements.forEach(function(element) {
    element.remove();
  });
  var removeResult = document.querySelectorAll("#result");
    removeResult.forEach(function(element) {
    element.remove();

  });
}


function createDivs() {
  startTime = Date.now();
    radioValue = document.querySelector('input[name="board-size"]:checked').value;
    divCount = parseInt(radioValue);
  var boardCreate = document.createElement("div");
    boardCreate.setAttribute("id","board");
    boardCreate.setAttribute("class","boardStyle");
    document.body.appendChild(boardCreate);
    
    var startElements = document.querySelectorAll(".start");
  startElements.forEach(function(element) {
    // element.remove();
    element.classList.add("invisible");
  });
    var arr = Array.apply(null, Array(divCount)).map(function (y, i) { return i+1; });
    arr = arr.sort(function () {
  return Math.random() - 0.5;
});
    arr = arr.sort(function () {
  return Math.random() - 0.5;
});
var board = document.getElementById("board");
  for (var i = 0; i < divCount; i++) {
    var newDiv = document.createElement("div");
    
    newDiv.textContent = (arr[i]);
    newDiv.classList.add("new-div");
    if (divCount == 9) {
        newDiv.classList.add("three");
    }else if (divCount == 16) {
        newDiv.classList.add("four");
    }else{
        newDiv.classList.add("five");
    }
    board.appendChild(newDiv);
    newDiv.addEventListener("click", showDivContent);
  }
}
