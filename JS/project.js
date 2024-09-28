let secret, maxNumber, credits;

const difficultySelect = document.getElementById("difficulty-select");
const reset = document.querySelector(".button_reset");
const levelCredits = document.querySelector(".credits");

function setDifficulty(level) {
  if (level === "easy") {
    maxNumber = 50;
    credits = 10;
  } else if (level === "medium") {
    maxNumber = 100;
    credits = 7;
  } else if (level === "hard") {
    maxNumber = 200;
    credits = 5;
  }

  secret = Math.trunc(Math.random() * maxNumber) + 1;
  updateCreditsDisplay();
  document.querySelector(".hint").textContent = "Guess the Number!";
  document.querySelector(".credits").style.color = "#333";
}

function updateCreditsDisplay() {
  levelCredits.textContent = `Credits: ${credits}`;
}

document.querySelector(".button").addEventListener("click", function () {
  const input = Number(document.querySelector(".input input").value);

  if (input === 0 && credits !== 0) {
    document.querySelector(".hint").textContent = "Try Entering a Number first";
  } else if (input === secret && credits !== 0) {
    document.querySelector(".hint").textContent = "You Won";
    document.querySelector("#result-message").style.color = "#60b347";
    document.querySelector(".credits").style.color = "#60b347";
    showResultModal("You Won!!");
  } else if (input > secret && credits !== 0) {
    document.querySelector(".hint").textContent = "TOO High!";
    credits--;
    updateCreditsDisplay();
  } else if (input < secret && credits !== 0) {
    document.querySelector(".hint").textContent = "TOO Low!";
    credits--;
    updateCreditsDisplay();
  } else if (credits === 0) {
    document.querySelector(".hint").textContent = "You Lost";
    showResultModal(`You lost! ${secret} was the correct number`);
    document.querySelector(".credits").style.color = "#ff0000";
    document.querySelector("#result-message").style.color = "#ff0000";
  }
});

function showResultModal(message) {
  let modal = document.getElementById("result-modal");
  document.getElementById("result-message").innerText = message;
  modal.style.display = "block";
}

document
  .querySelector("#result-modal .close")
  .addEventListener("click", function () {
    document.getElementById("result-modal").style.display = "none";
  });

if (reset) {
  reset.addEventListener("click", function () {
    setDifficulty(difficultySelect.value);
  });
}

setDifficulty("medium");

difficultySelect.addEventListener("change", function () {
  setDifficulty(difficultySelect.value);
});
document
  .getElementById("Signup-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/signup_login";
  });
