//Load Map Function
function loadMap() {

timedEvent = this.time.delayedCall(1000 , hidePrompt, [],this)
spaceBarPrompt.visible = true;
if (keySpace.isDown && mapArea==0){
 
  //Transition Animations
  var transitionTimedEvent1 = this.time.addEvent({ delay: 0, callback: transitionAnimation1, callbackScope: this})
  var transitionTimedEvent1End = this.time.addEvent({ delay: 1600, callback: transitionAnimation1End, callbackScope: this})
  var transitionTimedEvent2 = this.time.addEvent({ delay: 3200, callback: transitionAnimation2, callbackScope: this})
  var transitionTimedEvent2End = this.time.addEvent({ delay: 4800, callback: transitionAnimation2End, callbackScope: this})

  
  function transitionAnimation1 (){
    transitionSprite1 = this.physics.add.sprite(player.x, player.y, 'transitionSprite1').play('transitionAnim1')
    transitionSprite1.scale = 3
    }

  function transitionAnimation1End (){
    transitionSprite1.destroy()
      this.scene.start("SceneTwo")
    }

  function transitionAnimation2 (){
    transitionSprite2 = this.physics.add.sprite(player.x, player.y, 'transitionSprite2').play('transitionAnim2')
    transitionSprite2.scale = 3
    }

  function transitionAnimation2End (){
  
    transitionSprite2.destroy()
    }
  
}

if (keySpace.isDown && mapArea==1){
  this.scene.start("SceneOne")
} 
}


function hidePrompt() {

  welcomeText.visible = false
  spaceBarPrompt.visible = false;
  spinStopText.visible = false
  canMove = true
  talkingToNPC = false
  
}
/*function askToTalk() {
  
  talkingToNPC = true;
  NPCDialogue()
  
  
}*/

function NPCDialogue (){

  //if askToTalk runs and spacebar is pressed talking is set to false. TalkingtoNPC = false
  

  canMove = false
  talkingToNPC = true
  player.setVelocityX(0)
  player.setVelocityY(0)
  timedEvent = this.time.delayedCall(7000 , hidePrompt, [],this)
  welcomeText.x = player.x
  welcomeText.y = player.y + 150
  welcomeText.visible = true
  welcomeText.play('welcomeTextAnim')
}
/*
function NPCDialoguePart2 (){
  timedEvent = this.time.delayedCall(8000 , NPCDialoguePart3, [],this)
  welcomeText.visible = false
  underDevText.x = player.x
  underDevText.y = player.y + 150
  underDevText.visible = true
  underDevText.play('underDevAnim')
}

function NPCDialoguePart3 (){
  timedEvent = this.time.delayedCall(8000 , hidePrompt, [],this)
  underDevText.visible = false
  lookAroundText.x = player.x
  lookAroundText.y = player.y + 150
  lookAroundText.visible = true
  lookAroundText.play('lookAroundTextAnim')
}
*/

function spinDialogue (){
  canMove = false
  player.setVelocityX(0)
  player.setVelocityY(0)
  timedEvent = this.time.delayedCall(8000 , spinDialogue2, [],this)
  spinAroundText.x = player.x
  spinAroundText.y = player.y + 150
  spinAroundText.visible = true
  spinAroundText.play('spinAroundTextAnim')
}

function spinDialogue2 () {
  timedEvent = this.time.delayedCall(8000 , hidePrompt, [],this)
  spinAroundText.visible = false
  spinStopText.x = player.x
  spinStopText.y = player.y + 150
  spinStopText.visible = true
  spinStopText.play('spinStopTextAnim')
}

 function shoot(pointer) {
        
     
        if (allowShoot==true){
        allowShoot=false
        var timedEvent3 = this.time.delayedCall(1000 , destroyBullet, [], this)
        bullet = this.bullets.get(player.x, player.y);
 
          var  angle = Phaser.Math.Angle.BetweenPoints(player, pointer);
          console.log(angle);

       this.physics.add.overlap (bullet, computerBoss, damageBoss, null, this)
         this.physics.velocityFromRotation(angle, 600, bullet.body.velocity);
          console.log(bullet.body.velocity)
         
       }}

 function destroyBullet(){

     
      bullet.destroy()
      allowShoot=true
      console.log("destroyed")
}







 


 function getTime() {
        //make a new date object
        let d = new Date();

        //return the number of milliseconds since 1 January 1970 00:00:00.
        return d.getTime();
    }
function showDelta() {
        //subtract the start time from the time now
        // 
        let elapsed = this.getTime()-this.start;

        //log the result
        console.log("delta time=" + elapsed);

        //reset the start time
        this.start = this.getTime();
  
    }


//Damage Boss and Boss Death
function damageBoss () {
  console.log("The bullet hit!")
  bossHealth -= 10
  console.log(bossHealth)
  bullet.destroy()
  if (bossHealth <= 0) {
  
    bossDeathSequence()
  }}

  function bossDeathSequence(boss){
    
    bossActive = false
    greyRect.visible = false;
    purpleRect.visible = false;
    playerHealthBarOutline.visible = false

  if (currentBossRef==computerBoss){
    //Timed Events
     timedEvent1 = this.time.addEvent({ delay: 0, callback: staticAnimation, callbackScope: this})

   timedEvent2 = this.time.addEvent({ delay: 1000, callback: bluescreen, callbackScope: this})

    timedEvent3 = this.time.addEvent({ delay: 2500, callback: bossDeath, callbackScope: this})
 
  function transitionAnimation1 (){
    transitionSprite1 = this.physics.add.sprite(player.x, player.y, 'transitionSprite1').play('transitionAnim1')
    transitionSprite1.scale = 3
    }

  function transitionAnimation1End (){
    transitionSprite1.destroy()
      this.scene.start("SceneTwo")
    }

  function transitionAnimation2 (){
    transitionSprite2 = this.physics.add.sprite(player.x, player.y, 'transitionSprite2').play('transitionAnim2')
    transitionSprite2.scale = 3
    }

  function transitionAnimation2End (){
    transitionSprite2.destroy()
    }
    
    //Timed Event Functions
    function staticAnimation (){
   
      playerHealthBarOutline.visible = false
      computerBoss.anims.play('computerBossBattleEnd', true)
      cBossAlive = false
      
    }
    
    function bluescreen (){ 
      computerBoss.anims.play('computerBossBluescreen', true)
    }

    function bossDeath (){
  
      console.log("boss Alive? " + computerBossAlive)
    computerBoss.destroy();
    console.log("You could say that it CRASHED hard.")
    console.log("Actually, I don't know if I should be telling computer jokes right now. The audience might not like it. Not one BIT.")
    door.visible = true
      bookBoss.visible = false
      bookBoss.enableBody = false
       
      var timedEvent4 = this.time.addEvent({ delay: 1200, callback: checkRemainingBosses(computerBoss), callbackScope: this})

    placeholderInInventory = true
    }}

    function checkRemainingBosses(boss) {
      if (boss == computerBoss){
        defeatedBosses.push(listOfBosses.shift())
      }
        //
      else if (boss == bookBoss){
        defeatedBosses.push(listOfBosses.pop())
      }
      //
      console.log(remainingBosses)
      for (i = 0; i < listOfBosses.length; i++){
        remainingBosses--
      }
      console.log("remainingBosses = " + remainingBosses)
      console.log("defeatedBosses = " + defeatedBosses)
      
      remainingBossesText.visible = true
      remainingBossesText.anims.play("basicRemainingBossesText", true)

      bossCount()
      //var timedEvent5 = this.time.addEvent({ delay: 1000, callback: bossCount(), callbackScope: this})
    }
    if (currentBoss=="bookBoss"){
      bookBoss.visible=false;
      bBossAlive=false;
    }
    door.visible=true
  }


function damagePlayer(){
  console.log("You were hit!")
  playerHealth -= 1
  console.log(playerHealth)

	currentBossProjectile.setVisible(false);
  currentBossProjectile.setActive(false)
  
  if (playerHealth <= 0){
    bossAttack = false
    playerHealth = 100
    bossHealth = 100
    this.scene.start("SceneOne")
  }
}

function pickUp(item) {

}

  



/*
function npcTalk() { function NpcTalk() { if (talkingToNPC == false){
      if (keyI.isDown == true){
        canMove = false
        player.setVelocityX(0)
        player.setVelocityY(0)
        console.log("Inventory Open")
      if (placeholderInInventory == false){
        inventory.x = player.x - 150
        inventory.y = player.y
        inventory.play('blankInven')
        inventory.visible = true
        //console.log("blankInven")
      }
    else if (placeholderInInventory == true){
        inventory.play('onlyPlaceholder')
       inventory.x = player.x - 150
      inventory.y = player.y
        inventory.visible = true
       
        //console.log("Placeholder")
      }
    }

    if (keyI.isDown == false){
      inventory.visible = false
      canMove = true
    }
    }
    }}
*/
 function bossCount(){
   console.log("counting bosses")
        if (remainingBosses == 0){
          remainingBossesText.anims.play("remainingBosses0", true)
          console.log("You defeated all bosses!")
        }
        else if (remainingBosses == 1){
          remainingBossesText.anims.play("remainingBosses1", true)
          console.log("There is one boss remaining.")
        }
        else if (remainingBosses == 2){
          remainingBossesText.anims.play("remainingBosses2", true)
          console.log("There are two bosses remaining.")
        }
      }


    