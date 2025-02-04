extends CharacterBody2D

var _button_channel: ButtonChannel = ButtonChannel.get_instance()

var door1ClosedPosition
var door1OpenPosition
var door2ClosedPosition
var door2OpenPosition
var door3ClosedPosition
var door3OpenPosition
var door4ClosedPosition
var door4OpenPosition
var door5ClosedPosition
var door5OpenPosition
var door6ClosedPosition
var door6OpenPosition

var openingDoor1 = false
var openingDoor2 = false
var openingDoor3 = false
var openingDoor4 = false
var openingDoor5 = false
var openingDoor6 = false
var startingPosition

var door1
var door2
var door3
var door4
var door5
var door6

func _ready():
	$AnimatedSprite2D.play("closed")
	startingPosition = global_position
	_button_channel.button_unpressed.connect(_unpressed)
	_button_channel.button_pressed.connect(_pressed)
	
	door1 = get_node("/root/World/Door1")
	door2 = get_node("/root/World/Door2")
	door3 = get_node("/root/World/Door3")
	door4 = get_node("/root/World/Door4")
	door5 = get_node("/root/World/Door5")
	door6 = get_node("/root/World/Door6")
		
	
	door1ClosedPosition = door1.global_position.y
	door1OpenPosition = door1.global_position.y - 120
	
	door2ClosedPosition = door2.global_position.y
	door2OpenPosition = door2.global_position.y - 120
	
	door3ClosedPosition = door3.global_position.y
	door3OpenPosition = door3.global_position.y - 120
	
	door4ClosedPosition = door4.global_position.y
	door4OpenPosition = door4.global_position.y - 120
	
	door5ClosedPosition = door5.global_position.y
	door5OpenPosition = door5.global_position.y - 120
	
	door6ClosedPosition = door6.global_position.y
	door6OpenPosition = door6.global_position.y - 120

func _physics_process(delta: float) -> void:
	if $StuckInDoor1.is_colliding():
		var collider = $StuckInDoor1.get_collider()
		if collider.is_in_group("boulder"):
			collider.global_position.x += 50
	if $StuckInDoor2.is_colliding():
		var collider = $StuckInDoor2.get_collider()
		if collider.is_in_group("boulder"):
			collider.global_position.x -= 50
	
	if openingDoor1:
		door1.global_position.y = move_toward(door1.global_position.y, door1OpenPosition, delta * 50)
	else:
		door1.global_position.y = move_toward(door1.global_position.y, door1ClosedPosition, delta * 50)
		
	if openingDoor2:
		door2.global_position.y = move_toward(door2.global_position.y, door2OpenPosition, delta * 50)
	else:
		door2.global_position.y = move_toward(door2.global_position.y, door2ClosedPosition, delta * 50)
		
	if openingDoor3:
		door3.global_position.y = move_toward(door3.global_position.y, door3OpenPosition, delta * 50)
	else:
		door3.global_position.y = move_toward(door3.global_position.y, door3ClosedPosition, delta * 50)
		
	if openingDoor4:
		door4.global_position.y = move_toward(door4.global_position.y, door4OpenPosition, delta * 50)
	else:
		door4.global_position.y = move_toward(door4.global_position.y, door4ClosedPosition, delta * 50)
		
	if openingDoor5:
		door5.global_position.y = move_toward(door5.global_position.y, door5OpenPosition, delta * 50)
	else:
		door5.global_position.y = move_toward(door5.global_position.y, door5ClosedPosition, delta * 50)
		
	if openingDoor6:
		door6.global_position.y = move_toward(door6.global_position.y, door6OpenPosition, delta * 50)
	else:
		door6.global_position.y = move_toward(door6.global_position.y, door6ClosedPosition, delta * 50)
	
	
# animated_sprite, collision_shape, and yPos are from BoulderButton
# Need to pass these arguments to the _pressed() and _unpressed() functions in button_states
# So, since we're listening for the same signal, we're declaring them here even though we won't use them here
func _pressed(_animated_sprite, _collision_shape, button, _yPos):
	if button.name == "BoulderButton1": 
		openingDoor1 = true
		$/root/World/Door1/AnimatedSprite2D.play("open")
	elif button.name == "BoulderButton2":
		openingDoor2 = true
		$/root/World/Door2/AnimatedSprite2D.play("open")
	elif button.name == "BoulderButton3":
		openingDoor3 = true
		$/root/World/Door3/AnimatedSprite2D.play("open")
	elif button.name == "BoulderButton4":
		openingDoor4 = true
		$/root/World/Door4/AnimatedSprite2D.play("open")
	elif button.name == "BoulderButton5":
		openingDoor5 = true
		$/root/World/Door5/AnimatedSprite2D.play("open")
	elif button.name == "BoulderButton6":
		openingDoor6 = true
		$/root/World/Door6/AnimatedSprite2D.play("open")

func _unpressed(_animated_sprite, _collision_shape, button, _yPos):
	if button.name == "BoulderButton1": 
		openingDoor1 = false
		$/root/World/Door1/AnimatedSprite2D.play("closed")
	elif button.name == "BoulderButton2":
		openingDoor2 = false
		$/root/World/Door2/AnimatedSprite2D.play("closed")
	elif button.name == "BoulderButton3":
		openingDoor3 = false
		$/root/World/Door3/AnimatedSprite2D.play("closed")
	elif button.name == "BoulderButton4":
		openingDoor4 = false
		$/root/World/Door4/AnimatedSprite2D.play("closed")
	elif button.name == "BoulderButton5":
		openingDoor5 = false
		$/root/World/Door5/AnimatedSprite2D.play("closed")
	elif button.name == "BoulderButton6":
		openingDoor6 = false
		$/root/World/Door6/AnimatedSprite2D.play("closed")
