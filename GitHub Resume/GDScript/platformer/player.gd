extends CharacterBody2D

signal readyToLeave
signal changeScene

@onready var _animated_sprite = $AnimatedSprite2D
@export var bounce_impulse = 16
var score;
var deathHop = false;
var playerAlive = false;
var gameOver = false;
var jumpCount = 0;
var totalEnemies = 4;
var defeatedEnemies = 0

const SPEED = 300.0
const JUMP_VELOCITY = -400.0

func _ready():
	if get_tree().current_scene.name == "Level 1":
		score = 0
	else:
		score = 4
	
	$AnimatedSprite2D.play("idle")
	scale.y = 1
	$HUD/ScoreLabel.hide()

func _physics_process(delta: float) -> void:
	# Add the gravity.
	if not is_on_floor():
		velocity += get_gravity() * delta
	
	if is_on_floor():
		jumpCount = 0

	# Get the input direction and handle the movement/deceleration.
	# As good practice, you should replace UI actions with custom gameplay actions.
	var direction := Input.get_axis("left", "right")
	
	# Handle jump.
	if Input.is_action_just_pressed("jump") and jumpCount <= 1 and playerAlive:
		jumpCount += 1
		velocity.y = JUMP_VELOCITY
		_animated_sprite.play("jump_animation")
		
	elif direction and playerAlive:
		if Input.is_action_pressed("right") and is_on_floor():
			_animated_sprite.flip_h = false
			_animated_sprite.play("walk")
			
		elif Input.is_action_pressed("left") and is_on_floor():
			_animated_sprite.flip_h = true
			_animated_sprite.play("walk")
			
		velocity.x = direction * SPEED
		
	elif playerAlive:
		velocity.x = move_toward(velocity.x, 0, SPEED)
		
		# Idle animation
		if !Input.is_anything_pressed() and is_on_floor():
			_animated_sprite.play("idle")
		
	if not is_on_floor() and $EnemyDeathDetector.is_colliding():
		if position.y < 1150:
			var enemy = $EnemyDeathDetector.get_collider()
			velocity.y = JUMP_VELOCITY
			_animated_sprite.play("jump_animation")
			score += 1
			$HUD/ScoreLabel.text = "Score: %s" % score
			# This is here to catch a nasty bug that will crash the game if the player lands on an enemy on a diagonal. 
			# Hitting the enemy at a certain angle causes EnemyDeathDetector to run twice, 
			# which doubles the score and enemies defeated.
			# The game will also crash, as the when it is run twice, there is no enemy to apply enemyDeath() to.
			if enemy != null:
				enemy.enemyDeath()
			else: 
				defeatedEnemies -= 1
				score -= 1
				$HUD/ScoreLabel.text = "Score: %s" % score
				
			defeatedEnemies += 1
		else: 
			playerDeath()
	
	elif $PlayerDeathDetectorRight.is_colliding() or $PlayerDeathDetectorLeft.is_colliding():
		playerDeath()
		
	if defeatedEnemies == totalEnemies:
		$HUD/Message.text = "All enemies have been defeated! Find the jewel to leave!"
		$HUD/Message.show()
		readyToLeave.emit()
		
	if $ExitDetector.is_colliding():
		changeScene.emit()
	
	move_and_slide()


func _on_start_button_pressed() -> void:
	playerAlive = true
	$HUD/StartButton.hide()
	$HUD/Message.hide()
	if get_tree().current_scene.name == "Level 1":
		score = 0
		$HUD/ScoreLabel.text = "Score: %s" % score
	else:
		score = 4
		$HUD/ScoreLabel.text = "Score: %s" % score
	
	if gameOver == true: 
		$HUD/ScoreLabel.text = "Score: %s" % score
		$AnimatedSprite2D.scale.y = 1
		deathHop = false
		gameOver = false
		$EnemyDeathDetector.enabled = true
		$PlayerDeathDetectorLeft.enabled = true
		$PlayerDeathDetectorRight.enabled = true
		# Reloads entire level
		get_tree().reload_current_scene()
	$HUD/ScoreLabel.show()

func playerDeath():
	playerAlive = false
	gameOver = true
		
	# Need to initialize enemy to something or else the code doesn't run
	var enemy = $PlayerDeathDetectorRight.get_collider()
		
	if $PlayerDeathDetectorRight.is_colliding(): 
		enemy = $PlayerDeathDetectorRight.get_collider()
	elif $PlayerDeathDetectorLeft.is_colliding(): 
		enemy = $PlayerDeathDetectorLeft.get_collider()
		
	velocity.x = 0
			
	if position.y < 1150:
		enemy.playerDeath()
		
	$AnimatedSprite2D.scale.y = -1
	$AnimatedSprite2D.play("death")
	$AnimatedSprite2D.stop()
	if (deathHop == false):
		velocity.y = JUMP_VELOCITY
		deathHop = true;
			
	# Set these to true to turn back on
	$EnemyDeathDetector.enabled = false
	$PlayerDeathDetectorLeft.enabled = false
	$PlayerDeathDetectorRight.enabled = false
		
	$HUD/Message.text = "Game Over!"
	$HUD/Message.show()
	$HUD/StartButton.text = "Retry"
	$HUD/StartButton.show()
