    var banner = document.getElementById("banner")
    var mainPic = document.getElementById("mainPic")
    var controlButtons = document.getElementById("controlButtons")
    var sysPrompt1 = document.getElementById("sysPrompt1")
    var sysPrompt2 = document.getElementById("sysPrompt2")
    var sysPrompt3 = document.getElementById("sysPrompt3")

    var playerStatsTable = document.getElementById("playerStatsTable")
    var nameLabel = document.getElementById("nameLabel")
    var levelLabel = document.getElementById("levelLabel")
    var healthLabel = document.getElementById("healthLabel")
    var xpLabel = document.getElementById("xpLabel")
    var goldLabel = document.getElementById("goldLabel")

    var slainMonsterList = []

    var monsterStatsTable = document.getElementById("monsterStatsTable")
    var monsterNameLabel = document.getElementById("monsterNameLabel")
    var monsterHealthLabel = document.getElementById("monsterHealthLabel")
    var inBattle = false;

    mainPic.style.display = "none"
    controlButtons.style.display = "none"
    playerStatsTable.style.display = "none"
    monsterStatsTable.style.display = "none"

    function onClick () {
      alert("Yay! You clicked a button! :D")
    };

    //The three types of variables are integers (a number), strings (a group of letters or 123 numbers in quotations), and booleans (true or false).

console.log("pageSetup.js test - ok")