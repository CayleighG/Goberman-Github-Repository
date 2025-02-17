extends Control


# Called when the node enters the scene tree for the first time.
func _ready():
	hide()


func _on_dialogue_make_visible():
	show()


func _on_make_hidden():
	hide()
