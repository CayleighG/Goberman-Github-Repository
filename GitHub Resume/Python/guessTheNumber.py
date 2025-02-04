'''
Author: Cayleigh Goberman
Goal: Generate a random number and have the user attempt to guess the number.
Input: Upper boundary, lower boundary, and guessed number
Output: Indicate if the number if too high, too low, correct, or outside of the specified boundaries
Other Requirements: Either repeat or end the game depending on what the user indicates
'''
print("\n\t************************\n\tName: Cayleigh Goberman\n\tEmail: Cayleigh.Goberman1@marist.edu\n\t************************\n")

def guessTheNum():
  import random
  import math
  lowerBoundary = int(input("Please provide a lower boundary: "))
  upperBoundary = int(input("Please provide an upper boundary: "))
  num = int(random.randint(lowerBoundary,upperBoundary))

  while True:
      guess = int(input("Guess what number I am thinking of: "))
      if (guess < lowerBoundary or guess > upperBoundary):
          print("That number is not in the specified range.")
      elif (guess < num):
          print("Sorry! Your guess is too low!")
      elif (guess > num):
          print("Sorry! Your guess is too high!")
      else:
          print("Congratulations! You win!\nThanks for playing!")
          break

  finish = input("Would you like to continue(Y/N/Finish)? ")

  if (finish == "Y" or finish == "y" or finish == "Yes" or finish == "yes"):
    guessTheNum()
  elif (finish == "n" or finish == "N" or finish == "No" or finish == "no" or finish == "Finish" or finish == "finish"):
    print("Okay! Feel free to play again in the future!")
  else:
    print("I am sorry, I do not understand. Type 'guessTheNum()' to play again!")

guessTheNum()
        
