extends Label

var score = 0

func _on_mob_squashed():
	score += 1
	text = "Score: %s" % score
	
func _on_power_up_collected():
	score += 5
	text = "Score: %s" % score
