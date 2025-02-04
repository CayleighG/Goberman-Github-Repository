extends Node2D

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	$Exit.hide()
	# Turns off collision on the exit once the game begins
	$Exit/CollisionShape2D.set_deferred("disabled", true)

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass

func _on_player_ready_to_leave() -> void:
	$Exit/AnimatedSprite2D.play("spin")
	$Exit.show()
	# Turns collision back on for the exit
	$Exit/CollisionShape2D.set_deferred("disabled", false)


func _on_player_change_scene() -> void:
	get_tree().change_scene_to_file("res://level_2.tscn")
