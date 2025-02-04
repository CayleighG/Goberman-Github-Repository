'''
Name: Cayleigh Goberman
Goal: Allow the user to modify a spreadsheet that lists people who can access the software
Input: First and Last Name, Add, Remove, or Exit
Output: Add or Remove a name, or exit the application
'''
print("\n\t************************\n\tName: Cayleigh Goberman\n\tEmail: Cayleigh.Goberman1@marist.edu\n\t************************\n")

import tkinter as tk
import csv
window = tk.Tk()
window.title('Users in my Software')
window.geometry('1000x500')
window.configure(bg = 'lightblue')

def addition():
    name1 = entFirstName.get()
    name2 = entLastName.get()
    textList.insert(tk.END,name1 + ' ' + name2 + '\n')

    with open('users.csv','a',newline = '') as file:
        csvWriter = csv.writer(file)
        csvWriter.writerow([name1,name2])

def remove():
    rows = []
    name1 = entFirstName.get()
    name2 = entLastName.get()
    textList.delete(1.0,tk.END)
    
    with open('users.csv','r') as file:
        csvReader = csv.reader(file)
        for member in csvReader:
            if(member[0] == name1 and member[1] == name2):
                continue
            rows.append(member)
            textList.insert(tk.END,member[0] + ' ' + member[1] + '\n')

    with open('users.csv','w',newline = '') as file:
        csvWriter = csv.writer(file)
        #for member in rows2:
        csvWriter.writerows(rows)

def exit():
    window.destroy()

    
#Framework
frmLeft = tk.Frame(window, bg = 'lightblue', width = 500, height = 500)
frmRight = tk.Frame(window, bg = 'lightblue', width = 500, height = 500)

frmLeft.grid(row = 0, column = 0)
frmRight.grid(row = 0, column = 1)

#Labels
title = tk.Label(frmRight,text = 'The List of Users in My Software',bg = 'lightblue', padx = 20)
title.grid(row = 0, column = 0)

firstName = tk.Label(frmLeft,text = 'First Name',bg = 'lightblue', padx = 20)
firstName.grid(row = 1, column = 0)

entFirstName = tk.Entry(frmLeft, bg = 'orange')
entFirstName.grid(row = 1, column = 2)

lastName = tk.Label(frmLeft, text = 'Last Name', bg = 'lightblue', padx = 20)
lastName.grid(row = 2, column = 0)

entLastName = tk.Entry(frmLeft, bg = 'orange')
entLastName.grid(row = 2, column = 2)

listOfPeople = tk.Label(frmRight, text = 'The List of People', bg = 'lightblue', pady = 20)
listOfPeople.grid(row = 2, column = 0)

textList = tk.Text(frmRight, bg = 'orange')
textList.grid(row = 3, column = 0)

#Add, Edit, Remove, Search, Print

btnAdd = tk.Button(frmLeft, text = 'Add', bg = 'green', width = 10, padx = 20, command = addition)
btnAdd.grid(row = 1, column = 3)

btnRemove = tk.Button(frmLeft, text = 'Remove', bg = 'green', width = 10, padx = 20, command = remove)
btnRemove.grid(row = 2, column = 3)

btnExit = tk.Button(frmLeft, text = 'Exit', bg = 'green', width = 10, padx = 20, command = exit)
btnExit.grid(row = 3, column = 3)

window.mainloop()
