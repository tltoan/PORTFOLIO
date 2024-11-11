document.addEventListener("DOMContentLoaded", function () {
  generateLines("POOKIE");
});

document.getElementById("retry-button").addEventListener("click", function () {
  // Hide the game over modal
  document.getElementById("game-over-modal").style.display = "none";
  location.reload();
});

let userInput = "";
let userLives = 6;
let wordoftheday = "POOKIE";
let match = true;

function generateLines(word) {
  const lineContainer = document.getElementById("line-container");
  if (lineContainer) {
    lineContainer.innerHTML = "";

    for (let i = 0; i < word.length; i++) {
      const letterContainer = document.createElement("div");
      const line = document.createElement("div");
      const letter = document.createElement("div");
      letterContainer.classList.add("letter-container");
      letter.classList.add("letter");
      line.classList.add("line");
      letter.textContent = word.charAt(i);
      letterContainer.appendChild(letter);
      letterContainer.appendChild(line);
      lineContainer.appendChild(letterContainer);
    }
  }
}

let keys = document.querySelectorAll(".key");
keys.forEach(function (key) {
  key.addEventListener("click", function (event) {
    let character = event.target.innerText;
    console.log("Character added: " + character);
    console.log("Word of the day is " + wordoftheday);
    if (wordoftheday.includes(character)) {
      console.log("The character " + character + " is in the word of the day.");
      userInput += character;
      console.log("User input: " + userInput);
      let match = true;
      let letters = document.querySelectorAll(".letter");
      console.log(letters);
      letters.forEach(function (letter) {
        letter.innerHTML = letter.innerHTML.toUpperCase();
        if (letter.textContent === character) {
          letter.style.visibility = "visible";
          letter.classList.add("visible");
        }
        if (wordoftheday.includes(character)) {
          event.target.style.backgroundColor = "#3FCE56";
        }
      });
      for (let i = 0; i < wordoftheday.length; i++) {
        if (!userInput.includes(wordoftheday[i])) {
          match = false;
          break;
        }
      }
      if (match) {
        console.log("All characters in wordoftheday are in userInput");
        const winModal = document.getElementById("win-modal");
        winModal.style.display = "block";
        setTimeout(function () {
          winModal.style.display = "none";
        }, 1500);
      } else {
        console.log("Not all characters in wordoftheday are in userInput");
      }
    } else {
      console.log(
        "The character " + character + " is not in the word of the day."
      );
      userLives--;
      if (userLives === 5) {
        document.getElementById("hang-man-head").style.opacity = "100";
      } else if (userLives === 4) {
        document.getElementById("hang-man-body-upper").style.opacity = "100";
      } else if (userLives === 3) {
        document.getElementById("hang-man-left-arm").style.opacity = "100";
      } else if (userLives === 2) {
        document.getElementById("hang-man-right-arm").style.opacity = "100";
      } else if (userLives === 1) {
        document.getElementById("hang-man-left-leg").style.opacity = "100";
      } else if (userLives === 0) {
        document.getElementById("hang-man-right-leg").style.opacity = "100";
        document.getElementById("game-over-modal").style.display = "block";
      }
      console.log("User lives: " + userLives);
      event.target.style.backgroundColor = "#F94A48";
    }
  });
});

let backspace = document.getElementById("back-space");
let enter = document.getElementById("enter");

const input = document.querySelector(".input-container");

window.addEventListener("keydown", function (e) {
  for (let i = 0; i < keys.length; i++) input.appendChild(keys[i].innerHTML);
});
