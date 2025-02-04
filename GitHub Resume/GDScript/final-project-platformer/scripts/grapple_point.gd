extends CharacterBody2D


const SPEED = 300.0
const JUMP_VELOCITY = -400.0

# Grappling Hook Controls:
	# 1. Hold down right click to slow down time and aim
	# 2. Press left click to shoot
	# 3. While attached to a grapple point, press jump to detach
	# 4. While attached to a grapple point, press left click again to launch player

func _ready() -> void:
	$AnimatedSprite2D.play("flicker")
	
func _physics_process(_delta: float) -> void:
	pass

# Grapple Points
func _on_player_grapple_glow() -> void:
	$Sprite2D.modulate = Color(0, 100, 100, 0.1)

func _on_player_grapple_select() -> void:
	$Sprite2D.modulate = Color(1.5, 1.5, 50, 0.1)

func _on_player_end_glow() -> void:
	$Sprite2D.modulate = Color(1, 1, 1, 0)


# Enemies
func _on_player_enemy_glow() -> void:
	$Sprite2D.modulate = Color(50, 1.5, 1.5, 0.01)

func _on_player_end_enemy_glow() -> void:
	$Sprite2D.modulate = Color(1, 1, 1, 0)
	
