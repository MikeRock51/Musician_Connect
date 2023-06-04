#!/usr/bin/python3

import random
import string
from os import getenv
from models.user import User
from models.review import Review
from models.city import City
from models.state import State
from models.booking import Booking
from models.instrument import Instrument
from models.base_model import Base, BaseModel
from models import storage

user = getenv('MCC_SQL_USER')
host = getenv('MCC_SQL_HOST')
pwd = getenv('MCC_SQL_PWD')
db = getenv('MCC_SQL_DB')


# List of random first names and last names
first_names = [
    "John", "Jane", "David", "Linda", "Michael", "Ade", "Chidi", "Amina",
    "Emeka", "Fatima", "Kodili", "Steven", "Zikiwe", "Nnamdi", "Jane",
    "Mercy", "Eniola", "Angela", "Oliver", "Grace", "Daniel", "Blessing",
    "Peter", "Sandra", "Joseph", "Chioma", "Charles", "Faith", "Samuel",
    "Halima", "Andrew", "Abigail", "Emmanuel", "Rebecca", "Joshua",
    "Ebere", "Victor", "Ifunanya", "Benjamin", "Jennifer", "Patrick",
    "Nkechi", "Timothy", "Aisha", "Collins", "Mojisola", "Isaac", "Ijeoma",
    "Raymond", "Ruth", "Stanley", "Loveth", "Emmanuel"
]

last_names = [
    "Smith", "Johnson", "Williams", "Okafor", "Abubakar", "Okonkwo",
    "Bello", "Eze", "Mohammed", "Nwosu", "Okolo", "Adebayo", "Isichie",
    "Nnaemeka", "Abalaka", "Godwin", "Ojo", "Okaeme", "Ekele", "Okoro",
    "Onyeka", "Ejiofor", "Okeke", "Adams", "Ibrahim", "Adewale", "Ajayi",
    "Adeleke", "Ogunleye", "Olawale", "Okezie", "Ezeagu", "Obi", "Okoye",
    "Uzor", "Ejikeme", "Ugwu", "Okorie", "Nnaji", "Okafor", "Ejike",
    "Ezeji", "Onuoha", "Ejim", "Opara", "Ejiofor", "Ejike", "Okwudili",
    "Okoye", "Obiageli", "Onyinye"
]

# Retrieve a list of Instruments from database
instruments = storage.all(Instrument)
instrumentList = []

for instrument in instruments.values():
    instrumentList.append(instrument)

# List of city ids in database
city_ids = []
cities = storage.all(City)
for city in cities

# Generate random email address
def generate_email(first_name, last_name):
    domain = random.choice(["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"])
    username = first_name.lower() + last_name.lower() + ''.join(random.choices(string.digits, k=4))
    return f"{username}@{domain}"

def generate_random_phone_number():
    area_code = random.randint(100, 999)  # Generate a random 3-digit area code
    prefix = random.randint(100, 999)  # Generate a random 3-digit prefix
    line_number = random.randint(1000, 9999)  # Generate a random 4-digit line number

    # Format the phone number as "(area code)-prefix-line number"
    phone_number = f"({area_code})-{prefix}-{line_number}"
    
    return phone_number

# Generate sample musician data
sample_users = []
for _ in range(50):
    firstName = random.choice(first_names)
    lastName = random.choice(last_names)

    instruments = []
    for _ in range(2):
        instruments.append(random.choice(instrumentList))

    musician = {
        "firstName": firstName,
        "lastName": lastName,
        "email": generate_email(firstName, lastName),
        "password": ''.join(random.choices(string.ascii_letters + string.digits, k=8)),
        "city_id": random.choice(city_ids),
        "price_by_hour": random.randint(3, 50),
        "instruments": instruments,
        "userType": "Musician",
        "phone": generate_random_phone_number() 
    }

    sample_users.append(musician) # Append generated user data
    newMusician = User(**musician) # Create new user object
    newMusician.save() # Add and commit user object

    print(f"{newMusician.toDict()} object added successfully")

# Generate sample client data
for _ in range(30):
    firstName = random.choice(first_names)
    lastName = random.choice(last_names)

    client = {
        "firstName": firstName,
        "lastName": lastName,
        "email": generate_email(firstName, lastName),
        "password": ''.join(random.choices(string.ascii_letters + string.digits, k=8)),
        "city_id": random.choice(city_ids),
        "userType": "Client",
        "phone": generate_random_phone_number()
    }

    newClient = User(**client) # Create new user object
    newClient.save() # Add and commit user object
    sample_users.append(newClient.toDict()) # Append generated user data

    print(f"{newClient.toDict()} object added successfully")


print("Mission Accomplished")
