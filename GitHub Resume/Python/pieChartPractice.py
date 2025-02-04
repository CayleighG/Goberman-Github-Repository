'''
Author: Cayleigh Goberman
Goal: Create a pie chart that details the five components of happiness
'''
print("\n\t************************\n\tName: Cayleigh Goberman\n\tEmail: Cayleigh.Goberman1@marist.edu\n\tGraph Title: The Five Components of Happiness\n\t************************\n")

import numpy as np
import matplotlib.pyplot as plt

x = ['Positive Emotions','Engagement','Relationships','Meaning','Achievement']
y = [20,20,20,20,20]
fig,ax = plt.subplots()
ax.set_title('The Five Components of Happiness')
ax.pie(y,labels=x,autopct = '%.0f%%')
plt.savefig("IAmHappy.pdf")
plt.show()
