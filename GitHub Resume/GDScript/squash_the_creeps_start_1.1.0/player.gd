extends CharacterBody3D

# Emitted when the player was hit by a mob
signal hit
# Emitted when the player hits a power-up

# How fast the player moves in meters per second
@export var speed = 14
# The downward acceleration when in the air, in meters per second squared
@export var fall_acceleration = 75
# Vertical impulse applied to the character upon jumping in meters per second
@export var jump_impulse = 20
# Vertical impulse applied to the character upon bouncing over a mob in
# meters per second
@export var bounce_impulse = 16

# A 3D vector combining a speed with direction.
# It is a property because we want to update and reuse its value across frames
var target_velocity = Vector3.ZERO

# Like _process(), this function allows you to update the node every frame
# However, it is designed specifically for physics=related code (like moving a kenematic or rigid body)
func _physics_process(delta):
	# We create a local variable to store the input direction
	var direction = Vector3.ZERO
	
	# We check for each move input and update the direction accordingly
	if Input.is_action_pressed("move_right"):
		direction.x += 1
	if Input.is_action_pressed("move_left"):
		direction.x -= 1
	if Input.is_action_pressed("move_back"):
		# Notice how we are working with the vector's x and z axes
		# In 3D, the XZ plane is the ground plane
		direction.z += 1
	if Input.is_action_pressed("move_forward"):
		direction.z -= 1
	
	# Normalizes movement so we don't move faster on diagonals	
	if direction != Vector3.ZERO: 
		direction = direction.normalized()
		# Setting the basis property will affect the rotation of the node
		$Pivot.basis = Basis.looking_at(direction)
		$AnimationPlayer.speed_scale = 4
	else:
		$AnimationPlayer.speed_scale = 1
		
	# Ground Velocity
	target_velocity.x = direction.x * speed
	target_velocity.z = direction.z * speed
	
	# Vertical Velocity
	# If in the air, fall towards the floor. Literally gravity
	if not is_on_floor():
		target_velocity.y = target_velocity.y - (fall_acceleration * delta)
	
	# Moving the Character
	velocity = target_velocity
	
	# Jumping
	if is_on_floor() and Input.is_action_just_pressed("jump"):
		target_velocity.y = jump_impulse

	# Iterate through all collisions that occurred this frame
	for index in range(get_slide_collision_count()):
		# We get one of the collisions with the player
		var collision = get_slide_collision(index)
		
		# If the collision is with the ground
		if collision.get_collider() == null:
			continue
		
		# If the collider is with a mob
		if collision.get_collider().is_in_group("mob"):
			var mob = collision.get_collider()
			# We check that we are hitting it from above
			if Vector3.UP.dot(collision.get_normal()) > 0.1:
				# If so, we squash it and bounce
				mob.squash()
				target_velocity.y = bounce_impulse
				# Prevent further duplicate calls
				break
				
		# If the collider is with a power-up
		elif collision.get_collider().is_in_group("power_up"):
			var power_up = collision.get_collider()
			# we check that we are hitting it
			if Vector3.UP.dot(collision.get_normal()) > 0.1:
				# If so, we squash it and bounce
				power_up.collect_power_up()
				target_velocity.y = bounce_impulse
				# Prevent further duplicate calls
				break
		
	$Pivot.rotation.x = PI / 6 * velocity.y / jump_impulse

	move_and_slide()

func die():
	hit.emit()
	queue_free()
	
func _on_mob_detector_body_entered(body):
	die()


func _on_power_up_detector_body_entered(body):
	queue_free()
