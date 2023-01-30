let currentNumber = 1;
let currentLetter = 'A';
let startTime;
let divCount;
let allClick;
let correctClick;
let done = false;
let rec = false;
let type = 1;
const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
// let best3;
// let best4;
// let best5;
if (localStorage.getItem("best") === null) {
          const best = {
            best3: "999",
            best4: "999",
            best5: "999"
        }
        localStorage.setItem("best", JSON.stringify(best));
        // best3 = parseFloat(best.best3);
        // best4 = parseFloat(best.best4);
        // best5 = parseFloat(best.best5);
} else {
    best = JSON.parse(localStorage.getItem("best"));
    // best3 = parseFloat(best.best3);
    // best4 = parseFloat(best.best3);
    // best5 = parseFloat(best.best3);
}

  document.querySelector('.best3').innerHTML = '3X3 Best time: ' + parseFloat(best.best3) +"s";
  document.querySelector('.best4').innerHTML = '4X4 Best time: ' + parseFloat(best.best4) +"s";
  document.querySelector('.best5').innerHTML = '5X5 Best time: ' + parseFloat(best.best5) +"s";


  function checkedValue(){
  divCount = parseInt(document.querySelector('input[name="board-size"]:checked').value);
}

function resetRecords(){
          const best = {
            best3: "999",
            best4: "999",
            best5: "999"
        }
  localStorage.removeItem(best)
  document.querySelector('.best3').innerHTML = '3X3 Best time: ' + parseFloat(best.best3) +"s";
  document.querySelector('.best4').innerHTML = '4X4 Best time: ' + parseFloat(best.best4) +"s";
  document.querySelector('.best5').innerHTML = '5X5 Best time: ' + parseFloat(best.best5) +"s";
  localStorage.setItem("best", JSON.stringify(best));
}
function showOptions(){
  document.querySelectorAll(".sidebar").forEach(function(element) {
    element.classList.remove("invisible");
  });
    document.querySelectorAll(".start").forEach(function(element) {
    element.style.filter = 'blur(2px)';
    element.style.pointerEvents = "none";
  });
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
  done = false;
  createDivs();
  rec = false;
}
function blinkWrong(element) {
    element.style.backgroundColor = "red";
    setTimeout(function(){
        element.style.backgroundColor = "";
    }, 100);
}

function calculateElapsedTime(start,end) {
    let elapsedTime;
    return function() {
        elapsedTime = end - start;
        return elapsedTime;
    }
}

let getElapsedTime = calculateElapsedTime();

function showDivContent(event) {
    let clickedNumber = parseInt(event.target.innerHTML);
    if (clickedNumber === currentNumber && currentNumber <= divCount) {
        event.target.classList.add("correct");
        currentNumber++;
        allClick++;
        correctClick++;
  }
    else if(currentNumber <= divCount){
        blinkWrong(event.target);
        allClick++;

    }

    if (currentNumber > divCount && !done) {
        done = true;
        let compare;
        let endTime = Date.now();
        let spanTime = document.createElement("span");

        spanTime.classList.add("spanr");
        
        let resultCreate = document.createElement("div");
        let finalTime = (endTime - startTime) / 1000;
        compare = finalTime;
        if(divCount == 9 && compare < parseFloat(best.best3)){
          // localStorage.setItem("best3", compare.toFixed(2));
          best.best3 = compare.toFixed(2);
          localStorage.setItem("best", JSON.stringify(best));
          document.querySelector('.best3').innerHTML = '3X3 Best time: ' + compare.toFixed(2) +"s";
          rec = true;
        }
        else if(divCount == 16 && compare < parseFloat(best.best4)){
          best.best4 = compare.toFixed(2);
          localStorage.setItem("best", JSON.stringify(best));
          document.querySelector('.best4').innerHTML = '4X4 Best time: ' + compare.toFixed(2) +"s";
          rec = true;
        }
        else if(divCount == 25 && compare < parseFloat(best.best5)){
          best.best5 = compare.toFixed(2);
          localStorage.setItem("best", JSON.stringify(best));
          document.querySelector('.best5').innerHTML = '5X5 Best time: ' + compare.toFixed(2) +"s";
          rec = true;
        }
        let spanAccuracy = document.createElement("span");
        spanAccuracy.style.fontSize = "26px";
        spanAccuracy.style.display = "block";
        resultCreate.appendChild(spanTime);
        resultCreate.appendChild(spanAccuracy);
        spanAccuracy.innerHTML = "Accuracy: " + ((correctClick/allClick)*100).toFixed(2) + " %";
        document.querySelector('#board').style.filter = 'blur(2px)';

        resultCreate.setAttribute("id","result");
        document.body.appendChild(resultCreate);

        let newButton = document.createElement("button");
        resultCreate.appendChild(newButton);
        newButton.setAttribute("id","restart");
        newButton.textContent = ("Restart");
        newButton.addEventListener("click", restart);

        let newButton2 = document.createElement("button");
        resultCreate.appendChild(newButton2);
        newButton2.setAttribute("id","Menu");
        newButton2.textContent = ("Menu");
        newButton2.addEventListener("click", createMenu);
        spanTime.innerHTML = "Final time: " + finalTime + " seconds";
                if(rec){
        document.querySelectorAll(".spanr").forEach(function(element) {
        element.classList.add("record");
        spanAccuracy.style.fontWeight = "bold";
        });
        }
    }
}

function createMenu(){
  currentNumber = 1;
  document.querySelectorAll(".start").forEach(function(element) {
    element.classList.remove("invisible");
    element.style.filter = 'blur(0px)';
  });
  document.querySelectorAll("#board").forEach(function(element) {
    element.remove();
  });
  document.querySelectorAll("#result").forEach(function(element) {
    element.remove();
  });
  document.querySelectorAll(".sidebar").forEach(function(element) {
  element.classList.add("invisible");
  });
  rec = false;
}

function createDivs() {
  done = false;
  checkedValue();
  startTime = Date.now();
  elapsedTime = Date.now();
  allClick = 0;
  correctClick = 0;
  let boardCreate = document.createElement("div");
  boardCreate.setAttribute("id","board");
  boardCreate.setAttribute("class","boardStyle");
  document.body.appendChild(boardCreate);
  document.querySelectorAll(".start").forEach(function(element) {
    element.classList.add("invisible");
  });


  let arr = Array.apply(null, Array(divCount)).map(function (y, i) { return i+1; });
  arr = arr.sort(function () {
    return Math.random() - 0.5;
  });

  
  arr = arr.sort(function (){
return Math.random() - 0.5;
});
let board = document.getElementById("board");
for (let i = 0; i < divCount; i++) {
let newDiv = document.createElement("div");
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

const {app, BrowserWindow,ipcMain} = require('electron');
const { after } = require('node:test');
  const path = require('path');
const { stringify } = require('querystring');
  const url = require('url')
  
  function createWindow () {

    win = new BrowserWindow({width: 950, height: 950 })
    win.setResizable(false)
    win.setAutoHideMenuBar(true)
    win.setTitle("Schulte table")
win.webContents.on('did-finish-load', () => {
  win.webContents.executeJavaScript(`
    let el = document.querySelector('.startMenu');
    let width = el.offsetWidth;
    let height = el.offsetHeight;
    let size = { width: width, height: height };
    require('electron').ipcRenderer.send('set-window-size', size);
  `);
});


ipcMain.on('set-window-size', (event, size) => {
  win.setSize(size.width, size.height);
});

    win.loadURL(url.format({
      pathname: path.join(__dirname, 'Start.html'),
      protocol: 'file:',
      slashes: true
    }))
  }
  
  app.on('ready', createWindow)