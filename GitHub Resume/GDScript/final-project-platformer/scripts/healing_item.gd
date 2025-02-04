extends CharacterBody2D


func _ready() -> void:
	$AnimatedSprite2D.play("bob")
	
func delete_item():
	queue_free()
