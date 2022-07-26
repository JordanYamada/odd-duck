'use strict'

// Global Variables

let clickCount = 0;
let clickMax = 25;
let choiceArr = [];
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


}

// Functions

function getRandom() {
  return Math.floor(Math.random() * choiceArr.length);
}

function renderChoice() {
  let choice1 = getRandom();
  let choice2 = getRandom();
  let choice3 = getRandom();
  while ((choice1 === choice2)|| (choice2 === choice3)) {
    choice2 = getRandom();
    while ((choice3 === choice1) || (choice3 === choice2)) {
      choice3 = getRandom();
    }
  }
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
  if (event.target === grid) {
    alert('Please click on an image');
  }
  clickCount++;
  let chosen = event.target.alt;
  console.log(chosen);

  for (let i = 0; i < choiceArr.length; i++) {
    if (chosen === choiceArr[i].name) {
      choiceArr[i].clicks++;
      break;
    }
  }
  renderChoice();
  // if (clickCount === clickMax) {
  //   myButton.className = 'clicks-allowed';
  //   grid.removeEventListener('click', handleClick);
  //   myButton.addEventListener('click', handleButtonClick);
  // }
}

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

console.log(bag);

choiceArr.push(bag,banana,bathroom,boots,breakfast,bubblegum,chair,cthulhu,dogDuck,dragon,pen,petSweep,scissors,shark,sweep,tauntaun,unicorn,waterCan,wineGlass);
console.log(choiceArr.name);

renderChoice();
grid.addEventListener('click', handleClick);