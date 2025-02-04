extends Node2D

var canExit = false
var level2 = false
var gameCompleted = false

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	print($Player.global_position)
	Input.set_mouse_mode(Input.MOUSE_MODE_CONFINED)
	
	$EnterKey.hide()
	$GameComplete.hide()
	$Thanks.hide()
	$Credits.hide()
	
	$TutorialWindow1/AnimatedSprite2D.play("basic_grapple")
	$TutorialWindow2/AnimatedSprite2D.play("launch")
	$TutorialWindow3/AnimatedSprite2D.play("aim")
	$TutorialWindow4/AnimatedSprite2D.play("combat")
	$TutorialWindow5/AnimatedSprite2D.play("boulder_launch")
	
	$Player.playerDeath.connect(_on_player_death)
	$Player.canExit.connect(_on_can_exit)
	$Player.restart.connect(_on_restart)	
	
	var grapple_points = get_tree().get_nodes_in_group("grapple_point")
	for n in grapple_points:
		$Player.grappleGlow.connect(n._on_player_grapple_glow)
		$Player.endGlow.connect(n._on_player_end_glow)
	var boulder_grapple_points = get_tree().get_nodes_in_group("boulder_grapple_point")
	for n in boulder_grapple_points:
		$Player.grappleGlow.connect(n._on_player_grapple_glow)
		$Player.endGlow.connect(n._on_player_end_glow)
	var enemy_grapple_points = get_tree().get_nodes_in_group("enemy_grapple_point")
	for n in enemy_grapple_points:
		$Player.enemyGlow.connect(n._on_player_enemy_glow)
		$Player.endEnemyGlow.connect(n._on_player_end_enemy_glow)
	var enemies = get_tree().get_nodes_in_group("enemy")
	for n in enemies:
		$Player.enemy_knockback.connect(n.enemy_knockback)
	var boulders = get_tree().get_nodes_in_group("boulder")
	for n in boulders:
		$Player.setBoulderYVel.connect(n.set_y_vel)


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta: float) -> void:
	if canExit and !gameCompleted:
		$EnterKey.global_position.x = $Player.global_position.x
		$EnterKey.global_position.y = $Player.global_position.y - 50
		$EnterKey.show()
	else: 
		$EnterKey.hide()
	for raycast in $UnstuckRaycasts.get_children():
			if raycast.is_colliding() and raycast.get_collider() != null:
				var collider = raycast.get_collider()
				collider.global_position.y -= 30
				if collider.name == "Player":
					$Player.currentRopeLength = $Player.global_position.distance_to($Player.hookPosition)
	for raycast in $SquishRaycasts.get_children():
			if raycast.is_colliding() and raycast.get_collider() != null:
				var collider = raycast.get_collider()
				if collider.name == "Player":
					if level2:
						$Player.global_position = Vector2(20160, 784)
					else:
						$Player.global_position = Vector2(-160, -744)
					print("Player was squished :(")
					$Player.playerHealth = 0
					$Player.detectPlayerHealth()
					_on_player_death()
	for raycast in $GetBoulderOutOfFloor.get_children():
			if raycast.is_colliding() and raycast.get_collider() != null:
				var collider = raycast.get_collider()
				if collider.is_in_group("boulder"):
					collider.global_position.y -= 30
	
func _on_player_death():
	if level2:
		$Player.global_position = Vector2(20160, 784)
	var enemies = get_tree().get_nodes_in_group("enemy")
	for n in enemies:
		if n.has_method("player_death"):
			n.player_death()
			
func _on_restart():
	if !level2:
		get_tree().reload_current_scene()
	else:
		#$ResetSquishVariableTimer.start()
		$Player/HUD/GameOverLabel.hide()
		$Player/HUD/GameOverButton.hide()
		$Player.invincible = true
		# Need to include this to prevent the "damaged" animation from playing
		$Player.player_attack = true
		$Player/InvincibilityTimer.start()
		$Player/AnimatedSprite2D.play("idle")
		$Player/BackgroundColor.modulate = Color(0,0,0,0)
		$Player.playerHealth = 5
		$Player.playerDead = false
		$Player/HUD/HealthBar.show()
		$Player.detectPlayerHealth()
		
		var enemies = get_tree().get_nodes_in_group("enemy")
		for n in enemies:
			if n.has_method("player_respawn"):
				n.player_respawn()
	
func _on_can_exit(inFrontOfExit):
	if inFrontOfExit:
		canExit = true
		if Input.is_action_just_pressed("exit"):
			if !level2:
				level2 = true
				$Player.global_position = Vector2(20160, 784)
			else:
				$Player.hide()
				$Player.completedGame = true
				gameCompleted = true
				$GameComplete.show()
				$Thanks.show()
				$Credits.show()
	else:
		canExit = false
