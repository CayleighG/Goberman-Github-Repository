class monsterClass {
  constructor (name = "None", hp = roll8(), gold = roll8(), xp = 10, weapon = weaponList[0], armor = armorList[0]){
    this.name = name
    this.hp = hp
    this.gold = gold
    this.xp = xp
    this.weapon = weapon
    this.armor = armor
  }
}

  var monster = {
    
    name: "Monster",
    hp: 16,
    dmg: function () {return roll4()},
    lvl: 1,
    xp: 5,
    gold: 5,

  }
  
function monsterDeathCheck(){
  if (monster.hp<=0){
    sysPrompt1.innerHTML = "Ew. Mushroom goo."
    sysPrompt2.innerHTML = "You slayed the monster! Congratulations!"
    inBattle = false
    mainPic.src = "/images/forest.jpg"
    player1.xp +=monster.xp
    player1.gold +=monster.gold
    monsterStatsTable.style.display = "none"
    player1.updateStats()
    
  }
}

function updateMonsterStats() {
  monsterNameLabel= monster.name;
  monsterHealthLabel.innerHTML = monster.hp;
}

console.log("monsterClass.js test - ok")