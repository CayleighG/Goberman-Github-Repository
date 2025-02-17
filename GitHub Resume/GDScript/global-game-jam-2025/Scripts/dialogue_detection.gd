extends Area2D

@export var level_num:int
@export var dialogue_num:int

signal on_detection(level:int, line_num:int)
signal make_hidden()
signal disable()
signal enable()

func _on_body_entered(body):
	on_detection.emit(level_num,dialogue_num)


func _on_body_exited(body):
	make_hidden.emit()

func _ready():
	if level_num == 3 and dialogue_num == 17:
		disable.emit()


func _on_player_show_final_dialogue():
	enable.emit()
