const secret = Math.trunc(Math.random() * 100) + 1;
let credits = 7;

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
    document.querySelector(".hint ").textContent = "TOO High !";

    updateCreditsDisplay();
  } else if (input < secret && credits !== 0) {
    document.querySelector(".hint ").textContent = "TOO Low !";

    updateCreditsDisplay();
  } else {
    document.querySelector(".hint ").textContent = "You Lost";
    showResultModal(`You lost ! ${secret} was the correct number`);
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

function updateCreditsDisplay() {
  credits--;
  document.querySelector(".credits").textContent = `Credits: ${credits}`;
}
