extends CharacterBody2D


const speed = 300.0
var jump_velocity = -400.0
# Allows us to change the gravity affecting the player in bubble mode
var gravity = 980.0
# Will lock HUD in place at end so the player character appears to fall
var hudPositionAtEnd

var level1
var level2
var level3

var onCooldown = false

var level = 1
var score = 0
var title = true
var gameOver = false
var lockHUD = false
var canCloseGame = false

signal show_final_dialogue()
signal send_current_level(level:int)

func _ready() -> void:
	$ChildSprite.hide()
	$PreteenSprite.hide()
	$TeenSprite.hide()
	$ExitPrompt.hide()
	get_node("Bubble1CollisionShape").disabled = true
	get_node("Bubble2CollisionShape").disabled = true
	$Bubble1.hide()
	$Bubble2.hide()
	$HUD/End.hide()
	$HUD/CloseGame.hide()
	$HUD/Credits.hide()
	$HUD/ScoreBackground.hide()
	$HUD/ScoreLabel.hide()


func _physics_process(delta: float) -> void:
	if !title:
		# Add the gravity.
		if not is_on_floor():
			#velocity += get_gravity() * delta
			velocity.y += gravity * delta

		# Get the input direction and handle the movement/deceleration..
		var direction := Input.get_axis("left", "right")
	
		# Handle jump
		if Input.is_action_just_pressed("up") and !gameOver:
			# If we are in level 1, we are still on the floor
			# As such, we should be constrained by gravity
			if level1:
				if is_on_floor():
					velocity.y = jump_velocity
					$ChildSprite.play("jump")
			# If we are not in level 1, then we are free floating in a bubble
			# So gravity doesn't apply as much and we can "jump" in mid-air
			else:
				velocity.y = jump_velocity
			
		elif direction and !gameOver:
			# When the play walks/floats to the right
			if Input.is_action_pressed("right"):
				if level1:
					$ChildSprite.flip_h = false
					if is_on_floor():
						$ChildSprite.play("walk")
				elif level2:
					$PreteenSprite.flip_h = false
				elif level3:
					$TeenSprite.flip_h = false
			# When the player walks/floats to the left
			elif Input.is_action_pressed("left"):
				if level1:
					$ChildSprite.flip_h = true
					if is_on_floor():
						$ChildSprite.play("walk")
				elif level2:
					$PreteenSprite.flip_h = true
				elif level3:
					$TeenSprite.flip_h = true
			velocity.x = direction * speed
		else:
			if level1:
				# Control is easy in first level; the player stops quickly
				velocity.x = move_toward(velocity.x, 0, speed)
			elif level2 or level3:
				# Control is more floaty in the second level
				velocity.x = move_toward(velocity.x, 0, speed/40)
			#elif level3:
				# Control is most difficult in second level
				#velocity.x = move_toward(velocity.x, 0, speed/80)
			if !Input.is_anything_pressed():
				if level1:
					if is_on_floor():
						$ChildSprite.play("idle")
					
	
		if $ExitDetector.is_colliding() and !gameOver:
			$ExitPrompt.show()
			if Input.is_action_just_released("enter"):
				if level1:
					gravity = 220.0
					jump_velocity = -200.0
				
					get_node("Bubble1CollisionShape").disabled = false
					$Bubble1.show()
					$ChildSprite.hide()
					$PreteenSprite.show()
					$TeenSprite.hide()
				
					global_position = Vector2i(32, 5568)
					#global_position = Vector2i(0,-48)
					print(global_position)
					level += 1
					send_current_level.emit(level)
					level1 = false
					level2 = true
				elif level2:
					get_node("Bubble1CollisionShape").disabled = true
					get_node("Bubble2CollisionShape").disabled = false
					$Bubble1.hide()
					$Bubble2.show()
					$ChildSprite.hide()
					$PreteenSprite.hide()
					$TeenSprite.show()
				
					global_position = Vector2i(8032, 5568)
					print(global_position)
					level += 1
					send_current_level.emit(level)
					level2 = false
					level3 = true
				elif level3:
					show_final_dialogue.emit()
					hudPositionAtEnd = global_position
					level += 1
					send_current_level.emit(level)
					gameOver = true
					lockHUD = true
					get_node("Bubble2CollisionShape").disabled = true
					$Bubble2.hide()
					$ExitPrompt.hide()
					$HUD/ScoreLabel.hide()
					$HUD/ScoreBackground.hide()
					velocity.y = jump_velocity
					get_node("CollisionShape2D").disabled = true
					$GameOverTimer.start()
				print("Level ", level)
		else:
			$ExitPrompt.hide()
		
		# Popping Guide Bubbles
		for detector in $ChildBubbleDetectors.get_children():
			# Needed the "(detector.get_collider() != null)" or else might crash after deleting the collider
			if detector.is_colliding() and (detector.get_collider() != null) and level1 and !onCooldown:
				onCooldown = true
				$ScoreCooldownTimer.start()
				score += 1
				$HUD/ScoreLabel.text = "Bubbles Popped: %s" % score
				var collider = detector.get_collider()
				collider.queue_free()
		for detector in $PreteenBubbleDetectors.get_children():
			# Needed the "(detector.get_collider() != null)" or else might crash after deleting the collider
			if detector.is_colliding() and (detector.get_collider() != null) and level2:
				var collider = detector.get_collider()
				if collider.is_in_group("pathway_bubble") and !onCooldown:
					onCooldown = true
					$ScoreCooldownTimer.start()
					score += 1
					$HUD/ScoreLabel.text = "Bubbles Popped: %s" % score
					collider.queue_free()
				elif collider.is_in_group("obstacles"):
					playerDeath()
		for detector in $TeenBubbleDetectors.get_children():
			# Needed the "(detector.get_collider() != null)" or else might crash after deleting the collider
			if detector.is_colliding() and (detector.get_collider() != null) and level3:
				var collider = detector.get_collider()
				if collider.is_in_group("pathway_bubble") and !onCooldown:
					onCooldown = true
					$ScoreCooldownTimer.start()
					score += 1
					$HUD/ScoreLabel.text = "Bubbles Popped: %s" % score
					collider.queue_free()
				elif collider.is_in_group("obstacles"):
					playerDeath()
			
		if lockHUD:
			$HUD.global_position = hudPositionAtEnd
		if canCloseGame:
			if Input.is_action_just_released("enter"):
				get_tree().quit()
	

		move_and_slide()
	elif (title && Input.is_action_just_pressed("enter")):
		title = false;
		
		$HUD/TitleScreen.hide()
		$HUD/PressEnterToStart.hide()
		
		global_position = Vector2i(-23, 0)
		
		$HUD/ScoreLabel.text = "Bubbles Popped: %s" % score
		$HUD/ScoreLabel.show()
		$HUD/ScoreBackground.show()
		$ChildSprite.show()
		$ChildSprite.play("idle")
		
		var level = 1
		send_current_level.emit(level)
		print("Level ", level)
		print(global_position)
	
		level1 = true
		level2 = false
		level3 = false

# Creates the end-game/credits screen
func _on_game_over_timer_timeout() -> void:
	if lockHUD:
		lockHUD = false
		$TeenSprite.hide()
		get_node("CollisionShape2D").disabled = false
		global_position = hudPositionAtEnd
		#global_position.x = hudPositionAtEnd.x
		#global_position.y = hudPositionAtEnd.y - 50
		$HUD.global_position = global_position
		canCloseGame = true
		$HUD/ScoreLabel.show()
		$HUD/End.show()
		$HUD/CloseGame.show()
		$HUD/Credits.show()
		
		$HUD/ScoreLabel.global_position.x = $HUD/End.global_position.x
		$HUD/ScoreLabel.global_position.y = $HUD/End.global_position.y + 400
		
func playerDeath():
	if level2:
		global_position = Vector2i(32, 5568)
	elif level3:
		global_position = Vector2i(8032, 5568)
	
# A brief cooldown period (0.1 sec) prevents the points for a single bubble from being counted twice
# The bubble can only be popped and added to the score when onCooldown = false	
func _on_score_cooldown_timer_timeout() -> void:
	onCooldown = false
