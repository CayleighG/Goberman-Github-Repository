extends CharacterBody2D

@onready var _animated_sprite = $AnimatedSprite2D
var direction = 1
var speed = 50
var stop = false

func _ready(): 
	# Allows us to connect to the player script
	#var playerScript = preload("res://player.tscn")
	velocity.x = speed
	_animated_sprite.play("float")
	
# Called every frame. 'delta' is the elapsed time since the previous frame.
func _physics_process(delta):
	if is_on_wall() or (is_on_floor() and not $FloorDetector.is_colliding()):
		direction = direction * -1
		$AnimatedSprite2D.flip_h = not $AnimatedSprite2D.flip_h
		$FloorDetector.position.x = $CollisionShape2D.shape.get_size().x * direction
	
	if stop == false:
		if not is_on_floor():
			velocity += get_gravity() * delta
		
		if direction == 1:
			velocity.x = speed
		else: 
			velocity.x = -speed
	
	move_and_slide()
	
func enemyDeath():
	$AnimatedSprite2D.stop()
	queue_free()

func playerDeath():
	stop = true
	velocity.x = 0
