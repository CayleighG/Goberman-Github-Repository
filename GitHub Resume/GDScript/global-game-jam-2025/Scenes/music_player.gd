extends AudioStreamPlayer2D

@export var song_number:int
var is_level1:bool = false
var is_level2:bool = false
var is_level3:bool = false

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	if song_number == 1:
		if is_level1 and not playing:
			play()
		elif not is_level1 and playing:
			stop()
	elif song_number == 2:
		if is_level2 and not playing:
			play()
		elif not is_level2 and playing:
			stop()
	elif song_number == 3:
		if is_level3 and not playing:
			play()
		elif not is_level3 and playing:
			stop()
	else:
		print("Error: song_number not assigned or incorrect")


func _on_player_send_current_level(level):
	if level == 1:
		is_level1 = true
		is_level2 = false
		is_level3 = false
	elif level == 2:
		is_level1 = false
		is_level2 = true
		is_level3 = false
	elif level == 3:
		is_level1 = false
		is_level2 = false
		is_level3 = true
	else:
		is_level1 = false
		is_level2 = false
		is_level3 = false
