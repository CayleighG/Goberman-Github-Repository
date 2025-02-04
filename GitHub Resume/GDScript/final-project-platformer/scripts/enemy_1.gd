extends CharacterBody2D

const SPEED = 50.0
var direction = -1
var knockback = false
var stop = false

func _ready(): 
	velocity.x = SPEED
	$AnimatedSprite2D.play("idle")

func _physics_process(delta: float) -> void:
	if is_on_wall() or (is_on_floor() and not $FloorDetector.is_colliding()):
		direction = direction * -1
		$AnimatedSprite2D.flip_h = not $AnimatedSprite2D.flip_h
		$grapple_point.position.x *= -1
		$FloorDetector.position.x *= -1
		if is_on_wall():
			$FlipTimer.start()
	
	if not is_on_floor():
		velocity += get_gravity() * delta
		
	if !knockback and !stop:
		if direction == 1:
			velocity.x = SPEED
		else: 
			velocity.x = -SPEED
	else:
		velocity.x = move_toward(velocity.x, 0, SPEED)
	
	if velocity == Vector2(0,0):
		knockback = false
		
	for detector in $HazardCollisionDetectors.get_children():
		# Needed the "(detector.get_collider() != null)" or else it crashes after deleting the collider
		if detector.is_colliding() and (detector.get_collider() != null):
			var collider = detector.get_collider()
			if collider.is_in_group("environmental_hazard"):
				# If not attacking
				if (stop == false):
					$DeathAnimationTimer.start()
					stop = true
					$AnimatedSprite2D.play("death")
	
	move_and_slide()

func enemy_knockback(player_position, delta) -> void:
	knockback = true
	var xVel
	var yVel = -SPEED * 1.5
	# Collide on the left
	if player_position.x < global_position.x:
		xVel = SPEED * 1100 * delta
	# Collide on the right
	else:
		xVel = SPEED * -1100 * delta
	velocity = Vector2(xVel, yVel)
	
func player_death():
	stop = true
	$AnimatedSprite2D.stop()

func player_respawn():
	stop = false
	$AnimatedSprite2D.play("idle")


func _on_death_animation_timer_timeout() -> void:
	queue_free()

func _on_flip_timer_timeout() -> void:
	$CollisionShape2D.position.x *= -1
