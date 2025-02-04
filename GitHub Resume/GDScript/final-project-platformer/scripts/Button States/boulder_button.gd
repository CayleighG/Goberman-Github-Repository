extends CharacterBody2D

var _button_channel: ButtonChannel = ButtonChannel.get_instance()
@export var _button_states: ButtonStates = ButtonStates.new()

var yPos

var detector1
var detector2
var detector3
var detector4
var detector5
var detector6

func _ready():
	detector1 = get_node("/root/World/BoulderButton1/BoulderDetector")
	detector2 = get_node("/root/World/BoulderButton2/BoulderDetector")
	detector3 = get_node("/root/World/BoulderButton3/BoulderDetector")
	detector4 = get_node("/root/World/BoulderButton4/BoulderDetector")
	detector5 = get_node("/root/World/BoulderButton5/BoulderDetector")
	detector6 = get_node("/root/World/BoulderButton6/BoulderDetector")
	
	yPos = global_position.y
	_button_states.ready()

func _physics_process(_delta: float) -> void:
	if ($CollisionPolygon2D.global_position.y < yPos) or ($CollisionPolygon2D.global_position.y > (yPos + 10)):
			$CollisionPolygon2D.global_position.y = yPos
	if $BoulderDetector.is_colliding():
		var collider = $BoulderDetector.get_collider()
		if collider.is_in_group("boulder"):
			if self.name == "BoulderButton1": 
				$/root/World/BoulderButton1/AnimatedSprite2D.play("active")
				
			if self.name == "BoulderButton2":
				$/root/World/BoulderButton2/AnimatedSprite2D.play("active")
				
			if self.name == "BoulderButton3":
				$/root/World/BoulderButton3/AnimatedSprite2D.play("active")
				
			if self.name == "BoulderButton4":
				$/root/World/BoulderButton4/AnimatedSprite2D.play("active")
				
			if self.name == "BoulderButton5":
				$/root/World/BoulderButton5/AnimatedSprite2D.play("active")
				
			if self.name == "BoulderButton6":
				$/root/World/BoulderButton6/AnimatedSprite2D.play("active")
			
			$DetectCollisionTimer.start()
			_button_channel.button_pressed.emit($AnimatedSprite2D, $CollisionPolygon2D, self, yPos)
	
	if !detector1.is_colliding():
		$/root/World/BoulderButton1/AnimatedSprite2D.play("inactive")
		
	if !detector2.is_colliding():
		$/root/World/BoulderButton2/AnimatedSprite2D.play("inactive")
		
	if !detector3.is_colliding():
		$/root/World/BoulderButton3/AnimatedSprite2D.play("inactive")
		
	if !detector4.is_colliding():
		$/root/World/BoulderButton4/AnimatedSprite2D.play("inactive")
		
	if !detector5.is_colliding():
		$/root/World/BoulderButton5/AnimatedSprite2D.play("inactive")
		
	if !detector6.is_colliding():
		$/root/World/BoulderButton6/AnimatedSprite2D.play("inactive")

# Forcing it to wait before it sends a signal to "unpress" the button
# Otherwise it constantly oscillates between "pressed" and "unpressed"
# Due to the fact that the boulder falls a bit when the collision shape moves, thus sending more signals
func _on_detect_collision_timer_timeout() -> void:
	if !$BoulderDetector.is_colliding():
		_button_channel.button_unpressed.emit($AnimatedSprite2D, $CollisionPolygon2D, self, yPos)
