var SceneOne = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, { "key": "SceneOne" });
    },
 
    init: function() {},
    
    preload: function() {
       mapArea=0
 

this.load.image("cayleighTiles", "images/customTiles.png");
this.load.image("transparentMapItems", "images/transparentMapItems.png")
this.load.image("projectile", "images/redball.png");
 this.load.spritesheet("player", 'images/crusader.png', {frameWidth: 71, frameHeight: 128,})   
this.load.image("powerup1", "images/redball.png");
this.load.image("bullet", "images/redball.png");
this.load.image("door", "images/singleDoor.png");
this.load.image("pressSpaceBar", "images/pressSpaceBar.png")
this.load.spritesheet("player", 'images/crusader.png', {frameWidth: 71, frameHeight: 128,})
this.load.spritesheet("computerBoss", 'images/computerBoss.png', {frameWidth: 64, frameHeight: 64,})
this.load.spritesheet("NPC", 'images/NPC.png', {frameWidth: 128, frameHeight: 128,})
this.load.spritesheet("welcomeText", 'images/welcomeText.png', {frameWidth: 150, frameHeight: 32,})
this.load.spritesheet("underDev", 'images/underDev.png', {frameWidth: 150, frameHeight: 32,})
this.load.spritesheet("lookAroundText", 'images/lookAroundText.png', {frameWidth: 150, frameHeight: 32,})
this.load.spritesheet("transition1", 'images/battleTransition.png', {frameWidth: 352, frameHeight: 352,})
this.load.spritesheet("transition2", 'images/reversedTransition.png', {frameWidth: 352, frameHeight: 352,})
this.load.spritesheet("inventory", 'images/inventory.png', {frameWidth: 100, frameHeight: 140,})
this.load.image("bossProjectile", "images/redball.png")   
this.load.spritesheet("wiresProjectile", 'images/wiresProjectile.png', {frameWidth: 16, frameHeight: 63,})
this.load.tilemapTiledJSON('map', 'maps/c1v8.json') 
this.load.spritesheet("bookBoss", 'images/bookBoss.png', {frameWidth: 88, frameHeight: 120,})
this.load.spritesheet("historyBoss", 'images/historyBoss.png', {frameWidth: 91, frameHeight: 139,})
this.load.spritesheet("spin", 'images/spin.png', {frameWidth: 20, frameHeight: 62,})
this.load.spritesheet("spinAroundText", 'images/spinAroundText.png', {frameWidth: 150, frameHeight: 32,})
this.load.spritesheet("spinStopText", 'images/spinStopText.png', {frameWidth: 150, frameHeight: 32,})
this.load.spritesheet("welcomeToEastGranby", 'images/welcomeToEastGranby.png', {frameWidth: 150, frameHeight: 140,})

this.load.spritesheet("lightningProjectile", 'images/lightningProjectile.png', {frameWidth: 12, frameHeight: 32,})

this.load.image("marker", '/images/marker.png')

///

    },
    
    create: function() {
  
      
  
currentBoss=""

this.bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 1 //the maximum you can create
        });

bossProjectiles = this.physics.add.group({
            defaultKey: 'bossProjectile',
            maxSize: 100//the maximum you can create
        });

const map = this.make.tilemap({key: 'map'})
const tileset = map.addTilesetImage("cayleighTiles", "cayleighTiles");
const objectsTileset = map.addTilesetImage("transparentMapItems", "transparentMapItems");
const walls= map.createLayer('walls', tileset, -2800,-1500);
const background= map.createLayer('background', tileset, -2800, -1500);
const objects= map.createLayer('objects', objectsTileset, -2800, -1500);

       
walls.setCollisionBetween(2, 8); // on walls layer tiles at indexes 2 and 3 now cause c

//Idle Animation
var idle = 
       { key: 'idle',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 8, first: 0 }),
        frameRate: 8,
        repeat: -1}

this.anims.create(idle);

//Idle Facing Left 
var idleLeft = 
       { key: 'idleLeft',
        frames: this.anims.generateFrameNumbers('player', { start: 24, end: 32, first: 0 }),
        frameRate: 8,
        repeat: -1}

this.anims.create(idleLeft);

//Walking Right Animation
var walkingRight = 
       { key: 'walkingRight',
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 23, first: 11 }),
        frameRate: 10,
        repeat: -1}

this.anims.create(walkingRight);

//Walking Left Animation
  var walkingLeft = 
       { key: 'walkingLeft',
        frames: this.anims.generateFrameNumbers('player', { start: 36, end: 47, first: 35 }),
        frameRate: 10,
        repeat: -1}

this.anims.create(walkingLeft);

//NPC Idle Animation
var NPCIdle = 
       { key: 'NPCIdle',
        frames: this.anims.generateFrameNumbers('NPC', { start: 1, end: 13, first: 0 }),
        frameRate: 8,
        repeat: -1}

this.anims.create(NPCIdle);

//Transition Animation

var transitionAnim1 = 
       { key: 'transitionAnim1',
        frames: this.anims.generateFrameNumbers('transition1', { start: 0, end: 88, first: 0 }),
        frameRate: 48,
        repeat: 1}

this.anims.create(transitionAnim1);

      

      
var transitionAnim2 = 
       { key: 'transitionAnim2',
        frames: this.anims.generateFrameNumbers('transition2', { start: 0, end: 88, first: 0 }),
        frameRate: 48,
        repeat: 1}

this.anims.create(transitionAnim2);

//Welcome Text Anim
var welcomeTextAnim = 
       { key: 'welcomeTextAnim',
        frames: this.anims.generateFrameNumbers('welcomeText', { start: 0, end: 67, first: 0 }),
        frameRate: 24,
        repeat: 0}

this.anims.create(welcomeTextAnim);

//Under Development Text Anim
var underDevAnim = 
       { key: 'underDevAnim',
        frames: this.anims.generateFrameNumbers('underDev', { start: 0, end: 129, first: 0 }),
        frameRate: 24,
        repeat: 0}

this.anims.create(underDevAnim);

      //Wires Projectile
var wiresProjectileAnim = 
  { key: 'wiresProjectileAnim',
        frames: this.anims.generateFrameNumbers('wiresProjectile', { start: 0, end: 15, first: 0 }),
        frameRate: 10,
        repeat: -1}

this.anims.create(wiresProjectileAnim);

//Feel Free to Look Around Text Anim
var lookAroundTextAnim = 
       { key: 'lookAroundTextAnim',
        frames: this.anims.generateFrameNumbers('lookAroundText', { start: 0, end: 64, first: 0 }),
        frameRate: 24,
        repeat: 0}

this.anims.create(lookAroundTextAnim);
      

//Inventory
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


//Book Boss Idle
var bookBossIdle = 
       { key: 'bookBossIdle',
        frames: this.anims.generateFrameNumbers('bookBoss', { start: 0, end: 5, first: 0 }),
        frameRate: 8,
        repeat: -1}

this.anims.create(bookBossIdle)


var historyBossIdle = 
       { key: 'historyBossIdle',
        frames: this.anims.generateFrameNumbers('historyBoss', { start: 0, end: 14, first: 0 }),
        frameRate: 12,
        repeat: -1}

this.anims.create(historyBossIdle)

//Spin
var spinAnim = 
       { key: 'spinAnim',
        frames: this.anims.generateFrameNumbers('spin', { start: 0, end: 7, first: 0 }),
        frameRate: 12,
        repeat: -1}

this.anims.create(spinAnim);

var spinAroundTextAnim = 
       { key: 'spinAroundTextAnim',
        frames: this.anims.generateFrameNumbers('spinAroundText', { start: 0, end: 78, first: 0 }),
        frameRate: 24,
        repeat: 0}

this.anims.create(spinAroundTextAnim);

var spinStopTextAnim = 
       { key: 'spinStopTextAnim',
        frames: this.anims.generateFrameNumbers('spinStopText', { start: 0, end: 87, first: 0 }),
        frameRate: 24,
        repeat: 0}

this.anims.create(spinStopTextAnim);

      
//Computer Boss Code
var computerBossIdle = 
       { key: 'computerBossIdle',
        frames: this.anims.generateFrameNumbers('computerBoss', { start: 0, end: 12, first: 0 }),
        frameRate: 6,
        repeat: -1}

this.anims.create(computerBossIdle);
      
if (cBossAlive == true){
computerBoss = this.physics.add.sprite(3406, -854, 'computerBoss').play('computerBossIdle');
computerBoss.enableBody = true;
computerBoss.vx = 0
computerBoss.vy = 0
computerBoss.scale = 1.5}
//End of Computer Boss Code

//Book Boss
if (bBossAlive == true){
bookBoss = this.physics.add.sprite(2500, -964, 'bookBoss').play('bookBossIdle');
bookBoss.enableBody = true;
bookBoss.vx = 0
bookBoss.vy = 0
bookBoss.scale = 0.75
}

      if (hBossAlive == true){
  historyBoss = this.physics.add.sprite(1068, -412, 'historyBoss').play('historyBossIdle');
  historyBoss.enableBody = true;
  historyBoss.vx = 0
  historyBoss.vy = 0
  historyBoss.scale = 0.70
}
      
//NPC
NPC = this.physics.add.sprite(1320, 0, 'NPC').play('NPCIdle');
NPC.enableBody = true;
NPC.body.immovable = true;

NPC.vx = 0
NPC.vy = 0
NPC.scale = 0.50

//Spin (Added for fun :))
spin = this.physics.add.sprite(-1856, 754, 'spin').play('spinAnim');
spin.enableBody = true;
spin.body.immovable = true;

spin.vx = 0
spin.vy = 0
      
//Player Code   Normal: (800, -50)   Basement: (10, 1000)
player = this.physics.add.sprite(1000, -50, 'player').play('idle').setSize(60, 28)
            .setOffset(6, 100)      ;
  player.enableBody=true;

player.vx = 0
player.vy = 0
player.scale = 0.50

;
      
//Space Bar Prompt
spaceBarPrompt = this.add.image(176,32,"pressSpaceBar")
spaceBarPrompt.scale = 1.5
spaceBarPrompt.visible = false

//Welcome Text
welcomeText = this.physics.add.sprite(player.x, player.y + 150, 'welcomeText')
welcomeText.scale = 2.5
welcomeText.visible = false

//Under Development Text
underDevText = this.physics.add.sprite(player.x, player.y + 150, 'underDev')
underDevText.scale = 2.5
underDevText.visible = false

//Feel Free to Look Around Text
lookAroundText = this.physics.add.sprite(player.x, player.y + 150, 'lookAroundText')
lookAroundText.scale = 2.5
lookAroundText.visible = false

//Spin Text
spinAroundText = this.physics.add.sprite(player.x, player.y + 150, 'spinAroundText')
spinAroundText.scale = 2.5
spinAroundText.visible = false

spinStopText = this.physics.add.sprite(player.x, player.y + 150, 'spinStopText')
spinStopText.scale = 2.5
spinStopText.visible = false

//Inventory
inventory = this.physics.add.sprite(player.x - 150, player.y, 'inventory')
inventory.scale = 2
inventory.visible = false

//Start Screen

      startScreen = this.physics.add.sprite(player.x, player.y, 'welcomeToEastGranby')
startScreen.displayWidth = game.config.width
startScreen.displayHeight = game.config.height
      
pressSpaceToStartText = this.add.text(player.x + 20, player.y + 200, 'Press Space to Start!')
pressSpaceToStartText.setTint(0x8c008c, 0x8c008c, 0x0000ff, 0x0000ff)
     
if (splashScreenVisible == true){
startScreen.visible = true
pressSpaceToStartText.setVisible(true)
} 
else if (splashScreenVisible == false){
  startScreen.visible = false
  pressSpaceToStartText.setVisible(false)
}


      
//Colliders and Overlap

this.physics.add.collider (player, NPC,  NPCDialogue, null, this)
this.physics.add.collider (player, spin,  spinDialogue, null, this)
this.physics.add.overlap (player, computerBoss,  setCurrentBoss1, null, this);  
 this.physics.add.overlap (player, computerBoss,  loadMap, null, this);
  this.physics.add.overlap (player, bookBoss,  loadMap, null, this);     
this.physics.add.overlap (player, bookBoss,  setCurrentBoss2, null, this);
this.physics.add.overlap (player, historyBoss,  setCurrentBoss3, null, this);
this.physics.add.overlap (player, historyBoss,  loadMap, null, this);     
this.physics.add.overlap (player, historyBoss,  setCurrentBoss3, null, this);
//this.physics.add.overlap (player, bookBoss,  checkToBattleBookBoss, null, this);
      
function checkToBattleBookBoss (){
  if (cBossAlive == true){
  console.log("You need to defeat the Computer Boss first!")
}
      else if (cBossAlive == false){
        this.physics.add.overlap (player, bookBoss,  loadMap, null, this);
      }
}
 

 this.physics.add.collider(player, walls);
 this.physics.add.collider(player, objects);
objects.setCollisionByProperty({ Collide: true });
     
this.cameras.main.startFollow(player);


keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);


      
areaText = this.add.text(player.x, player.y-25, 'Press W, A, S, or D to move!');
        areaText.setTint(0x8c008c, 0x8c008c, 0x0000ff, 0x0000ff)
        //areaText.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);  
      areaText.setVisible(false)


 lobby = this.add.zone(800, -50).setSize(200, 200);
    this.physics.world.enable(lobby);
    lobby.body.setAllowGravity(false);
    lobby.body.moves = false;
    this.physics.add.overlap(player, lobby);

      auditorium = this.add.zone(1860, -180).setSize(940, 120);
    this.physics.world.enable(auditorium);
    auditorium.body.setAllowGravity(false);
    auditorium.body.moves = false;
    this.physics.add.overlap(player, auditorium);

      office = this.add.zone(634, 4).setSize(120, 120);
    this.physics.world.enable(office);
    office.body.setAllowGravity(false);
    office.body.moves = false;
    this.physics.add.overlap(player, office);

 // lobby.on('enterzone', displayLocation("lobby"));

      library = this.add.zone(2142, -722).setSize(120, 120);
    this.physics.world.enable(library);
    library.body.setAllowGravity(false);
    library.body.moves = false;
    this.physics.add.overlap(player, library);

      libraryPart2 = this.add.zone(1756, -840).setSize(140, 90);
    this.physics.world.enable(libraryPart2);
    libraryPart2.body.setAllowGravity(false);
    libraryPart2.body.moves = false;
    this.physics.add.overlap(player, libraryPart2);

      computerLab = this.add.zone(3230, -708).setSize(120, 120);
    this.physics.world.enable(computerLab);
    computerLab.body.setAllowGravity(false);
    computerLab.body.moves = false;
    this.physics.add.overlap(player, computerLab);

    gym1 = this.add.zone(-650, -404).setSize(68, 1275);
    this.physics.world.enable(gym1);
    gym1.body.setAllowGravity(false);
    gym1.body.moves = false;
    this.physics.add.overlap(player, gym1) 

    girlsLocker = this.add.zone(-206, -504).setSize(150, 400);
    this.physics.world.enable(girlsLocker);
    lobby.body.setAllowGravity(false);
    lobby.body.moves = false;
    this.physics.add.overlap(player, girlsLocker)

    stairsRight = this.add.zone(3090, -654).setSize(64, 64);
    this.physics.world.enable(stairsRight);
    stairsRight.body.setAllowGravity(false);
    stairsRight.body.moves = false;
    this.physics.add.overlap(player, stairsRight) 

    stairsRightLL = this.add.zone(-200, 850).setSize(64, 64);
    this.physics.world.enable(stairsRightLL);
    stairsRightLL.body.setAllowGravity(false);
    stairsRightLL.body.moves = false;
    this.physics.add.overlap(player, stairsRightLL) 

stairsLeft = this.add.zone(1124, -800).setSize(64, 64);
    this.physics.world.enable(stairsLeft);
    stairsLeft.body.setAllowGravity(false);
    stairsLeft.body.moves = false;
    this.physics.add.overlap(player, stairsLeft) 


          boysLocker = this.add.zone(-462, -504).setSize(150, 400);
    this.physics.world.enable(boysLocker);
    boysLocker.body.setAllowGravity(false);
    boysLocker.body.moves = false;
    this.physics.add.overlap(player, boysLocker) 

      
          gym2 = this.add.zone(150, -534).setSize(480, 650);
    this.physics.world.enable(gym2);
     gym2.body.setAllowGravity(false);
     gym2.body.moves = false;
    this.physics.add.overlap(player, gym2) 

      gym2Bathroom1 = this.add.zone(480, -668).setSize(80, 80);
    this.physics.world.enable(gym2Bathroom1);
    gym2Bathroom1.body.setAllowGravity(false);
    gym2Bathroom1.body.moves = false;
    this.physics.add.overlap(player, gym2Bathroom1) 

      gym2Bathroom2 = this.add.zone(480, -480).setSize(80, 80);
    this.physics.world.enable(gym2Bathroom2);
    gym2Bathroom2.body.setAllowGravity(false);
    gym2Bathroom2.body.moves = false;
    this.physics.add.overlap(player, gym2Bathroom2) 

       
          weightRoom = this.add.zone(574, -352).setSize(96, 120);
    this.physics.world.enable( weightRoom);
     weightRoom.body.setAllowGravity(false);
     weightRoom.body.moves = false;
    this.physics.add.overlap(player,  weightRoom) 
      

      bandRoom = this.add.zone(2294, 698).setSize(120, 120);
    this.physics.world.enable(bandRoom);
    bandRoom.body.setAllowGravity(false);
    bandRoom.body.moves = false;
    this.physics.add.overlap(player, bandRoom);

      chorusRoom = this.add.zone(1714, 698).setSize(120, 120);
    this.physics.world.enable(chorusRoom);
    chorusRoom.body.setAllowGravity(false);
    chorusRoom.body.moves = false;
    this.physics.add.overlap(player, chorusRoom);

      nurseOffice = this.add.zone(2970, -280).setSize(100, 160);
    this.physics.world.enable(nurseOffice);
    nurseOffice.body.setAllowGravity(false);
    nurseOffice.body.moves = false;
    this.physics.add.overlap(player, nurseOffice);

      stairsLeftLL = this.add.zone(-2000, 1020).setSize(64, 64);
    this.physics.world.enable(stairsLeftLL);
    stairsLeftLL.body.setAllowGravity(false);
    stairsLeftLL.body.moves = false;
    this.physics.add.overlap(player, stairsLeftLL);

      artRoom = this.add.zone(3576, 124).setSize(100, 160);
    this.physics.world.enable(artRoom);
    artRoom.body.setAllowGravity(false);
    artRoom.body.moves = false;
    this.physics.add.overlap(player, artRoom);

      teachersLounge = this.add.zone(2765, 240).setSize(500, 80);
    this.physics.world.enable(teachersLounge);
    teachersLounge.body.setAllowGravity(false);
    teachersLounge.body.moves = false;
    this.physics.add.overlap(player, teachersLounge);

      homeEcPart1 = this.add.zone(2580, 630).setSize(100, 100);
    this.physics.world.enable(homeEcPart1);
    homeEcPart1.body.setAllowGravity(false);
    homeEcPart1.body.moves = false;
    this.physics.add.overlap(player, homeEcPart1);

      homeEcPart2 = this.add.zone(2960, 420).setSize(100, 100);
    this.physics.world.enable(homeEcPart2);
    homeEcPart2.body.setAllowGravity(false);
    homeEcPart2.body.moves = false;
    this.physics.add.overlap(player, homeEcPart2);

      biology = this.add.zone(-38, 1074).setSize(100, 100);
    this.physics.world.enable(biology);
    biology.body.setAllowGravity(false);
    biology.body.moves = false;
    this.physics.add.overlap(player, biology);

      chemistry = this.add.zone(-288, 974).setSize(90, 100);
    this.physics.world.enable(chemistry);
    chemistry.body.setAllowGravity(false);
    chemistry.body.moves = false;
    this.physics.add.overlap(player, chemistry);

      physSci = this.add.zone(-830, 974).setSize(90, 100);
    this.physics.world.enable(physSci);
    physSci.body.setAllowGravity(false);
    physSci.body.moves = false;
    this.physics.add.overlap(player, physSci);

      business = this.add.zone(-946, 974).setSize(90, 100);
    this.physics.world.enable(business);
    business.body.setAllowGravity(false);
    business.body.moves = false;
    this.physics.add.overlap(player, business);

      downstairsBathroom1 = this.add.zone(-1380, 995).setSize(90, 100);
    this.physics.world.enable(downstairsBathroom1);
    downstairsBathroom1.body.setAllowGravity(false);
    downstairsBathroom1.body.moves = false;
    this.physics.add.overlap(player, downstairsBathroom1);

      downstairsBathroom2 = this.add.zone(-1216, 995).setSize(90, 100);
    this.physics.world.enable(downstairsBathroom2);
    downstairsBathroom2.body.setAllowGravity(false);
    downstairsBathroom2.body.moves = false;
    this.physics.add.overlap(player, downstairsBathroom2);

      commons = this.add.zone(-1684, 960).setSize(400, 400);
    this.physics.world.enable(commons);
    commons.body.setAllowGravity(false);
    commons.body.moves = false;
    this.physics.add.overlap(player, commons);
      
//Classrooms (With Numbers Only)
      
      room115 = this.add.zone(1014, -480).setSize(160, 100);
    this.physics.world.enable(room115);
    room115.body.setAllowGravity(false);
    room115.body.moves = false;
    this.physics.add.overlap(player, room115);

      room117 = this.add.zone(1256, -480).setSize(160, 100);
    this.physics.world.enable(room117);
    room117.body.setAllowGravity(false);
    room117.body.moves = false;
    this.physics.add.overlap(player, room117);

      room118 = this.add.zone(1534, -480).setSize(250, 100);
    this.physics.world.enable(room118);
    room118.body.setAllowGravity(false);
    room118.body.moves = false;
    this.physics.add.overlap(player, room118);

      room120 = this.add.zone(1782, -480).setSize(160, 100);
    this.physics.world.enable(room120);
    room120.body.setAllowGravity(false);
    room120.body.moves = false;
    this.physics.add.overlap(player, room120);

      room125 = this.add.zone(2008, -480).setSize(160, 100);
    this.physics.world.enable(room125);
    room125.body.setAllowGravity(false);
    room125.body.moves = false;
    this.physics.add.overlap(player, room125);

      room128 = this.add.zone(2220, -480).setSize(160, 100);
    this.physics.world.enable(room128);
    room128.body.setAllowGravity(false);
    room128.body.moves = false;
    this.physics.add.overlap(player, room128);

      room131 = this.add.zone(2450, -480).setSize(160, 100);
    this.physics.world.enable(room131);
    room131.body.setAllowGravity(false);
    room131.body.moves = false;
    this.physics.add.overlap(player, room131);

      room136 = this.add.zone(2675, -480).setSize(160, 100);
    this.physics.world.enable(room136);
    room136.body.setAllowGravity(false);
    room136.body.moves = false;
    this.physics.add.overlap(player, room136);

      room137 = this.add.zone(2908, -480).setSize(160, 100);
    this.physics.world.enable(room137);
    room137.body.setAllowGravity(false);
    room137.body.moves = false;
    this.physics.add.overlap(player, room137);

      room132 = this.add.zone(2640, -888).setSize(160, 100);
    this.physics.world.enable(room132);
    room132.body.setAllowGravity(false);
    room132.body.moves = false;
    this.physics.add.overlap(player, room132);

      room134 = this.add.zone(2816, -745).setSize(80, 100);
    this.physics.world.enable(room134);
    room134.body.setAllowGravity(false);
    room134.body.moves = false;
    this.physics.add.overlap(player, room134);

      room116 = this.add.zone(1280, -712).setSize(80, 100);
    this.physics.world.enable(room116);
    room116.body.setAllowGravity(false);
    room116.body.moves = false;
    this.physics.add.overlap(player, room116);

      room122 = this.add.zone(1632, -712).setSize(80, 100);
    this.physics.world.enable(room122);
    room122.body.setAllowGravity(false);
    room122.body.moves = false;
    this.physics.add.overlap(player, room122);

      room108 = this.add.zone(1278, -956).setSize(100, 80);
    this.physics.world.enable(room108);
    room108.body.setAllowGravity(false);
    room108.body.moves = false;
    this.physics.add.overlap(player, room108);

      room109 = this.add.zone(1440, -924).setSize(80, 100);
    this.physics.world.enable(room109);
    room109.body.setAllowGravity(false);
    room109.body.moves = false;
    this.physics.add.overlap(player, room109);

      room105 = this.add.zone(832, -814).setSize(80, 100);
    this.physics.world.enable(room105);
    room105.body.setAllowGravity(false);
    room105.body.moves = false;
    this.physics.add.overlap(player, room105);

      room101 = this.add.zone(640, -814).setSize(80, 80);
    this.physics.world.enable(room101);
    room101.body.setAllowGravity(false);
    room101.body.moves = false;
    this.physics.add.overlap(player, room101);

      room102 = this.add.zone(640, -900).setSize(80, 80);
    this.physics.world.enable(room102);
    room102.body.setAllowGravity(false);
    room102.body.moves = false;
    this.physics.add.overlap(player, room102);

      room212Part1 = this.add.zone(3404, -10).setSize(100, 100);
    this.physics.world.enable(room212Part1);
    room212Part1.body.setAllowGravity(false);
    room212Part1.body.moves = false;
    this.physics.add.overlap(player, room212Part1);

      room212Part2 = this.add.zone(3232, -156).setSize(100, 110);
    this.physics.world.enable(room212Part2);
    room212Part2.body.setAllowGravity(false);
    room212Part2.body.moves = false;
    this.physics.add.overlap(player, room212Part2);

      room214 = this.add.zone(3404, 240).setSize(100, 100);
    this.physics.world.enable(room214);
    room214.body.setAllowGravity(false);
    room214.body.moves = false;
    this.physics.add.overlap(player, room214);

      room222 = this.add.zone(-1424, 876).setSize(100, 100);
    this.physics.world.enable(room222);
    room222.body.setAllowGravity(false);
    room222.body.moves = false;
    this.physics.add.overlap(player, room222);

},

  
    update: function() {

  areaText.setVisible(true)     
if (splashScreenVisible == true){
  canMove = false
  areaText.setText('')
  keySpace.on('down', startGame)
}

      function startGame (){
        startScreen.visible = false
        splashScreenVisible = false
        pressSpaceToStartText.setVisible(false)
        areaText.setVisible(true)
        areaText.setText('Press W, A, S, or D to move!')
        canMove = true

        keyW.on('down', resetAreaText)
        keyA.on('down', resetAreaText)
        keyS.on('down', resetAreaText)
        keyD.on('down', resetAreaText)
        function resetAreaText (){
          areaText.setText('');
          hasMoved = true
        }
                                          
      }

areaText.y = player.y-50
areaText.x = player.x-24

//structure to detect zones
if (player.body.touching.none==true && hasMoved == true) {
  areaText.setText(' ');
 
}
      
if (lobby.body.touching.none==false) {
  areaText.setText('Lobby');
 
}
else if (gym1.body.touching.none==false) {
  areaText.setText('Gym #1');
}
  else if (boysLocker.body.touching.none==false) {
  areaText.setText('Boys Locker Room');
}
    else if (girlsLocker.body.touching.none==false) {
  areaText.setText('Girls Locker Room');
}
  else if (gym2Bathroom1.body.touching.none==false) {
  areaText.setText('Bathroom');
}
    else if (gym2.body.touching.none==false) {
  areaText.setText('Gym #2');
}
    else if (gym2Bathroom2.body.touching.none==false) {
  areaText.setText('Bathroom');
}
      else if (library.body.touching.none==false || libraryPart2.body.touching.none==false) {
        areaText.setText('Library')
      }
        else if (auditorium.body.touching.none==false) {
          areaText.setText('Auditorium')
        }
          else if (office.body.touching.none==false) {
            areaText.setText('Office')
          }
            else if (computerLab.body.touching.none==false) {
              areaText.setText('Computer Lab (Room 142)')
            }
               else if (bandRoom.body.touching.none==false) {
                areaText.setText('Band Room')
              }
                else if (chorusRoom.body.touching.none==false) {
                  areaText.setText('Chorus Room')
                }
                else if (room115.body.touching.none==false) {
                  areaText.setText('Room 115')
                }
                else if (room117.body.touching.none==false) {
                  areaText.setText('Room 117')
                }
                else if (room118.body.touching.none==false) {
                  areaText.setText('Room 118')
                }
                else if (room120.body.touching.none==false) {
                  areaText.setText('Room 120')
                }
                else if (room125.body.touching.none==false) {
                  areaText.setText('Room 125')
                }
                else if (room128.body.touching.none==false) {
                  areaText.setText('Room 128')
                }
                else if (room131.body.touching.none==false) {
                  areaText.setText('Room 131')
                }
                else if (room136.body.touching.none==false) {
                  areaText.setText('Room 136')
                }
                else if (room137.body.touching.none==false) {
                  areaText.setText('Room 137')
                }
                else if (nurseOffice.body.touching.none==false) {
                  areaText.setText('Nurse Office')
                }
                else if (room132.body.touching.none==false) {
                  areaText.setText('Resource Room (Room 132)')
                }
                else if (room134.body.touching.none==false) {
                  areaText.setText('Room 134')
                }
                else if (room116.body.touching.none==false) {
                  areaText.setText('Room 116')
                }
                else if (room122.body.touching.none==false) {
                  areaText.setText('Room 122')
                }
                else if (room108.body.touching.none==false) {
                  areaText.setText('Room 108')
                }
                else if (room109.body.touching.none==false) {
                  areaText.setText('Room 109')
                }
                else if (room105.body.touching.none==false) {
                  areaText.setText('Room 105')
                }
                else if (room101.body.touching.none==false) {
                  areaText.setText('Room 101')
                }
                else if (room102.body.touching.none==false) {
                  areaText.setText('Room 102')
                }
                else if (room212Part1.body.touching.none==false) {
                  areaText.setText('Room 212')
                }
                else if (room212Part2.body.touching.none==false) {
                  areaText.setText('Room 212')
                }
                else if (room214.body.touching.none==false) {
                  areaText.setText('Room 214')
                }
                else if (artRoom.body.touching.none==false) {
                  areaText.setText('To Art Room -->')
                }
                else if (homeEcPart1.body.touching.none==false) {
                  areaText.setText('Home Economics')
                }
                else if (homeEcPart2.body.touching.none==false) {
                  areaText.setText('Home Economics')
                }
                else if (biology.body.touching.none==false) {
                  areaText.setText('Biology (Room 218)')
                }
                else if (chemistry.body.touching.none==false) {
                  areaText.setText('Chemistry (Room 219)')
                }
                else if (physSci.body.touching.none==false) {
                  areaText.setText('Physical Science (Room 220)')
                }
                else if (room222.body.touching.none==false) {
                  areaText.setText('Computer Lab (Room 222)')
                }
                else if (weightRoom.body.touching.none==false) {
                  areaText.setText('Weight Room')
                }
                else if (business.body.touching.none==false) {
                  areaText.setText('Business (Room 221)')
                }
                else if (downstairsBathroom1.body.touching.none==false || downstairsBathroom2.body.touching.none==false) {
                  areaText.setText('Bathroom')
                }
                else if (commons.body.touching.none==false) {
                  areaText.setText('Commons')
                }
                else if (teachersLounge.body.touching.none==false) {
                  areaText.setText('Teachers Lounge')
                }
          else if (stairsRight.body.touching.none==false) {
            areaText.text ="Stairs"
           
                  player.x=-200
                  player.y=900
              stairsRightLL.body.setEnable(false)
            var stairTimer = this.time.addEvent({ 
                                   delay: 2000, 
                                   callback: stairEnable, 
                                   args: [stairsRightLL], 
                                   loop: false});   
                }
          else if (stairsRightLL.body.touching.none==false) { areaText.text =" Stairs"
            
                  player.x=3090
                  player.y=-600
                 stairsRight.body.setEnable(false)
            var stairTimer = this.time.addEvent({ 
                                   delay: 2000, 
                                   callback: stairEnable, 
                                   args: [stairsRight], 
                                   loop: false});   
                }
else if (stairsLeft.body.touching.none==false) { areaText.text ="Stairs"
           
                  player.x=-1924
                  player.y=995
   stairsLeftLL.body.setEnable(false)  
 var stairTimer = this.time.addEvent({ 
                                   delay: 2000, 
                                   callback: stairEnable, 
                                   args: [stairsLeftLL], 
                                   loop: false});    
//var stairTimer= this.time.addEvent({ delay: 1200, callback: stairEnable(stairsLeftLL) callbackScope: this})                                                

player.anims.play('walkingRight', true);
      
                                         player.setVelocityX(400) ;
      player.vx=100
      facingLeft = false 
      facingRight = true                             
            } 
else if (stairsLeftLL.body.touching.none==false) { areaText.text ="Stairs"
           
                  player.x=1200
                  player.y=-827
       player.anims.play('walkingRight', true);
      stairsLeft.body.setEnable(false)
    var stairTimer = this.time.addEvent({ 
                                   delay: 2000, 
                                   callback: stairEnable, 
                                   args: [stairsLeft], 
                                   loop: false});                                           player.setVelocityX(400) ;
      player.vx=100
      facingLeft = false 
      facingRight = true  
                                                  
            } 
      
 /*else {
   areaText.text = player.x + " , " +player.y; 
 } */

      

      
cursors = this.input.keyboard.createCursorKeys()

//Inventory
      if (talkingToNPC == false){
      if (detectKeyIDown == false){
        keyI.on('down', openInventory);
      }
        
      function openInventory () {
        detectKeyIDown = true
        canMove = false
        player.setVelocityX(0)
        player.setVelocityY(0)
      if (placeholderInInventory == false){
        inventory.x = player.x - 150
        inventory.y = player.y
        inventory.play('blankInven')
        inventory.visible = true
      }
    else if (placeholderInInventory == true){
        inventory.play('onlyPlaceholder')
        inventory.x = player.x - 150
        inventory.y = player.y
        inventory.visible = true
      
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
    }
  

      
  if (canMove == true && talkingToNPC == false){
   if (cursors.left.isDown || keyA.isDown){
    player.anims.play('walkingLeft', true);
    player.setVelocityX(-300);
    //player.vx=-100
    facingLeft = true
    facingRight = false
    
    }
  

   if (cursors.right.isDown || keyD.isDown){
      player.anims.play('walkingRight', true);
      player.setVelocityX(300) ;
      //player.vx=100
      facingLeft = false 
      facingRight = true
    
    }
    if (cursors.right.isDown==false && keyA.isDown == false && keyD.isDown == false && cursors.left.isDown==false){
      player.setVelocityX(0)
    }
    if (cursors.up.isDown || keyW.isDown){
       player.setVelocityY(-300) ;
       player.vy=-100
    }
      if (cursors.down.isDown || keyS.isDown){
       player.setVelocityY(300) ;
       player.vy = 100
    }
    if (cursors.up.isDown==false && keyW.isDown == false && keyS.isDown == false && cursors.down.isDown==false){
      player.setVelocityY(0)

    }

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
      
    }
});

function setCurrentBoss1(){

  currentBoss = "computerBoss"
  currentBossRef = computerBoss
  projectileType = "wiresProjectile"
}

function setCurrentBoss2(){

  currentBoss = "bookBoss"
    currentBossRef = bookBoss
   projectileType = "projectile"
}

function setCurrentBoss3(){

  currentBoss = "historyBoss"
    currentBossRef = historyBoss
   projectileType = "projectile"
}

function displayLocation(area){



  areaText.setText(area);
  let timedEvent = this.time.delayedCall(3000, hideText, [], this);

 
  
}

function hideText(){
areaText.text=''
  
}

function setArea () 

{ area = "lobby";
displayLocation(area)}

function stairEnable(stairs){
 stairs.body.setEnable(true)
  console.log(stairs + " enabled")
}