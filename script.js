// Get  to DOM elements
const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image");

const playerHPElement = document.getElementById("player-hp");
const enemyHPElement = document.getElementById("enemy-hp");

let playerHP = 3;
let enemyHP = 3;

// Update the health display
function updateHealth() {
  playerHPElement.textContent = playerHP;
  enemyHPElement.textContent = enemyHP;
}

const playerScoreElement = document.getElementById("player-score");
const enemyScoreElement = document.getElementById("enemy-score");

let playerScore = 0;
let enemyScore = 0;

// Update the score board
function updateScore() {
  playerScoreElement.textContent = playerScore;
  enemyScoreElement.textContent = enemyScore;
}

// Function to reset the game
function resetGame() {
  playerHP = 3;
  enemyHP = 3;
  updateHealth();
  result.textContent = "Let's Play!!";
}

// Loop through each option image element
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    if (playerHP === 0 || enemyHP === 0) {
        return; // Game over, do not allow further plays
    }
    image.classList.add("active");

    userResult.src = cpuResult.src = "images/rock.png";
    result.textContent = "Wait...";

    // Loop through each option image again
    optionImages.forEach((image2, index2) => {
      // If the current index doesn't match the clicked index
      // Remove the "active" class from the other option images
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    // Set a timeout to delay the result calculation
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");

      // Get the source of the clicked option image
      let imageSrc = e.target.querySelector("img").src;
      // Set the user image to the clicked option image
      userResult.src = imageSrc;

      // Generate a random number between 0 and 2
      let randomNumber = Math.floor(Math.random() * 3);
      // Create an array of CPU image options
      let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
      // Set the CPU image to a random option from the array
      cpuResult.src = cpuImages[randomNumber];

      // Assign a letter value to the CPU option (R for rock, P for paper, S for scissors)
      let cpuValue = ["R", "P", "S"][randomNumber];
      // Assign a letter value to the clicked option (based on index)
      let userValue = ["R", "P", "S"][index];

      // Create an object with all possible outcomes
      let outcomes = {
        RR: "Draw",
        RP: "Cpu",
        RS: "User",
        PP: "Draw",
        PR: "User",
        PS: "Cpu",
        SS: "Draw",
        SR: "Cpu",
        SP: "User",
      };

      // Look up the outcome value based on user and CPU options
      let outComeValue = outcomes[userValue + cpuValue];

      // Display the result
      result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;

// Inside the timeout after determining the winner:
if (userValue === cpuValue) {
    result.textContent = "Match Draw";
  } else {
    // The player wins
    if (outComeValue === "User") {
      enemyHP -= 1;
    }
    // The CPU wins
    else if (outComeValue === "Cpu") {
      playerHP -= 1;
    }

    updateHealth();

    if (playerHP === 0) {
      result.textContent = "Enemy Wins!";
      enemyScore += 1;
      updateScore();
    } else if (enemyHP === 0) {
      result.textContent = "Player Wins!";
      playerScore += 1;
      updateScore();
    }

    if (playerHP === 0 || enemyHP === 0) {
      // Delay game reset
      setTimeout(() => {
        resetGame();
        gameContainer.classList.remove("start");
      }, 1000);
    } else {
      result.textContent = `${outComeValue} Won!!`;
    }
  }
    }, 1000);
  });
});

