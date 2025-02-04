extends RigidBody2D

var startingPosition = Vector2()
var crumbling

var boulder1
var boulder2
var boulder3
var boulder4
var boulder5

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	boulder1 = get_node("/root/World/Boulder1")
	boulder2 = get_node("/root/World/Boulder2")
	boulder3 = get_node("/root/World/Boulder3")
	boulder4 = get_node("/root/World/Boulder4")
	boulder5 = get_node("/root/World/Boulder5")
	startingPosition = global_position
	crumbling = false
	#linear_velocity.y = -9000
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta: float) -> void:
	for detector in $DamageDetectors.get_children():
		if detector.is_colliding():
			var collider = detector.get_collider()
			if collider.is_in_group("environmental_hazard"):
				if (crumbling == false):
					crumbling = true
					$CrumbleTimer.start()
					$AnimatedSprite2D.play("crumble")

func set_y_vel(player_position, delta, collider):
	if (collider.name == "Boulder1"):
		var xVelocity = boulder1.get_linear_velocity().x
		if (player_position < boulder1.global_position):
			if (xVelocity < 10):
				xVelocity = 50000 * delta
		elif (player_position > boulder1.global_position):
			if (xVelocity < 10):
				xVelocity = -50000 * delta
		boulder1.set_linear_velocity(Vector2(xVelocity, (-75000 * delta)))
		
	elif (collider.name == "Boulder2"):
		var xVelocity = boulder2.get_linear_velocity().x
		if (player_position < boulder2.global_position):
			if (xVelocity < 10):
				xVelocity = 50000 * delta
		elif (player_position > boulder2.global_position):
			if (xVelocity < 10):
				xVelocity = -50000 * delta
		boulder2.set_linear_velocity(Vector2(xVelocity, (-75000 * delta)))
		
	elif (collider.name == "Boulder3"):
		var xVelocity = boulder3.get_linear_velocity().x
		if (player_position < boulder3.global_position):
			if (xVelocity < 10):
				xVelocity = 50000 * delta
		elif (player_position > boulder3.global_position):
			if (xVelocity < 10):
				xVelocity = -50000 * delta
		boulder3.set_linear_velocity(Vector2(xVelocity, (-75000 * delta)))
	
	elif (collider.name == "Boulder4"):
		var xVelocity = boulder4.get_linear_velocity().x
		if (player_position < boulder4.global_position):
			if (xVelocity < 10):
				xVelocity = 50000 * delta
		elif (player_position > boulder4.global_position):
			if (xVelocity < 10):
				xVelocity = -50000 * delta
		boulder4.set_linear_velocity(Vector2(xVelocity, (-75000 * delta)))
	
	elif (collider.name == "Boulder5"):
		var xVelocity = boulder5.get_linear_velocity().x
		if (player_position < boulder5.global_position):
			if (xVelocity < 10):
				xVelocity = 50000 * delta
		elif (player_position > boulder5.global_position):
			if (xVelocity < 10):
				xVelocity = -50000 * delta
		boulder5.set_linear_velocity(Vector2(xVelocity, (-75000 * delta)))


func _on_crumble_timer_timeout() -> void:
	if (crumbling == true):
		crumbling = false
		global_position = startingPosition
		$AnimatedSprite2D.play("boulder")
