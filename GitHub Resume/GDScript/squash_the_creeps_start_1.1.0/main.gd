extends Node

# Allows us to assign monsters from mob.tscn
@export var mob_scene: PackedScene
@export var power_up_scene: PackedScene

func _ready():
	$UserInterface/Retry.hide()

func _on_mob_timer_timeout():
	# Create a new instance of the Mob scene
	var mob = mob_scene.instantiate()
	
	# Choose a random location on the SpawnPath
	# We store the reference to the SpawnLocation node
	var mob_spawn_location = get_node("SpawnPath/SpawnLocation")
	# And give it a random offset
	mob_spawn_location.progress_ratio = randf()
	
	var player_position = $Player.position
	mob.initialize(mob_spawn_location.position, player_position)
	
	# Spawn the mob by adding it to the Main scene
	add_child(mob)
	
	# We connect the mob to the score label to update the score upon squashing one
	mob.squashed.connect($UserInterface/ScoreLabel._on_mob_squashed.bind())

func _on_player_hit():
	$MobTimer.stop()
	$PowerUpTimer.stop()
	$UserInterface/Retry.show()
	
func _unhandled_input(event):
	if event.is_action_pressed("ui_accept") and $UserInterface/Retry.visible:
		# This restarts the current scene
		get_tree().reload_current_scene()


func _on_power_up_timer_timeout():
	# Create a new instance of the power_up scene.
	var power_up = power_up_scene.instantiate()

	# Choose a random location on the SpawnPath.
	# We store the reference to the SpawnLocation node.
	var power_up_spawn_location = get_node("SpawnPath/SpawnLocation")
	# And give it a random offset.
	power_up_spawn_location.progress_ratio = randf()

	var player_position = $Player.position
	power_up.initialize(power_up_spawn_location.position, player_position)

	# Spawn the power_up by adding it to the Main scene.
	add_child(power_up)
	
	power_up.collected.connect($UserInterface/ScoreLabel._on_power_up_collected.bind())


func _on_player_power_up_hit():
	pass
