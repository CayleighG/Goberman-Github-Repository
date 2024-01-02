var userChoice = document.getElementById("userChoice")
var compChoice = document.getElementById("compChoice")
var result = document.getElementById("result")
var retryButton = document.getElementById("retryButton")
var start = document.getElementById("start")
var end = document.getElementById("end")
var playerScore = document.getElementById("playerScore")
var compScore = document.getElementById("compScore")

var playerScoreCount = 0
var compScoreCount = 0

end.style.display = "none"

//Player Chooses Rock
function rock() {
  start.style.display = "none"
  end.style.display = "block"

  userChoice.innerHTML = "You chose rock!"
  
  userPic.src = "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/Limestone-060-RD010-C-SH_by22j3.jpg"
  userPic.style.height = "40%"
  userPic.style.width= "40%"

  //Computer Selects an Option
  function roll3() {
    var compRoll = Math.ceil(Math.random()*3);
    console.log(compRoll);

    if (compRoll == 1) {
      compChoice.innerHTML = "Your opponent chose rock!"
      compPic.src = "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/Limestone-060-RD010-C-SH_by22j3.jpg"
      compPic.style.height = "40%"
      compPic.style.width= "40%"

      result.innerHTML = "It's a Tie!"
    }
    if (compRoll == 2) {
      compChoice.innerHTML = "Your opponent chose paper!"
      compPic.src = "https://www.collinsdictionary.com/images/full/paper_111691001.jpg"
      compPic.style.height = "40%"
      compPic.style.width= "40%"

      compScoreCount += 1
      result.innerHTML = "Sorry! You lost!"
    }
    if (compRoll == 3) {
      compChoice.innerHTML = "Your opponent chose scissors!"
      compPic.src = "https://embed.widencdn.net/img/worldkitchen/2kdgdhwdyy/650x650px/ZD_1143923_9in-Fabric-Scissors_Silo_Square_1_v2.png"
      compPic.style.height = "40%"
      compPic.style.width= "40%"

      playerScoreCount += 1
      result.innerHTML = "Yay! You win!"
    }
  }

  return roll3();
};

//Player Chooses Paper
function paper() {
  start.style.display = "none"
  end.style.display = "block"

  userChoice.innerHTML = "You chose paper!"
  
  userPic.src = "https://www.collinsdictionary.com/images/full/paper_111691001.jpg"
  userPic.style.height = "40%"
  userPic.style.width= "40%"

  //Computer Selects an Option
  function roll3() {
    var compRoll = Math.ceil(Math.random()*3);
    console.log(compRoll);

    if (compRoll == 1) {
      compChoice.innerHTML = "Your opponent chose rock!"
      compPic.src = "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/Limestone-060-RD010-C-SH_by22j3.jpg"
      compPic.style.height = "40%"
      compPic.style.width= "40%"

      playerScoreCount += 1
      result.innerHTML = "Yay! You win!"
    }
    if (compRoll == 2) {
      compChoice.innerHTML = "Your opponent chose paper!"
      compPic.src = "https://www.collinsdictionary.com/images/full/paper_111691001.jpg"
      compPic.style.height = "40%"
      compPic.style.width= "40%"

      result.innerHTML = "It's a Tie!"
    }
    if (compRoll == 3) {
      compChoice.innerHTML = "Your opponent chose scissors!"
      compPic.src = "https://embed.widencdn.net/img/worldkitchen/2kdgdhwdyy/650x650px/ZD_1143923_9in-Fabric-Scissors_Silo_Square_1_v2.png"
      compPic.style.height = "40%"
      compPic.style.width= "40%"

      compScoreCount += 1
      result.innerHTML = "Sorry! You lost!"
    }
  }

  return roll3();
};

//Player Chooses Scissors
function scissors() {
  start.style.display = "none"
  end.style.display = "block"

  userChoice.innerHTML = "You chose scissors!"
  
  userPic.src = "https://embed.widencdn.net/img/worldkitchen/2kdgdhwdyy/650x650px/ZD_1143923_9in-Fabric-Scissors_Silo_Square_1_v2.png"
  userPic.style.height = "30%"
  userPic.style.width= "30%"

  //Computer Selects an Option
  function roll3() {
    var compRoll = Math.ceil(Math.random()*3);
    console.log(compRoll);

    if (compRoll == 1) {
      compChoice.innerHTML = "Your opponent chose rock!"
      compPic.src = "https://res.cloudinary.com/dk-find-out/image/upload/q_80,w_1920,f_auto/Limestone-060-RD010-C-SH_by22j3.jpg"
      compPic.style.height = "30%"
      compPic.style.width= "30%"

      compScoreCount += 1
      result.innerHTML = "Sorry! You lost!"
    }
    if (compRoll == 2) {
      compChoice.innerHTML = "Your opponent chose paper!"
      compPic.src = "https://www.collinsdictionary.com/images/full/paper_111691001.jpg"
      compPic.style.height = "30%"
      compPic.style.width= "30%"

      playerScoreCount += 1
      result.innerHTML = "Yay! You win!"
    }
    if (compRoll == 3) {
      compChoice.innerHTML = "Your opponent chose scissors!"
      compPic.src = "https://embed.widencdn.net/img/worldkitchen/2kdgdhwdyy/650x650px/ZD_1143923_9in-Fabric-Scissors_Silo_Square_1_v2.png"
      compPic.style.height = "30%"
      compPic.style.width= "30%"

      result.innerHTML = "It's a Tie!"
    }
  }

  return roll3();
};

function retry() {
  playerScore.innerHTML = "Player: " + playerScoreCount;
  compScore.innerHTML = "Computer: " + compScoreCount;
  start.style.display = "block"
  end.style.display = "none"
};

function resetScore() {
  playerScoreCount = 0;
  compScoreCount = 0;
  playerScore.innerHTML = "Player: " + playerScoreCount;
  compScore.innerHTML = "Computer: " + compScoreCount;
}