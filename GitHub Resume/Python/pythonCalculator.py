'''
Author: Cayleigh Goberman
Goal: Varying computations depending on the inputted numerical values (specifically, addition, subtraction, multiplication, division, powers, and square root)
Input: Two numerical values and a desired mathematical operation
Output: Echo the inputted values and final calculation
Formulas: num1 + num2, num1 - num2, num1 * num2, num1 / num2, num1 ^ num2, square root of num1
Other Requirements: Inputted numbers must be real numbers in order to create a final calculation
'''

import math
print("\n\t*****************\n\tPython Calculator\n\t*****************")

def calculator():
  
  def restart ():
    restartQuestion = input("Would you like to make another calculation? (Yes/No): ")
    if restartQuestion == "Yes" or restartQuestion == "yes":
      print("\n\t************************")
      calculator()
    elif restartQuestion == "No" or restartQuestion == "no":
      print("Alright. Feel free to utilize this calculator again!")
    else:
      print("I am sorry, but I do not recognize your answer. Please answer yes or no.")
      restart()
      
  try:
    num1 = float(input("Please provide your first number: "))
    mathOper = input("Please indicate your mathematical operation (+, -, *, /, ^, square root): ")
    num2 = float(input("Please provide your second number (if using square root, please just input 0): "))
      
    match(mathOper):
      case "+": 
        print(f"{num1} {mathOper} {num2} = {num1 + num2}")
        restart ()
    
      case "-":
        print(f"{num1} {mathOper} {num2} = {num1 - num2}")
        restart ()
    
      case "*":
        print(f"{num1} {mathOper} {num2} = {num1 * num2}")
        restart ()
    
      case "/":
        print(f"{num1} {mathOper} {num2} = {num1 / num2}")
        restart ()
    
      case "^":
        print(f"{num1} {mathOper} {num2} = {num1 ** num2}")
        restart ()
        
      case "square root":
        print(f"The {mathOper} of {num1} equals {math.sqrt(num1)}")
        restart()

      case _:
        print("I am sorry, but you have not input a valid mathematical operation.")
        restart ()

  except:
    try:
      num1 = complex(num1)
      num2 = complex(num2)
      print("I am sorry, but that is not a valid input.")
      restart ()
    except:
      print("I am sorry, but that is not a valid input.")
      restart ()

calculator()
