'''
Author: Cayleigh Goberman
Goal: To create a virtual phonebook that stores names and contact numbers in a CSV file.
Input: Name and phone number
Output: List of names and phone numbers contained in the CSV file
Other Requirements: Must be able to add, print, edit, search for, and remove names and numbers using buttons from the display window
'''
import tkinter as tk
import csv
window = tk.Tk()
window.title('Contact Management')
window.geometry('1000x500')
window.configure(bg = 'blue')

def addition():
    name = entName.get()
    phone = entPhone.get()
    textContact.insert(tk.END,name + ': ' + phone + '\n')

    with open('information.csv','a',newline = '') as file:
        csvWriter = csv.writer(file)
        csvWriter.writerow([name,phone])

def Print():
    textContact.delete(1.0,tk.END)
    with open('information.csv','r') as file:
        csvReader = csv.reader(file)
        for member in csvReader:
            textContact.insert(tk.END,member[0] + ': ' + member[1] + '\n')

def search():
    name = entName.get()
    phone = entPhone.get()
    
    textContact.delete(1.0,tk.END)
    with open('information.csv','r') as file:
        csvReader = csv.reader(file)
        for member in csvReader:
            if (member[0] != name and member[1] != phone):
                continue
            else:
                textContact.insert(tk.END,member[0] + ': ' + member[1] + '\n')

def edit():
    rows = []
    name = entName.get()
    phone = entPhone.get()
    textContact.delete(1.0,tk.END)
    
    with open('information.csv','r') as file:
        csvReader = csv.reader(file)
        for member in csvReader:
            if (member[0] == name):
                member[1] = phone
            rows.append(member)
            textContact.insert(tk.END,member[0] + ': ' + member[1] + '\n')

    with open('information.csv','w',newline = '') as file:
        csvWriter = csv.writer(file)
        csvWriter.writerows(rows)

def remove():
    rows2 = []
    name = entName.get()
    phone = entPhone.get()
    textContact.delete(1.0,tk.END)
    
    with open('information.csv','r') as file:
        csvReader = csv.reader(file)
        for member in csvReader:
            if(member[0] == name and member[1] == phone):
                continue
            rows2.append(member)
            textContact.insert(tk.END,member[0] + ': ' + member[1] + '\n')

    with open('information.csv','w',newline = '') as file:
        csvWriter = csv.writer(file)
        #for member in rows2:
        csvWriter.writerows(rows2)

        
#Framework
frmLeft = tk.Frame(window, bg = 'blue', width = 900, height = 500)
frmRight = tk.Frame(window, bg = 'blue', width = 100, height = 500)

frmLeft.grid(row = 0, column = 0)
frmRight.grid(row = 0, column = 1)

#Labels
labelName = tk.Label(frmLeft,text = 'Name',bg = 'blue', padx = 20)
labelName.grid(row = 0, column = 0)

entName = tk.Entry(frmLeft, bg = 'orange')
entName.grid(row = 1, column = 0)

labelPhone = tk.Label(frmLeft, text = 'Phone Number', bg = 'blue', padx = 20)
labelPhone.grid(row = 0, column = 2)

entPhone = tk.Entry(frmLeft, bg = 'orange')
entPhone.grid(row = 1, column = 2)

labelContact = tk.Label(frmLeft, text = 'List of Contacts', bg = 'blue', pady = 20)
labelContact.grid(row = 2, column = 1)

textContact = tk.Text(frmLeft, bg = 'orange')
textContact.grid(row = 3, column = 1)

#Add, Edit, Remove, Search, Print
btnAdd = tk.Button(frmRight, text = 'Add', bg = 'green', width = 10, padx = 20, command = addition)
btnAdd.grid(row = 1, column = 3)

btnEdit = tk.Button(frmRight, text = 'Edit', bg = 'green', width = 10, padx = 20, command = edit)
btnEdit.grid(row = 2, column = 3)

btnRemove = tk.Button(frmRight, text = 'Remove', bg = 'green', width = 10, padx = 20, command = remove)
btnRemove.grid(row = 3, column = 3)

btnSearch = tk.Button(frmRight, text = 'Search', bg = 'green', width = 10, padx = 20, command = search)
btnSearch.grid(row = 4, column = 3)

btnPrint = tk.Button(frmRight, text = 'Print', bg = 'green', width = 10, padx = 20, command = Print)
btnPrint.grid(row = 5, column = 3)

window.mainloop()

