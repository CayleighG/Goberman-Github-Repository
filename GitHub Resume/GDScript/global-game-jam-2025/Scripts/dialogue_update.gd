extends RichTextLabel

signal make_visible()

func _on_send_line(line):
	make_visible.emit()
	text = "[center]"+line+"[/center]"
