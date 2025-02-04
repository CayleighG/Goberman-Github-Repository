# Channel Pattern
class_name ButtonChannel
extends Object

signal button_unpressed(animated_sprite:AnimatedSprite2D, collision_shape:CollisionPolygon2D, button:Node, yPos:int)
signal button_pressed(animated_sprite:AnimatedSprite2D, collision_shape:CollisionPolygon2D, button:Node, yPos:int)

# Calling this constructor more than once is an error.
func _init():
	assert(_instance == null)


## Returns the one unique [member _instance] of this channel, instantating it the first time.
static func get_instance() -> ButtonChannel:
	if not _instance:
		_instance = ButtonChannel.new()
	return _instance


## The single globally-acessible instance of this channel.
static var _instance: ButtonChannel = null
