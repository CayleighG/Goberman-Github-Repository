'''
Author: Cayleigh Goberman
Goal: Create two (originally empty) dictionaries which keep track of players and their best records
Input: Player name and his/her best record
Output: Name and record of all current players, names of players with a record larger than 35, number of items in the dictionaries
Other Requirements: Remove all players with a record less than 33, be able to exit the dictionaries
'''    

def playerDict():
  players = {}
  bestRecord = {}

  num = 0
  delete = False
  while True:
    num = num + 1
    newPlayer = input("Please enter the name of the new player: ")
    newRecord = float(input("Please enter the best record of the new player: "))

    players[newPlayer] = num
    bestRecord[newPlayer] = newRecord

    print('\n{:8} {:9}'.format('Name:','Best Record:'))
        
    for x in players:
      if (bestRecord[x] < 33):
        bestRecord.pop(x)
        delete = True
      else:
        print('{:8} {:3f}'.format(x,bestRecord[x]))
        
    if (delete == True):
      players.pop(x)
      delete = False
      
    print('\n{:8}'.format('Players With a Record Greater Than 35: '))
    for x in bestRecord:
      if (bestRecord[x] > 35):
        print (x)

    playersLength = int(len(players))
    recordsLength = int(len(bestRecord))
    total = playersLength + recordsLength
    
    print(f"\nNumber of Items in the Dictionaries: \nDictionary 1 (players): {playersLength}\nDictionary 2 (bestRecord): {recordsLength}\nTotal: {total}")

    exit = input("\nWould you like to enter another player? (Y/N): ")
      
    if (exit == "No" or exit == "no" or exit == "N" or exit == "n"):
      print("Alright! Just type 'playerDict()' if you want to make another list of players!")
      break
        

playerDict() 
