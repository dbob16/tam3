import random as r

how_many = input("Enter how many numbers you want to generate: ")
try:
    how_many = int(how_many)
except:
    print("Enter an integer next time.")
    quit(1)

ticket_range = input("Enter the start and end numbers of the random range you want to use, separated by a hyphen: ")

ticket_range = ticket_range.split("-")
try:
    ticket_range = [int(i) for i in ticket_range]
except:
    print("Invalid range entered. Needs to be something like \"1-20\"")
    quit(1)

for i in range(0, how_many):
    print(r.randint(ticket_range[0], ticket_range[1]))