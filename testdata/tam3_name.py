from sys import argv
from names import get_full_name
import random as r

def gen_phone_number():
    def d0():
        return r.randint(0, 1)
    def d():
        return r.randint(0, 9)
    return f"{d0()}{d()}{d()}-{d()}{d()}{d()}-{d()}{d()}{d()}{d()}"

class Person:
    def __init__(self):
        self.name = get_full_name()
        self.phone_number = gen_phone_number()
        self.preference = r.choice(("TEXT", "TEXT", "TEXT", "CALL"))
    def __repr__(self):
        return f"{self.name} {self.phone_number} {self.preference}"
    
how_many = input("Insert how many random people to generate: ")
try:
    how_many = int(how_many)
except:
    print("Try entering an integer next time.")

for i in range(0, int(how_many)):
    print(Person())