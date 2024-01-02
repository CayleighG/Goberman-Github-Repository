class weapon {
  constructor (name = "None", dmg = roll4, cost = 0){
    this.name = name
    this.dmg = dmg
    this.cost = cost
  }
}

var weaponList = [
  new weapon(),
  new weapon("Stick", roll6, 2),
  new weapon ("Ball of Lint", roll4, 1),
  new weapon ("Frying Pan", roll10, 12),
  new weapon ("Dagger", roll8, 10),
  new weapon ("Banana", roll8, 2),
  new weapon("The Power of LOVE", 0, 0)
]

console.log("weaponClass.js test - ok")