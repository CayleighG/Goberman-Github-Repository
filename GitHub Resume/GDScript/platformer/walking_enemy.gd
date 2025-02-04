extends "res://land_enemy.gd"

func _ready(): 
	velocity.x = speed
	_animated_sprite.play("walk")
