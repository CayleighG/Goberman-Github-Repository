'''
Author: Cayleigh Goberman
Goal: Utilize the turtle drawing function to produce various specified shapes
Additional Information: Output varies depending on the final function run. Currently, it creates a Christmas Tree.
'''

import turtle

def square():
    t = turtle.Turtle()
    
    t.penup()
    t.left(90)
    t.forward(50)
    t.right(90)
    t.pendown()
    
    for i in range (4):
        t.pencolor("blue")
        t.forward(50)
        t.left(90)

def star():
    star = turtle.Turtle()
    
    star.penup()
    star.left(180)
    star.forward(25)
    star.left(180)
    star.pendown()
    
    for i in range (5):
        star.pencolor("yellow")
        star.forward(100)
        star.left(216)

#t.penup() --> Not actually drawing
#t.dot() --> Draws a dot

def dotGrid():
    dots = turtle.Turtle()
    
    dots.penup()
    dots.right(90)
    dots.forward(75)
    dots.right(90)
    dots.forward(25)
    dots.left(180)
    dots.pendown()
    
    dots.pencolor("green")
    dot_distance = 25
    width = 5
    height = 7
    dots.penup()

    for y in range(height):
        for i in range (width):
            dots.dot()
            dots.penup()
            dots.forward(dot_distance)
            
        dots.backward(dot_distance * width)
        dots.right(90)
        dots.forward(dot_distance)
        dots.left(90)
        dots.pendown()
        
    #turtle.done()#Exit


def christmasTree():
    navidad = turtle.Turtle()
    navidad.pencolor("green")
    #Left of Tree
    for i in range(2):
        navidad.left(45)
        navidad.forward(100)
        navidad.left(135)
        navidad.forward(50)
        navidad.left(180)
        
    navidad.left(45)
    navidad.forward(100)

    #Right of Tree
    navidad.right(90)

    for i in range(3):
        navidad.forward(100)
        navidad.right(135)
        navidad.forward(50)
        navidad.left(135)

    navidad.right(135)
    navidad.forward(174)

    #Trunk
    navidad.right(180)
    navidad.forward(87)

    navidad.pencolor("brown")
    navidad.right(90)
    navidad.forward(50)
    navidad.left(90)
    navidad.forward(50)
    navidad.left(90)
    navidad.forward(50)


    navidad.penup()
    navidad.forward(250)

    #Star
    navidad.left(90)
    navidad.forward(75)
    navidad.left(180)
    navidad.pendown()

    for i in range (5):
        navidad.pencolor("gold")
        navidad.forward(100)
        navidad.left(216)

    #Perching on the Star (Mostly Aesthetic) 
    navidad.penup()
    navidad.forward(40)
    navidad.left(75)
    navidad.forward(38)
    navidad.right(165)

christmasTree()
'''
square()
star()
dotGrid()
'''

            
