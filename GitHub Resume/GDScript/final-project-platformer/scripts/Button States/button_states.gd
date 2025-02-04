# State Pattern
class_name ButtonStates
extends Resource

## The various states that a button can be in
enum State {
	## Button is pressed
	PRESSED,
	## Button is not pressed
	UNPRESSED
}

## Property indicating the current state of the button.
## Note that the setter also emits corresponding signals for each status change.
var state: State = State.PRESSED:
	set(new_state):
		if (state == new_state):
			return
		state = new_state
		match state:
			State.PRESSED:
				#_button_channel.button_is_pressed.emit(self)
				_button_channel.button_pressed.disconnect(_press)
				_button_channel.button_unpressed.connect(_unpress)
			State.UNPRESSED:
				#_button_channel.button_not_pressed.emit(self)
				_button_channel.button_unpressed.disconnect(_unpress)
				_button_channel.button_pressed.connect(_press)

## States subscribe to event notifications from the button channel
var _button_channel: ButtonChannel = ButtonChannel.get_instance()


func ready():
	state = State.UNPRESSED


## Press the button
func _press(animated_sprite:AnimatedSprite2D, collision_shape:CollisionPolygon2D, _button:Node, yPos):
	animated_sprite.play("active")
	if ((collision_shape.global_position.y + 10) > (yPos + 10)):
		collision_shape.global_position.y = yPos
	else:
		collision_shape.global_position.y += 10
	state = State.PRESSED

## Unpress the button
func _unpress(animated_sprite:AnimatedSprite2D, collision_shape:CollisionPolygon2D, _button:Node, yPos):
	animated_sprite.play("inactive")
	if ((collision_shape.global_position.y - 10) < (yPos - 10)):
		collision_shape.global_position.y = yPos
	else:
		collision_shape.global_position.y -= 10
	state = State.UNPRESSED
