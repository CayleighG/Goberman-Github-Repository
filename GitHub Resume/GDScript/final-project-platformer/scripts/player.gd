extends CharacterBody2D


const SPEED = 300.0
const jump_velocity = -400.0

# Grappling Hook Variables
var hookPosition = Vector2()
var isHooked = false
var ropeLength = 375
var currentRopeLength
var swingLeap = false

var lockVelX
var lockVelXDirection
var angle
var radius
var launch
var boulderLaunch = false
var boulderPush = false

var invincible = false
var player_attack = false
var isHealing = false
# Current health (cannot exceed 5)
var playerHealth: int = 5:
	set(val):
		playerHealth = clampi(val, 0, 5)
var knockbackStrength = 30000.0
var player_damaged = false
var attackhookPosition = Vector2()
var playerDead = false
var inFrontOfExit = false
var completedGame = false

signal grappleGlow
signal endGlow
signal enemyGlow
signal endEnemyGlow
signal enemy_knockback(player_position, delta)
signal setBoulderYVel(player_position, delta, collider)
signal playerDeath
signal restart
signal canExit

# Shoddy fix for the slow-down problems in attack() if we attack while in slow motion
var wasInSloMo = false

# Slowing Time Variables
const normalTime = 1
var startValue = 0.1 # Determines the strength of slowed time once it starts
	
func _ready():
	$HUD/HealthBar.hide()
	$BackgroundColor.modulate = Color(0,0,0,0)
	$AnimatedSprite2D.play("fall")
	$HUD/GameOverLabel.hide()
	$HUD/GameOverButton.hide()
	currentRopeLength = ropeLength
	launch = false
	set_physics_process(false)

func _physics_process(delta: float) -> void:
	if !completedGame:
		if Input.is_anything_pressed() and !launch and !playerDead:
			if !invincible and !boulderLaunch:
				input()
			else:
				velocity.x = move_toward(velocity.x, 0, SPEED)
		if !Input.is_anything_pressed() and !isHooked and !swingLeap and !launch:
			if is_on_floor() and !playerDead and !boulderPush:
				$AnimatedSprite2D.play("idle")
			#else:
				#$AnimatedSprite2D.play("fall")
			velocity.x = move_toward(velocity.x, 0, SPEED)
		if !is_on_floor() && !playerDead:
			$AnimatedSprite2D.play("fall")
		
		# GRAPPLING
		if !player_damaged:
			hook(delta)
		# Draws the grappling hook
		queue_redraw()
		if isHooked:
			swingLeap = false
			swing(delta)
			# Speed of the swing
			velocity *= 0.975
	
		if swingLeap && !isHooked && !player_attack:
			postSwingMomentum(delta)
	
		if (is_on_floor() && swingLeap == true) or (is_on_wall() && swingLeap == true):
			swingLeap = false
		if (is_on_floor() or is_on_wall() or is_on_ceiling()) && launch == true:
			launch = false
		
		if launch:
			checkIfInCircle(global_position, hookPosition, radius.length())
		else:
			# Add the gravity.
			velocity += get_gravity() * delta
		
		# COMBAT
		for detector in $EnemyCollisionDetectors.get_children():
			# Needed the "(detector.get_collider() != null)" or else it crashes after deleting the collider
			if detector.is_colliding() and (detector.get_collider() != null) && !playerDead:
				var collider = detector.get_collider()
				if collider.is_in_group("enemy"):
					# If not attacking
					if !invincible:
						playerDamaged(collider, delta)
					# If attacking
					elif invincible and player_attack:
						isHooked = false
						launch = false
						enemy_knockback.emit(global_position, delta)
						knockback(collider, delta)
				# If the player collects a healing item
				elif collider.is_in_group("healing_item"):
					if !isHealing:
						$ResetHealVariableTimer.start()
						isHealing = true
						heal()
					collider.delete_item()
				elif collider.is_in_group("environmental_hazard"):
					if !invincible:
						playerDamaged(collider, delta)
				elif collider.is_in_group("boulder"):
					if boulderLaunch:
						boulderLaunch = false
						isHooked = false
						setBoulderYVel.emit(global_position, delta, collider)
						knockback(collider, delta)
					else:
						boulderPush = true
						var current_animation = $AnimatedSprite2D.get_animation()
						if current_animation != "push":
							if Input.is_action_pressed("right") or Input.is_action_pressed("left"):
								$AnimatedSprite2D.play("push")
							else:
								boulderPush = false
						$BoulderPushTimer.start()
		
		if invincible and !player_attack:
			$HUD/HealthBar.play("damage")
			$AnimatedSprite2D.play("damage")
	
		if $ExitDetector.is_colliding():
			inFrontOfExit = true
			canExit.emit(inFrontOfExit)
		else:
			inFrontOfExit = false
			canExit.emit(inFrontOfExit)

		move_and_slide()
	
func _draw():
	if isHooked:
		if (hookPosition != null):
			# Draws the grappling rope
			draw_line(Vector2(10, 6.5), to_local(hookPosition), Color(1, 1, 0, 1), 3, true) # light yellow
		else:
			draw_line(Vector2(10, 6.5), to_local(attackhookPosition), Color(1, 1, 0, 1), 3, true) # light yellow
	else:
		return
	
func input():
	# Get the input direction and handle the movement/deceleration.
	# As good practice, you should replace UI actions with custom gameplay actions.
	var direction := Input.get_axis("left", "right")
	
	if Input.is_action_just_pressed("jump") and is_on_floor():
			velocity.y = jump_velocity
			$AnimatedSprite2D.play("jump")
			
	elif direction: 
		if Input.is_action_pressed("right") and !boulderPush:
			$AnimatedSprite2D.flip_h = false
			if is_on_floor() and !boulderPush:
				$AnimatedSprite2D.play("walk")
		elif Input.is_action_pressed("left"):
			$AnimatedSprite2D.flip_h = true
			if is_on_floor() and !boulderPush:
				$AnimatedSprite2D.play("walk")
		velocity.x = direction * SPEED
	
# Firing the grappling hook	
func hook(delta):
	# This shoots to where the mouse clicks
	$Raycast.look_at(get_global_mouse_position())
	## Grapple point glow effects
	if Input.is_action_pressed("right_click") and !isHooked:
		wasInSloMo = true
		# Slows time
		Engine.time_scale = startValue # 0.1
		# Takes care of movement speed specifically in slow motion
		# If not in place, the player will never stop sliding around
		if !Input.is_action_pressed("left") and !Input.is_action_pressed("right"):
			velocity.x = move_toward(velocity.x, 0, SPEED * 0.1)
			if !is_on_floor():
				$AnimatedSprite2D.play("fall")
			else:
				$AnimatedSprite2D.play("idle")

		# All grapple points glow while in slow motion
		# Glows different color if selected
		grappleGlow.emit()
		enemyGlow.emit()
		for raycast in $Raycast.get_children():
			if raycast.is_colliding():
				var grapple_point = raycast.get_collider()
				if grapple_point.is_in_group("boulder_grapple_point") or grapple_point.is_in_group("grapple_point") or grapple_point.is_in_group("enemy_grapple_point"):
					grapple_point._on_player_grapple_select()
	
	## Ends glow effect without grappling
	if Input.is_action_just_released("right_click") and !isHooked:
		wasInSloMo = false
		# Puts time back to normal
		Engine.time_scale = normalTime
		endGlow.emit()
		endEnemyGlow.emit()
		
		
	if Input.is_action_just_pressed("left_click") and !isHooked:
		# Puts time back to normal
		Engine.time_scale = normalTime
		endGlow.emit()
		endEnemyGlow.emit()
		hookPosition = get_hook_pos(delta)
		if hookPosition:
			isHooked = true
			# Sets rope length to be from player to hookPosition
			currentRopeLength = global_position.distance_to(hookPosition)
			
	# Launching mechanic
	elif Input.is_action_just_pressed("left_click") and isHooked and !player_attack:
		velocity = Vector2(0,0)
		if (hookPosition != null):
			radius = hookPosition - global_position
			checkIfInCircle(global_position, hookPosition, radius.length())

		# Where we want to go - where we are
		# velocity = speed * direction
		# We are adding ".normalized()" so that we get the direction, but without changing values
		# We then multiply it by the speed to get a constant velocity no matter what direction it is facing
			velocity = (hookPosition - global_position).normalized() * (delta * 80000)
			launch = true
		isHooked = false
		
	elif Input.is_action_just_pressed("jump") and isHooked:
		isHooked = false
		velocity.y = jump_velocity
		swingLeap = true
		lockVelX = velocity.x
		lockVelXDirection = lockVelX
		$AnimatedSprite2D.play("jump")
		postSwingMomentum(delta)

# Getting the position of the grappling hook's, well, hook
func get_hook_pos(delta):
	var count = 0
	for raycast in $Raycast.get_children():
		if raycast.is_colliding():
			var collider = raycast.get_collider()
			if collider.is_in_group("enemy_grapple_point") or collider.is_in_group("boulder_grapple_point"):
				hookPosition = raycast.get_collision_point()
				# So we only call it once
				if (count < 1):
					attack(collider, delta)
				count += 1
			elif collider.is_in_group("grapple_point"):
				# If it returns a collision point, raycast = true, which will in turn mean hookPosition and isHooked = true
				return raycast.get_collision_point()
			
# Calculations for the swing once the grappling hook is connected
func swing(delta):
	# Checking if hookPosition == null prevents the game from crashing if we try to shoot into empty space
	if (hookPosition != null):
		radius = global_position - hookPosition
		var radiusDirection = radius.normalized()
		var gravity = get_gravity()
		angle = acos(radiusDirection.dot(gravity.normalized()))
		
		if velocity.length() < 0.01 or radius.length() < 20:
			return
		
		# Have this here so that we always swing down
		# If it was not here and we swung above y = 0, then we would fall upward
		if ((global_position.y - hookPosition.y) > 0):
			# Right
			if ((global_position.x - hookPosition.x) > 5):
				velocity += -gravity.length() * cos(angle) * radiusDirection.orthogonal() * delta
			# Left
			elif ((global_position.x - hookPosition.x) < -5): 
				velocity += gravity.length() * cos(angle) * radiusDirection.orthogonal() * delta
			else:
				pass
			# Need to include the "!"'s or else the velocities combine together and stretch the rope
			# Consequence is that they cancel out and the player just dangles, but that's not much of a problem atm
			if Input.is_action_pressed("left") && !Input.is_action_pressed("right"):
				velocity.x -= SPEED * 100 * delta
			elif Input.is_action_pressed("right") && !Input.is_action_pressed("left"):
				velocity.x += SPEED * 100 * delta
				
		if radius.length() != currentRopeLength:
			global_position = hookPosition + radius.normalized() * currentRopeLength
		
func postSwingMomentum(delta):
	# X velocity is retained until player tries to move in the opposite direction
	# X velocity is canceled once the player hits a wall or the floor, but that's back in _physics_process()
	velocity.x = lockVelX
	# This only activates if the angle is greater than a certain point
	# Otherwise we will be stuck falling with velocity.x ~= 0
	if (angle != null) && (angle > 0.05):
		# Right = positive, left = negative
		if (lockVelXDirection > 0) && Input.is_action_pressed("left"):
			if (lockVelX > 5):
				# delta = 0.01667
				# lockVelX *= 0.95
				# 0.01667 * 57.9886 = 0.95
				lockVelX *= (delta  * 57.9886)
			elif (0.5 <= lockVelX) && (lockVelX <= 5):
				lockVelX = -1.5
			else:
				if lockVelX > -SPEED:
					# lockVelX *= 1.8
					lockVelX *= (delta  * 107.9784)
				else:
					lockVelX = -SPEED
		elif (lockVelXDirection < 0) && Input.is_action_pressed("right"):
			if (lockVelX < -5):
				# lockVelX *= 0.95
				lockVelX *= (delta  * 57.9886)
			elif (-0.5 >= lockVelX) && (lockVelX >= -5):
				lockVelX = 1.5
			else:
				if lockVelX < SPEED:
					# lockVelX *= 1.8
					lockVelX *= (delta  * 107.9784)
				else:
					lockVelX = SPEED
	else:
		swingLeap = false

# If sign_approx(d) returns a value >0, then we are outside the launch circle
func checkIfInCircle(position:Vector2, center:Vector2, radius:float):
	var n = position - center
	var d = n.dot(n) - (radius * radius)
	return sign_approx(d)
	
func sign_approx(a:float) -> int:
	if is_zero_approx(a):
		return 0
	elif a > 0:
		launch = false
		velocity.x *= 0.2
		velocity.y *= 0.5
		lockVelX = velocity.x
		lockVelXDirection = lockVelX
		swingLeap = true
		return 1
	else:
		return -1


func _on_start_button_pressed():
	$HUD/StartButton.hide()
	$HUD/StartMessage.hide()
	$HUD/HealthBar.show()
	detectPlayerHealth()
	set_physics_process(true)


func playerDamaged(enemy, delta):
	playerHealth -= 1
	# In case the player made contact in slow motion
	isHooked = false
	Engine.time_scale = normalTime
	# Damage
	player_damaged = true
	invincible = true
	
	# Turns player opacity to 0.5
	modulate.a = 0.5
	$InvincibilityTimer.start()
	
	$HUD/HealthBar.play("damage")
	$AnimatedSprite2D.play("damage")
	
	knockback(enemy, delta)
	
	# Player Health
	
	
func knockback(enemy, delta):
	var xVel
	var yVel = -SPEED * 1.5
	# Collide on the left
	if enemy.global_position.x < global_position.x:
		xVel = SPEED * 500 * delta
	# Collide on the right
	else:
		xVel = SPEED * -500 * delta
	velocity = Vector2(xVel, yVel)
	

## Detects when the timer for the invincibility frames ends
func _on_invincibility_timer_timeout() -> void:
	# Sets player model back to opaque
	modulate.a = 1
	invincible = false
	player_attack = false
	boulderLaunch = false
	wasInSloMo = false
	# In case we didn't make contact with the enemy
	# But also if we are not latched on to a different grapple point
	if hookPosition == null:
		isHooked = false
	player_damaged = false
	# Sets the animation of the health bar
	detectPlayerHealth()

func detectPlayerHealth():
	if playerHealth == 5:
		$HUD/HealthBar.play("fullHealth")
	elif playerHealth == 4:
		$HUD/HealthBar.play("fourHearts")
	elif playerHealth == 3:
		$HUD/HealthBar.play("threeHearts")
	elif playerHealth == 2:
		$HUD/HealthBar.play("twoHearts")
	elif playerHealth == 1:
		$HUD/HealthBar.play("oneHeart")
	elif playerHealth <= 0:
		playerDead = true
		# This is a placeholder; change later
		$BackgroundColor.modulate = Color(0,0,0,1)
		$HUD/HealthBar.hide()
		$AnimatedSprite2D.play("death")
		# Add a death timer for the animation
		$DeathAnimationTimer.start()
		# Once its done, game over buttons appear
		playerDeath.emit()

func heal():
	playerHealth += 1
	$HealingEffect.play("heal")
	healHealthBarAnimation()

func healHealthBarAnimation():
	$HealAnimationTimer.start()
	if playerHealth == 5:
		$HUD/HealthBar.play("healFiveHearts")
	elif playerHealth == 4:
		$HUD/HealthBar.play("healFourHearts")
	elif playerHealth == 3:
		$HUD/HealthBar.play("healThreeHearts")
	elif playerHealth == 2:
		$HUD/HealthBar.play("healTwoHearts")
		

func _on_heal_animation_timer_timeout() -> void:
	detectPlayerHealth()
	

func attack(enemy, delta):
	isHooked = true
	# Sets rope length to be from player to hookPosition
	currentRopeLength = global_position.distance_to(hookPosition)
	attackhookPosition = hookPosition
	if enemy.is_in_group("enemy_grapple_point"):
		player_attack = true
		invincible = true
	elif enemy.is_in_group("boulder_grapple_point"):
		boulderLaunch = true
	$InvincibilityTimer.start()
	# Collide on the left
	if enemy.global_position.x < global_position.x:
		if !wasInSloMo:
			velocity.x = SPEED * -500 * delta
		else:
			velocity.x = SPEED * -500 * 10 * delta
	# Collide on the right
	else:
		if !wasInSloMo:
			velocity.x = SPEED * 500 * delta
		else:
			velocity.x = SPEED * 500 * 10 * delta
	if enemy.global_position.y < global_position.y:
		if !wasInSloMo:
			velocity.y = SPEED * -50 * delta
		else:
			velocity.y = SPEED * -500 * delta
	else:
		if !wasInSloMo:
			velocity.y = SPEED * 50 * delta
		else:
			velocity.y = SPEED * 500 * delta


func _on_death_animation_timer_timeout() -> void:
	$HUD/GameOverLabel.show()
	$HUD/GameOverButton.show()


func _on_game_over_button_pressed() -> void:
	restart.emit()


func _on_boulder_push_timer_timeout() -> void:
	boulderPush = false


func _on_reset_heal_variable_timer_timeout() -> void:
	isHealing = false
