var heatseeker = false;
var computerBossAlive=true;
var tempAngle
var tempVelocity
var currentBossProjectile
var greyRect
var purpleRect
var wiresProjectileAnim




class Projectile extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene, x, y) {
		
    super(scene, x, y, projectileType);
	} 
  

	fire(x, y, ) {
		this.body.reset(x, y);
		this.setActive(true);
		this.setVisible(true);
    

		this.setVelocity(bossProjectileVelocityX, bossProjectileVelocityY);
if (heatseeker==true){
    
const tx = player.x
const ty = player.y

// enemy's x, y
const x = currentBossRef.x
const y = currentBossRef.y

var rotation = Phaser.Math.Angle.Between(x, y, tx, ty)

// use rotation...
   this.setVelocityX((Math.cos(rotation) * 600));
    this.setVelocityY((Math.sin(rotation) * 600));

//const vec = new Phaser.Math.Vector2(tx - x, ty - y)
 //rotation = vec.angle()
  //this.setRotation(rotation)
//this.setB

      
    }
  }
    
   
 
     

       
         
         
	
  preUpdate(time, delta) {
		super.preUpdate(time, delta);
 
		if (this.y <= 0 || this.y>900 || this.x<0 || this.x>900) {
			this.setActive(false);
			this.setVisible(false);
		}
	}

}

class BossProjectileGroup extends Phaser.Physics.Arcade.Group
{
	constructor(scene) {
		super(scene.physics.world, scene);
  
		this.createMultiple({
			frameQuantity: 10,
			key: projectileType,
			active: true,
			visible: true,
			classType: Projectile
		});
  
	}

	fireBullet(x, y) {
		const projectile = this.getFirstDead(false);
    currentBossProjectile = projectile
		if(projectile) {
      
			projectile.fire(x, y);
    
       
       if (heatseeker==true){



  
} 
      
		}
	}
}

var SceneTwo = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneTwo" });
    },
    init: function() {},
    preload: function() {
       mapArea=1
this.load.image("tiles", "images/customTiles.png")
this.load.spritesheet("wires", "wiresProjectile.png")
this.load.spritesheet("playerHealthBar", "images/playerHealthBar.png", {frameWidth: 266, frameHeight: 46,})
this.load.spritesheet("inventory", 'images/inventory.png', {frameWidth: 100, frameHeight: 140,})
this.load.spritesheet("remainingBossesText", "images/remainingBossesText.png", {frameWidth: 100, frameHeight: 15,})
      
    },
    create: function() {

      //Wires Projectile

        var text = this.add.text(
            640, 
            360, 
            "Hello World", 
            {
                fontSize: 50,
                color: "#000000",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);

        const level = [
    [  24,   24,   24,   24,   24,   24,   24,   24,   24,   24,   24, ],
    [  24,   24,   24,   24,   24,   24,   24,   24,   24,   24,   24, ],
    [  24,   24,   24,   24,   24,   24,   24,   24,   24,   24,   24, ],
    [  24,   24,   24,   24,   24,   24,   24,   24,   24,   24,   24, ],
    [  24,   24,   24,   24,   24,   24,   24,   24,   24,   24,   24, ],
    [  24,   24,   24,   24,   24,   24,   24,   24,   24,   24,   24, ],
    [  24,   24,   24,   24,   24,   24,   24,   24,   24,   24,   24, ],
    [  13,   13,   13,  13,  13,  13,  13,   13,   13,   13,   13 ],
    [  13,   13,   13,   13,   13,   13,   13,   13,   13,   13,   13 ],
    [ 13,   13,   13,  13,   13,   13,   13,   13,  13,   13,   13 ],
    [ 13,   13,   13,  13,  13,  13,  13,  13,  13,   13,   13, ]
  ];


	

//Map constants
  const map = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });
  

  const tiles = map.addTilesetImage("tiles");
  const layer = map.createLayer(0, tiles, 140, 0);
  var border = map.border
      playerHealth = 100
      bossHealth = 100

	bossProjectileGroup = new BossProjectileGroup(this);


//Computer Boss Code
var computerBossIdle = 
       { key: 'computerBossIdle',
        frames: this.anims.generateFrameNumbers('computerBoss', { start: 0, end: 12, first: 0 }),
        frameRate: 6,
        repeat: -1}

this.anims.create(computerBossIdle);

var computerBossBattleEnd = 
       { key: 'computerBossBattleEnd',
        frames: this.anims.generateFrameNumbers('computerBoss', { start: 13, end: 14, first: 0 }),
        frameRate: 6,
        repeat: -1}
        
this.anims.create(computerBossBattleEnd)

var computerBossBluescreen = 
       { key: 'computerBossBluescreen',
        frames: this.anims.generateFrameNumbers('computerBoss', { start: 18, end: 18, first: 0 }),
        frameRate: 6,
        repeat: -1}
        
this.anims.create(computerBossBluescreen)
 var wiresProjectileAnim = 
  { key: 'wiresProjectileAnim',
        frames: this.anims.generateFrameNumbers('wiresProjectile', { start: 0, end: 15, first: 0 }),
        frameRate: 10,
        repeat: -1}

this.anims.create(wiresProjectileAnim);


//Book Boss
var bookBossIdle = 
       { key: 'bookBossIdle',
        frames: this.anims.generateFrameNumbers('bookBoss', { start: 0, end: 5, first: 0 }),
        frameRate: 8,
        repeat: -1}

this.anims.create(bookBossIdle)

//Transition Anim 2
var transitionAnim2 = 
       { key: 'transitionAnim2',
        frames: this.anims.generateFrameNumbers('transition2', { start: 0, end: 88, first: 0 }),
        frameRate: 48,
        repeat: 1}

this.anims.create(transitionAnim2);

//Inventory Animations
var blankInven = 
  { key: 'blankInven',
        frames: this.anims.generateFrameNumbers('inventory', { start: 0, end: 0, first: 0 }),
        frameRate: 0,
        repeat: 0}

this.anims.create(blankInven);

var onlyPlaceholder = 
  { key: 'onlyPlaceholder',
        frames: this.anims.generateFrameNumbers('inventory', { start: 1, end: 1, first: 1 }),
        frameRate: 0,
        repeat: 0}

this.anims.create(onlyPlaceholder);

////Remaining Bosses Text Animations
var basicRemainingBossesText = 
  { key: 'basicRemainingBossesText',
        frames: this.anims.generateFrameNumbers('remainingBossesText', { start: 0, end: 59, first: 0 }),
        frameRate: 24,
        repeat: 0}

this.anims.create(basicRemainingBossesText);

var remainingBosses0 = 
  { key: 'remainingBosses0',
        frames: this.anims.generateFrameNumbers('remainingBossesText', { start: 60, end: 60, first: 60 }),
        frameRate: 1,
        repeat: 0}

this.anims.create(remainingBosses0);

var remainingBosses1 = 
  { key: 'remainingBosses1',
        frames: this.anims.generateFrameNumbers('remainingBossesText', { start: 61, end: 61, first: 61 }),
        frameRate: 1,
        repeat: 0}

this.anims.create(remainingBosses1);

var remainingBosses2 = 
  { key: 'remainingBosses2',
        frames: this.anims.generateFrameNumbers('remainingBossesText', { start: 61, end: 61, first: 61 }),
        frameRate: 1,
        repeat: 0}

this.anims.create(remainingBosses2);

//Player Health Bar
var playerHealthBarIdle = 
  { key: 'playerHealthBarIdle',
        frames: this.anims.generateFrameNumbers('playerHealthBar', { start: 0, end: 0, first: 0 }),
        frameRate: 5,
        repeat: 1}

this.anims.create(playerHealthBarIdle);


      


//Computer Boss
computerBoss = this.physics.add.sprite(316, 90, 'computerBoss').play('computerBossIdle').setSize(63, 48).setOffset(0, 6);
computerBoss.enableBody = true;
computerBoss.vx = 0
computerBoss.vy = 0
computerBoss.scale = 2



  
  bookBoss = this.physics.add.sprite(316, 95, 'bookBoss').play('bookBossIdle').setSize(63, 48).setOffset(0, 6);

   historyBoss = this.physics.add.sprite(316, 95, 'historyBoss').play('historyBossIdle').setSize(63, 48).setOffset(0, 6);

  bookBoss.vx = 0
  bookBoss.vy = 0
  bookBoss.scale = 1.20

  computerBoss.visible = false;
  computerBoss.enableBody = false;
  bookBoss.enableBody = false;
  bookBoss.visible = false;
  historyBoss.enableBody = false;
  historyBoss.visible = false;

      
door = this.physics.add.sprite(316,90, 'door')
door.visible = false

//Player Code
     // var wires = this.physics.add.sprite(300,290, 'wires')
  player = this.physics.add.sprite(310, 320, 'player').play('idle').setSize();
  player.enableBody = true;
  player.setCollideWorldBounds(true);

  player.vx = 0
  player.vy = 0
  player.scale = 0.5
this.debug = this.add.graphics();
  
//Space Bar Prompt
spaceBarPrompt = this.add.image(400,32,"pressSpaceBar")
spaceBarPrompt.scale = 1.5
spaceBarPrompt.visible = false


this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 1
        });


//Remaining Bosses Text
remainingBossesText = this.physics.add.sprite(140, 40, 'remainingBossesText')
remainingBossesText.scale = 2.5
remainingBossesText.visible = false
      
//Inventory
inventory = this.physics.add.sprite(72, 100, 'inventory')
inventory.scale = 1.38
inventory.visible = false

//Health Bar Outline
playerHealthBarOutline = this.physics.add.sprite(180, 424, 'playerHealthBar').play('playerHealthBarIdle')
playerHealthBarOutline.visible = true
bossActive = true;
allowShoot = true;
//Colliders and Overlap

      

      this.physics.add.overlap (player, door,  loadMap, null, this);
      this.physics.add.overlap (bossProjectileGroup, player, damagePlayer, null, this)

//Control Keys
  keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
      this.input.on('pointerdown', shoot, this);
timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this});
    loadBoss(currentBoss)

 if (currentBoss=="computerBoss"){
bossProjectileGroup.children.iterate(function (child) {
  child.anims.play(wiresProjectileAnim)
  console.log("animation applied to projectile in group")
})}
  },
    update: function() {
      //Cursers and Stuff
   // if (currentBoss==computerBoss){setvisibilitytrueforcomputerboss}
   //  if (currentBoss==bookBoss){setvisibilityforbookbosstotrue}     this.physics.add.overlap (player, computerBoss,  setCurrentBoss(computerBoss), null, this); 
 const size = 0;

 //Health Bars
this.debug.clear();
        greyRect = this.debug.fillStyle(0x2d2d2d); //makes a grey rectangle
        greyRect.fillRect(computerBoss.x-100, computerBoss.y-80, 200, 10);

       purpleRect = this.debug.fillStyle(0x5b0073); //makes a purple rectangle
        purpleRect.fillRect(computerBoss.x-100, computerBoss.y-80, bossHealth*2, 10);

   //  greyRect.visible = true;
   // purpleRect.visible = true;
      var playerBaseRect = this.debug.fillStyle(0x2d2d2d); //grey
        this.debug.fillRect(x = 108, y = 420, 200, 10);

        var playerMainRect = this.debug.fillStyle(0x5b0073); //purple
        this.debug.fillRect(x = 108, y = 420, playerHealth*2, 10);

      //
  if (bossHealth <= 0){
    greyRect.visible = false
    purpleRect.visible = false
    /*if (bBossAlive = false){
      bookBoss.visible = false
    }*/
    bossActive=false;
    if (currentBoss=="historyBoss"){
      historyBoss.visible = false;
      historyBoss.bodyEnable = false;
      hBossAlive = false;
    }
     if (currentBoss=="bookBoss"){
      bookBoss.visible = false;
      bookBoss.bodyEnable = false;
      bBossAlive = false;
    }
        if (currentBoss=="computerBoss"){
      computerBoss.visible = false;
      computerBoss.bodyEnable = false;
      computerBossAlive = false;
    }
   
  }
      
      
      cursors = this.input.keyboard.createCursorKeys()
   if (cursors.left.isDown || keyA.isDown){
    player.anims.play('walkingLeft', true);
    player.setVelocityX(-100);
    player.vx=-100
    facingLeft = true
    facingRight = false
    
    }
  
   if (cursors.right.isDown || keyD.isDown){
      player.anims.play('walkingRight', true);
      player.setVelocityX(100) ;
      player.vx=100
      facingLeft = false 
      facingRight = true
    
    }

    if (cursors.right.isDown==false && keyA.isDown == false && keyD.isDown == false && cursors.left.isDown==false){
      player.setVelocityX(0)
    }

    if (cursors.up.isDown || keyW.isDown){
       player.setVelocityY(-100) ;
       player.vy=-100
    }

      if (cursors.down.isDown || keyS.isDown){
       player.setVelocityY(100) ;
       player.vy = 100
    }

    if (cursors.up.isDown==false && keyW.isDown == false && keyS.isDown == false && cursors.down.isDown==false){
      player.setVelocityY(0)
    }

    if (cursors.up.isDown==false && keyW.isDown == false && keyS.isDown == false && cursors.down.isDown==false && cursors.right.isDown==false && keyA.isDown == false && keyD.isDown == false && cursors.left.isDown==false && facingRight == true){
      player.setVelocityX(0)
      player.setVelocityY(0)
      player.play('idle', true)

      facingLeft = false 
      facingRight = false
    }

    if (cursors.up.isDown==false && keyW.isDown == false && keyS.isDown == false && cursors.down.isDown==false && cursors.right.isDown==false && keyA.isDown == false && keyD.isDown == false && cursors.left.isDown==false && facingLeft == true){
      player.setVelocityX(0)
      player.setVelocityY(0)
      player.play('idleLeft', true)

      facingLeft = false 
      facingRight = false 
    }

//Inventory

      if (detectKeyIDown == false){
        keyI.on('down', openInventory);
      }
        
      function openInventory () {
        detectKeyIDown = true
        canMove = false
        player.setVelocityX(0)
        player.setVelocityY(0)
      if (placeholderInInventory == false){
        inventory.play('blankInven')
        inventory.visible = true
        //console.log("blankInven")
      }
    else if (placeholderInInventory == true){
        inventory.play('onlyPlaceholder')
        inventory.visible = true
       
        //console.log("Placeholder")
      }
        if(detectKeyIDown == true){
          keyI.on('down', closeInventory)
        }
      function closeInventory (){
        inventory.visible = false
        canMove = true
        detectKeyIDown = false
      }
      
    }

//Boundaries
if (bossHealth > 0){
    if (player.x <= 160 )
    {player.x=160}
    
   if (player.x >= 475)
    {player.x=475}

    if (player.y <= 200 )
    {player.y=200}
    
   if (player.y >= 318)
    {player.y=318}
       
    }

    else if (bossHealth <= 0){
    if (player.x <= 160 )
    {player.x=160}
    
   if (player.x >= 475)
    {player.x=475}

    if (player.y <= 90 )
    {player.y= 90}
    
   if (player.y >= 318)
    {player.y=318}
  }
//End of Boundaries Code
    }

 
});


function generateNumber(num=900){
  if (newAttackReady = true)
  randomNumber = Math.ceil(Math.random()*num)
  var leftOrRight= (Math.ceil(Math.random()*2));
  if (leftOrRight==2){randomNumber= randomNumber*-1}
  return randomNumber
  //console.log("attack number = "+attackNumber )
  //fire()
}

function generateNumber2(num=900){
  if (newAttackReady = true)
  randomNumber = Math.ceil(Math.random()*num)
  
  return randomNumber
  //console.log("attack number = "+attackNumber )
  //fire()
}


function generateAttackNumber(num=2){
  if (newAttackReady = true)
  attackNumber = Math.ceil(Math.random()*num)
  console.log("attack number = "+attackNumber )
fire()
}


function fire(attack=attackNumber){
  console.log(bossAttack)
  if (bossActive==true)
  { 

  if (attackNumber==1 && bossAttack == true){ 
    console.log("attack 1");
    heatseeker=false
  bossProjectileVelocityX = generateNumber(900); 
    console.log(bossProjectileVelocityX)
    bossProjectileVelocityY= generateNumber2(900) ; //make the 900s in generateNumber(900) and here lower to be slower and higher to be faster
  bossProjectileGroup.fireBullet(computerBoss.x, computerBoss.y - 20);
  bossAttack=false;
   
                                  } 
  }
 if (attackNumber==2 && bossAttack == true){
//if you want you can add a second attack style here.  Change the attacknumber generator to have a max of 2 instead of 1
console.log("attack 2")
heatseeker=true
bossProjectileGroup.fireBullet(currentBossRef.x, currentBossRef.y - 20);
tempAngle = Phaser.Math.Angle.BetweenPoints(currentBossRef, player);
deg = Phaser.Math.RadToDeg(tempAngle);
  console.log("degrees = " + deg)


  // tempVelocity = (currentBossProjectile.body.velocity)
//console.log("temp angle = " + tempAngle);
//this.physics.velocityFromRotation(tempAngle, 600, currentBossProjectile.body.velocity), 
//console.log(tempVelocity)

  console.log("heatseeker")
 
}
   
  }

  
                                                

                                                     
                           
  //console.log("boss Attack Number= " +attackNumber)                         }

function resetBossAttack () {
  bossAttack = true
  console.log("reset")
}


function onEvent ()

{
  if (bossActive == true){
  console.log("onEvent function runs")
  bossAttack=true;
 generateAttackNumber();
 // console.log("attack number generates")
 //console.log("bossAttackReset")
      fire()
    timedEvent.reset({ delay: Phaser.Math.Between(100,800), callback: onEvent, callbackScope: this, repeat: 1});//this bottom line is how frequently it attacks... as the code in this onEvent() function resets bossAttachtoTrue.
}}


function loadBoss(boss){

  if (boss == "computerBoss"){
  computerBoss.visible=true;
computerBoss.enableBody=true;
    
}
  if (boss == "bookBoss"){
  bookBoss.visible=true;
bookBoss.enableBody=true
}
    if (boss == "historyBoss"){
  historyBoss.visible=true;
historyBoss.enableBody=true
}
}