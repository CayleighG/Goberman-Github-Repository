extends "res://land_enemy.gd"

func _ready(): 
	speed = 100
	velocity.x = speed
	_animated_sprite.play("crawl")
