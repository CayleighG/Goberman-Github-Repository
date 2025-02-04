function startAdventure () {

      var playerName = prompt("What is your adventurer's name?")
      alert("Welcome to the adventure, " + playerName + "!")
      banner.style.display = "none"
      mainPic.style.display = "block"
      controlButtons.style.display = "block"
      playerStatsTable.style.display = "block"
      playerStatsTable.style.display= "revert"

      player1.name = playerName;
      nameLabel.innerHTML = player1.name
      player1.updateStats();
    };

function attack() {

      if (inBattle == true){

      var playerRoll = roll100()
      var monsterRoll = roll100()
      sysPrompt1.innerHTML = "You roll a " + playerRoll;
      sysPrompt1.innerHTML+=" and the monster rolls a " + monsterRoll +"!"

      if (playerRoll > monsterRoll){
        var dmg = player1.weapon.dmg()
        sysPrompt2.innerHTML = "You strike the monster! It lost " +dmg + " hp!"
        monster.hp -= dmg
      }

      else if (monsterRoll > playerRoll){
        var monsterdmg = monster.dmg()
        sysPrompt2.innerHTML = "The monster hits you! You lost " + monsterdmg + " hp!"
        player1.hp = player1.hp - monsterdmg
      }

      else if (playerRoll == monsterRoll){
        var dmg = player1.weapon.dmg()
        var monsterdmg = monster.dmg()
        player1.hp = player1.hp - monsterdmg
        monster.hp = monster.hp - dmg
        sysPrompt2.innerHTML = "You both hit each other! You lost " + monsterdmg + " hp and the monster lost " + dmg + " hp!"
      }}
    else {sysPrompt1.innerHTML = "You okay? There's no monster. You can only find them in the forest. No need to act all hostile when there's nothing here."}
    player1.updateStats();
    updateMonsterStats();
    player1.deathChecker();
    monsterDeathCheck();
    }

var inventory = [" Frying Pan", " Band Aid (Heals 10 HP)", " Long Scarf", " Ball of Lint (Might Be Useful)", " Stick-That-is-Kinda-Shaped-Like-a-Horse"]

  var player1 = {

    name: "Name your adventurer!",
    hp: 24,
    weapon: weaponList[0],
    armor: armorList[0],
    lvl: 1,
    xp: 0,
    gold: 0,
    updateStats: function () {
      levelLabel.innerHTML = player1.lvl
      healthLabel.innerHTML = player1.hp
      xpLabel.innerHTML = player1.xp
      goldLabel.innerHTML = player1.gold

      monsterNameLabel.innerHTML = monster.name
      monsterHealthLabel.innerHTML = monster.hp
      }, 
    deathChecker: function () {
      if (player1.hp<1){
        inBattle = false
        mainPic.src = "/images/gravestone.png"
        controlButtons.style.display = "none"
        sysPrompt3.innerHTML = "Oh no! You somehow managed to be beaten up by a fungus! Better luck next time!"
        monsterStatsTable.style.display = "none"
        playerStatsTable.style.display = "none"
      }
    }
  }

function enterArena(){
    mainPic.src = "/images/Mushroom.png"
    mainPic.style.height = "75%"
    mainPic.style.width= "75%"
    sysPrompt1.innerHTML = "You tripped over a large fungi and it bit your foot. Ow."
    sysPrompt2.innerHTML = "A Malicious Mushroom appeared!"
    inBattle = true;
    monsterStatsTable.style.display = "block"
    monsterStatsTable.style.display = "revert"
  }

function printInventory(){
  sysPrompt1.innerHTML = "Inventory:"
  sysPrompt2.innerHTML = inventory
  }

console.log("playerCharacter.js test - ok")