class armor {
  constructor (name = "None", AC=10, cost = 0){
    this.name = name
    this.AC=AC
    this.cost = cost
  }
}

var armorList = [
  new armor(),
  new armor("Long Blue Scarf", 6, 10),
  new armor("Bandana", 5, 5),
  new armor("Banana", 9, 2),
  new armor("Light Chainmail Vest", 8, 15),
]

console.log("armor.js test - ok")