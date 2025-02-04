extends Node2D


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	$Exit.hide()
	# Turns off collision on the exit once the level begins
	$Exit/CollisionShape2D.set_deferred("disabled", true)
	$Spike1.play("spike")
	$Spike2.play("spike")
	$Spike3.play("spike")
	$Spike4.play("spike")
	$Spike5.play("spike")
	$Spike6.play("spike")
	$Spike7.play("spike")
	$Spike8.play("spike")
	$Spike9.play("spike")


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass

func _on_player_ready_to_leave() -> void:
	$Exit/AnimatedSprite2D.play("spin")
	$Exit.show()
	# Turns collision back on for the exit
	$Exit/CollisionShape2D.set_deferred("disabled", false)


func _on_player_change_scene() -> void:
	$Player/HUD/Message.text = "Thank you for playing the demo!"
