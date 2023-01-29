let currentNumber = 1;
let startTime;
let divCount;
let allClick;
let correctClick;
let done = false;
let best3 = 999;
let best4 = 999;
let best5 = 999;

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
  done = false;
  createDivs();
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
    let beforeClick = Date.now();
    if (clickedNumber === currentNumber && currentNumber <= divCount) {
        event.target.classList.add("correct");

        currentNumber++;
        allClick++;
        correctClick++;
        let afterClick = Date.now();
        elapsedTime = getElapsedTime(beforeClick,afterClick);

  }
    else if(currentNumber <= divCount){
        blinkWrong(event.target);
        allClick++;

    }

    if (currentNumber > divCount && !done) {
        done = true;
        let compare;
        let endTime = Date.now();

        let finalTime = (endTime - startTime) / 1000;
        compare = finalTime

        if(divCount == 9 && compare < best3){
          best3 = compare.toFixed(2)
          document.querySelector('.best3').innerHTML = '3X3 Best time: ' + best3 +"s";
        }
        else if(divCount == 16 && compare < best4){
          best4 = compare.toFixed(2)
          document.querySelector('.best4').innerHTML = '4X4 Best time: ' + best4 +"s";
        }
        else if(divCount == 25 && compare < best5){
          best5 = compare.toFixed(2)
          document.querySelector('.best5').innerHTML = '5X5 Best time: ' + best5 +"s";
        }
        
        document.querySelector('#board').style.filter = 'blur(2px)';

        let resultCreate = document.createElement("div");
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

        let spanTime = document.createElement("span");
        resultCreate.appendChild(spanTime);
        spanTime.innerHTML = "Final time: " + finalTime + " seconds";

        let spanAccuracy = document.createElement("span");
        resultCreate.appendChild(spanAccuracy);
        spanAccuracy.innerHTML = "Accuracy: " + ((correctClick/allClick)*100).toFixed(2) + " %";
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
  const path = require('path')
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