extends Area2D

#Using the keyword "export" allows us to set the value in the Inspector
#This is handy for values that you want to be able to adjust just like a node's built-in properties
@export var speed = 400 #How fast the player will move (pixels/sec)
var screen_size #Size of the game window
# Defines custom signal that player will emit when it collides with an enemy
signal hit

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	screen_size = get_viewport_rect().size
	# Player hidden when game starts
	hide()


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	var velocity = Vector2.ZERO #The player's movement vector
	if Input.is_action_pressed("move_right"):
		velocity.x += 1
	if Input.is_action_pressed("move_left"):
		velocity.x -= 1
	if Input.is_action_pressed("move_down"):
		velocity.y += 1
	if Input.is_action_pressed("move_up"):
		velocity.y -= 1
	
	if velocity.length() > 0:
		velocity = velocity.normalized() * speed
		# $ is shorthand for "get.node()"
		# So $AnimatedSprite2D.play() is the same as get_node("AnimatedSprite2D").play()
		$AnimatedSprite2D.play()
	else:
		$AnimatedSprite2D.stop()
	
	# "delta" parameter refers to frame length
	position += velocity * delta
	# "clamp" restricts a value to a certain range.
	# Here, we are restricting it to the screen size, so the player cannot leave the screen
	position = position.clamp(Vector2.ZERO, screen_size)

	# Flips animations when needed
	if velocity.x != 0:
		$AnimatedSprite2D.animation = "walk"
		$AnimatedSprite2D.flip_v = false
		$AnimatedSprite2D.flip_h = velocity.x < 0
	elif velocity.y != 0:
		$AnimatedSprite2D.animation = "up"
		$AnimatedSprite2D.flip_v = velocity.y > 0

func _on_body_entered(body):
	hide() # Player dissappears after being hit
	hit.emit()
	# Must be deferred as we can't change physics properties
	$CollisionShape2D.set_deferred("disabled", true)
	
# Resets player when starting a new game
func start(pos):
	position = pos
	show()
	$CollisionShape2D.disabled = false

# NOTE: It is very important to click the icon next to the lock button.
# This locks the children to the parent node and prevents them from moving independently from each other.
# For example, this prevents the collision bubble from being accidentally dragged away from the player sprite.
