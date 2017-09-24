// Creates top scope local variables //
var colors, colorsNum, count, box1, box2, box3, tempHighlight, firstBoxColor, grid, clickCount, firstBoxHash, light, firstBoxName;

// Initializes top scope local variables //
  colors = ["#009933", "#009999", "#3366ff", "#ff00ff", "#ff5050", "#99cc00", "#ff9999", "#cc66ff", "#66ffff", "#cc66ff"];
  colorNum = 0;
  count = 0;
  clickCount = 0;
  firstSelection = {};
  light = ["box1", "box3", "box6", "box8", "box9", "box11", "box14", "box16"];
  firstBoxName = "";


function initialize() {
  var arrPairs = [],
      arrRand = [],
      boxes = {},
      randHash = {};

  // Create an array filled with pairs with a default size of 8 pairs aka 16 squares
  function createArrPairs(num = 8) {
    for (i = 0 ; i < num ; i++) {
      for (j = 0 ; j < 2 ; j++) {
        arrPairs.push(i + 1);
      };
    };
  };

  // Create an array of randomized numbers with a default size of 16 numbers
  function createArrBoxes(num = 16) {
    while (arrRand.length < num) {
      var rand = Math.floor(Math.random() * 16);
      if (!arrRand.includes(rand)) {
        arrRand.push(rand);
      };
    };
  };

  // Creates hash for each box and settings //
  function creatHash(num = 16) {
    for (i = 0 ; i < num ; i++) {
      boxes['box' + i] = { 'name': 'box' + i , 'color': colors[arrPairs[i]], 'rand': arrRand[i], 'num': arrPairs[i] };
    };
  };

  // Creates grid of based on hash's random number //
  function creatGridArr(num = 16) {
    for (i = 0 ; i < num ; i++) {
      var id = boxes['box' + i];
      randHash['box' + id.rand] = { 'color': id.color, 'num': id.num, "found": 0 };
    }
  }

  createArrPairs();
  createArrBoxes();
  creatHash();
  creatGridArr();

  return randHash;
};

// Initializes grid for game //
grid = initialize();
// console.log(grid);
// console.log(Object.keys(grid));


// steps box id number down one //
function numAdjust(name) {
  return "box" + (Number(name.slice(3)) - 1);
}



// On MOuse click //
function changeBoxColor(name) {
  // gets original background color for temp storage //
  var color = light.includes(name) ? "#f2f2f2" : "#d9d9d9";

  // steps box id number down one for proper matching in grid //
  var adjust = numAdjust(name);
  var box = grid[adjust];

  // Skips round if box is already matched or is the same box //
  if (box.found === 1 || name === firstBoxName) {
    return;
  }

  // incremeants succesful clicks //
  clickCount += 1;

  // Reveal selected box //
  document.getElementById(name).textContent = box.num;
  // document.getElementById(name).style.backgroundColor = box.color;
  // console.log("cat" + box.num + ".png");
  // var pic = "url('assets/cats/cat" + box.num + ".png')";
  var pic = "url('assets/koi/koi" + box.num + ".png')";
  document.getElementById(name).style.backgroundImage = pic;


  // Creates a round for matching pairs //
  if (count > 0) {

    // Checks for match //
      if (firstBoxHash.num === box.num) {

        // If match, marks boxes as found and checks for win //
        box["found"] = 1;
        firstBoxHash["found"] = 1;
        win();
        // console.log(win());

      } else {
        // Otherwise, show both boxes together for half a second and then hide them again //
        setTimeout(function() {
          document.getElementById(firstBoxName).textContent = ".";
          document.getElementById(firstBoxName).style.backgroundImage = "url('')";
          document.getElementById(name).textContent = ".";
          document.getElementById(name).style.backgroundImage = "url('')";
        }, 500);
      }
    count = 0;

  } else {
    // First box selected parameters saved in varibables for comparision on second pass //
    firstBoxName = name;
    firstBoxHash = box;
    firstBoxColor = color;
    count += 1;
  }

  // Udpates click count on screen //
  document.getElementById("click-number").textContent = clickCount;
}


// Controls highlithing of box on mouse enter //
function highlight(name) {

  // steps box id number down one for proper matching in grid //
  var adjust = numAdjust(name);
  var box = grid[adjust];

  // Highlights if hidden //
  if (box.found === 0) {
    document.getElementById(name).style.borderColor = "yellow";
  }
}


// Controls hightlighting whne mouse moves leave //
function unhighlight(str) {
  document.getElementById(str).style.borderColor = "white" ;
}

// Checks for WIN status //
function win() {
  var winCount = 0;
  var arrWin = Object.keys(grid);

  // Counts each found box //
  arrWin.forEach (function(el) {
    if (grid[el].found === 1) {
      winCount += 1;
    }
  });

  // Checks if all boxes have been found //
  if (winCount === arrWin.length) {
    for (i = 1 ; i <= 16 ; i += 1) {
      var box = "box" + i;
      document.getElementById(box).style.visibility = "hidden";
    }


    // Outputs win //
    document.getElementById("table-background").style.backgroundImage = "url('./assets/koi/background.png')";
    // document.getElementById("table-background").style.backgroundImage = "url('./assets/cats/background.png')";
    // document.getElementById("win").textContent = "You Win!";
    // console.log("You Win!");
  }

  // Returns empty string to avoid "undefined" in console;
  return "";
}










//
