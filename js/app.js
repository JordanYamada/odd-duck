'use strict'

// Global Variables

let clickCount = 0;
let clickMax = 25;
let choiceArr = [];
let indexArr = [];
// let Choose.tally = [];


let grid = document.getElementById('grid');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

// Object Constructor

function Choose(name, extension = 'jpg') {
  this.name = name;
  this.src = `/images/${this.name}.${extension}`;
  this.clicks = 0;
  this.views = 0;
  this.extension = extension;

  choiceArr.push(this);
}

// Functional Logic

function getRandom() {
  return Math.floor(Math.random() * choiceArr.length);
}

function renderChoice() {
  // let choice1 = getRandom();
  // let choice2 = getRandom();
  // let choice3 = getRandom();
  // while ((choice1 === choice2) || (choice2 === choice3)) {
  //   choice2 = getRandom();
  //   while ((choice3 === choice1)) {
  //     choice3 = getRandom();
  //   }
  // }
  while (indexArr.length < 6) {
    let ranNum = getRandom();
    if (!indexArr.includes(ranNum)) {
      indexArr.push(ranNum);
    }
  }
  let choice1 = indexArr.shift();
  let choice2 = indexArr.shift();
  let choice3 = indexArr.shift();

  image1.src = choiceArr[choice1].src;
  image1.alt = choiceArr[choice1].name;
  choiceArr[choice1].views++;
  image2.src = choiceArr[choice2].src;
  image2.alt = choiceArr[choice2].name;
  choiceArr[choice1].views++;
  image3.src = choiceArr[choice3].src;
  image3.alt = choiceArr[choice3].name;
  choiceArr[choice1].views++;

}

function handleClick(event) {
  let chosen = event.target.alt;
  if ((event.target !== image1) && (event.target !== image2) && (event.target !== image3)) {
    alert('Please click on an image');
  } else {
    clickCount++;

    console.log(chosen);

    for (let i = 0; i < choiceArr.length; i++) {
      if (chosen === choiceArr[i].name) {
        choiceArr[i].clicks++;
        break;
      }
    }
    renderChoice();
    if (clickCount === clickMax) {
      //   myButton.className = 'clicks-allowed';
      grid.removeEventListener('click', handleClick);
      //   myButton.addEventListener('click', handleButtonClick);
      renderChart();
      // for (let i = 0; i < choiceArr.length; i++) {
      //   Choose.tally.push(choiceArr[i]);
      updateStorage();
    }

  }

}

// Local Storage Functions

function updateStorage() {
  const arrayString = JSON.stringify(choiceArr);
  console.log(arrayString);
  localStorage.setItem('tally', arrayString);

}

function getTally() {
  // retrieve data from local storage
  const data = localStorage.getItem('tally');
  // convert the data (array) from a string to something that we can use in JavaScript.
  const tallyData = JSON.parse(data);

  // If this is the first time we visit the page, there will not be an array for us to use in localStorage
  if (tallyData !== null) {
    choiceArr = tallyData;
    // }
  }
}


//Executable Code

let bag = new Choose('bag');
let banana = new Choose('banana');
let bathroom = new Choose('bathroom');
let boots = new Choose('boots');
let breakfast = new Choose('breakfast');
let bubblegum = new Choose('bubblegum');
let chair = new Choose('chair');
let cthulhu = new Choose('cthulhu');
let dogDuck = new Choose('dog-duck');
let dragon = new Choose('dragon');
let pen = new Choose('pen');
let petSweep = new Choose('pet-sweep');
let scissors = new Choose('scissors');
let shark = new Choose('shark');
let sweep = new Choose('sweep', 'png');
let tauntaun = new Choose('tauntaun');
let unicorn = new Choose('unicorn');
let waterCan = new Choose('water-can');
let wineGlass = new Choose('wine-glass');


getTally();

console.log(bag);

// choiceArr.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, sweep, tauntaun, unicorn, waterCan, wineGlass);
console.log(choiceArr.name);




function renderChart() {

  let choiceNames = [];
  let choiceViews = [];
  let choiceClicks = [];
  for (let i = 0; i < choiceArr.length; i++) {
    choiceNames.push(choiceArr[i].name);
    choiceViews.push(choiceArr[i].views);
    choiceClicks.push(choiceArr[i].clicks);
  }

  let labels = ["red", "orange", "yellow", "green"];

  const data = {
    labels: choiceNames,
    datasets: [{
      label: 'Views',
      data: choiceViews,
      backgroundColor: [
        'rgba(8, 91, 126)'],

      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 2
    },
    {
      label: 'Clicks',
      data: choiceClicks,
      backgroundColor: [
        'rgb(213, 192, 30)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 2
    }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        x: {
          barThickness: 150,
          grid: {
            display: false
          }
        },
        y: {
          barThickness: 150,
          grid: {
            display: false
          },
          beginAtZero: true
        }
      }
    },
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
}



renderChoice();
grid.addEventListener('click', handleClick);