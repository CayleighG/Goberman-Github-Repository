extends Node

signal send_line(line:String)

#Level 1 lines
var level1_line1 = "You are blowing bubbles."
var level1_line2 = "And it’s fun. You’re having fun."
var level1_line3 = "You love the way they grow and grow…"
var level1_line4 = "And suddenly pop into existence…"
var level1_line5 = "The way they take off towards the sky…"
var level1_line6 = "And exist in a state of utter weightlessness…"
var level1_line7 = "Unfettered by the world below."
var level1_line8 = "You follow them out of your room…"
var level1_line9 = "And down the stairs…"
var level1_line10 = "Around and around until you’re dizzy."
var level1_line11 = "You stare up at them and make a vow…"
var level1_line12 = "That you’ll always let your life be this beautiful."

#level 2 lines
var level2_line1 = "You keep blowing bubbles."
var level2_line2 = "They’ve said you should stop…"
var level2_line3 = "Move on to other things…"
var level2_line4 = "Stop holding on to something so simple."
var level2_line5 = "But you can’t."
var level2_line6 = "The way they catch the light and encircle each other…"
var level2_line7 = "It feels like magic."
var level2_line8 = "It reminds you of a time when the world was only as wide as the walls of your bedroom."
var level2_line9 = "And you just can’t let that go."
var level2_line10 = "So you’ll just keep blowing bubbles…"
var level2_line11 = "And they’ll lead you on and on."

#level 3 lines
var level3_line1 = "You are forever blowing bubbles."
var level3_line2 = "You can’t help it."
var level3_line3 = "Life feels simpler when gazing through them…"
var level3_line4 = "When the grays of the world are filled in with a rainbow haze so thick…"
var level3_line5 = "That even the darkness appears in color."
var level3_line6 = "Here, where everything stretches and bends with the wind…"
var level3_line7 = "Sways and sings like a church choir…"
var level3_line8 = "Softens and falls away until…"
var level3_line9 = "It’s much harder to be afraid."
var level3_line10 = "The sharpest of branches…"
var level3_line11 = "And deepest of falls…"
var level3_line12 = "Are simply so far away."
var level3_line13 = "They cannot reach you here."
var level3_line14 = "They cannot reach you here."
var level3_line15 = "They cannot reach you here."
var level3_line16 = "Until…"
var level3_line17 = "*Pop*"

func on_detection(level, line_num):
	if level == 1: #Is it Level 1?
		if line_num == 1: #What line is it for level 1?
			send_line.emit(level1_line1)
		elif line_num == 2:
			send_line.emit(level1_line2)
		elif line_num == 3:
			send_line.emit(level1_line3)
		elif line_num == 4:
			send_line.emit(level1_line4)
		elif line_num == 5:
			send_line.emit(level1_line5)
		elif line_num == 6:
			send_line.emit(level1_line6)
		elif line_num == 7:
			send_line.emit(level1_line7)
		elif line_num == 8:
			send_line.emit(level1_line8)
		elif line_num == 9:
			send_line.emit(level1_line9)
		elif line_num == 10:
			send_line.emit(level1_line10)
		elif line_num == 11:
			send_line.emit(level1_line11)
		elif line_num == 12:
			send_line.emit(level1_line12)
		else:
			print("Error: Invalid line number")
	elif level == 2: #Is it level 2?
		if line_num == 1: #What line is it for Level 2?
			send_line.emit(level2_line1)
		elif line_num == 2:
			send_line.emit(level2_line2)
		elif line_num == 3:
			send_line.emit(level2_line3)
		elif line_num == 4:
			send_line.emit(level2_line4)
		elif line_num == 5:
			send_line.emit(level2_line5)
		elif line_num == 6:
			send_line.emit(level2_line6)
		elif line_num == 7:
			send_line.emit(level2_line7)
		elif line_num == 8:
			send_line.emit(level2_line8)
		elif line_num == 9:
			send_line.emit(level2_line9)
		elif line_num == 10:
			send_line.emit(level2_line10)
		elif line_num == 11:
			send_line.emit(level2_line11)
		else:
			print("Error: Invalid line number")
	elif level == 3: #Is it Level 3?
		if line_num == 1: #What line is it for Lv
			send_line.emit(level3_line1)
		elif line_num == 2:
			send_line.emit(level3_line2)
		elif line_num == 3:
			send_line.emit(level3_line3)
		elif line_num == 4:
			send_line.emit(level3_line4)
		elif line_num == 5:
			send_line.emit(level3_line5)
		elif line_num == 6:
			send_line.emit(level3_line6)
		elif line_num == 7:
			send_line.emit(level3_line7)
		elif line_num == 8:
			send_line.emit(level3_line8)
		elif line_num == 9:
			send_line.emit(level3_line9)
		elif line_num == 10:
			send_line.emit(level3_line10)
		elif line_num == 11:
			send_line.emit(level3_line11)
		elif line_num == 12:
			send_line.emit(level3_line12)
		elif line_num == 13:
			send_line.emit(level3_line13)
		elif line_num == 14:
			send_line.emit(level3_line14)
		elif line_num == 15:
			send_line.emit(level3_line15)
		elif line_num == 16:
			send_line.emit(level3_line16)
		elif line_num == 17:
			send_line.emit(level3_line17)
		else:
			print("Error: Invalid line number")
	else:
		print("Error: no level detected")
