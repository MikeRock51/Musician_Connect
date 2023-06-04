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
city_ids = [
    "04ec2777-73ff-499e-842c-868b9fb1aa74",
    "11f82090-0fd4-4393-ae3f-80a681a99c72",
    "18490353-9bdf-4f2d-acdf-1f1a663fd3e9",
    "1969a9dc-9c2c-4d30-afc6-2eae94ac828c",
    "1a12ec69-ac18-45f1-a892-aa6d4af902d1",
    "1eece795-8083-4ad8-9eaa-17404afdf741",
    "1f0f00df-2767-479e-abb9-1c68f8eaf3da",
    "202cfbae-e0bb-46de-9170-96db4cebbb86",
    "206b6ed5-75de-4166-a592-ce3ae52c00db",
    "208eedc8-b0b6-490b-b14e-242bd0eea1c7",
    "248a45cc-5c0c-454b-8957-aa371f2e022c",
    "26856c18-8078-41f9-9307-0710d6ceb7bf",
    "2a708394-c897-4dfd-aef1-664797acd535",
    "2bc35cbe-e02f-4269-8e64-dede1bd91303",
    "323b40af-a25d-4d63-8018-25f1114ecfaa",
    "363cb55f-78c3-4845-8f32-92e711d4d3cc",
    "39ae9d86-e294-426e-9e6c-c7855dc68873",
    "457f6337-702e-4d80-af1e-6bd6c86346cc",
    "46e49532-eb42-487b-8762-5bc02fb65f8d",
    "47534323-dc2a-4db6-beef-08f7cbd80885",
    "4ce4974b-c2a1-4736-bb56-12b77ff72f3a",
    "57da4d72-5451-4e52-b226-4a00c47ae2f1",
    "57dcc7ef-cc03-48f2-a68f-ac336426aaa8",
    "5d176f7a-70ff-4eda-afe4-b538a6298277",
    "621f69e1-2547-43c0-ad32-7bde50f988dd",
    "647c000e-c215-43f3-848b-8df3642e9e19",
    "679b93f7-a44d-43fd-8389-b3ddec0c89b4",
    "67d489e8-8755-483a-9fe9-7a01ead2490e",
    "6c25d01c-4dbb-459e-978b-a2be01804d7e",
    "7418c186-6afb-4b99-8d7d-200d95e7fba3",
    "74e9da92-f582-43fd-b2a1-bce7dfd070d8",
    "7c49c11e-0e23-4f73-8df8-63ed96d24215",
    "7cb6fd50-dbe0-412b-ae25-f880d831c9ad",
    "803303be-7001-4087-a480-5d510ba3bb55",
    "80e42961-7b1b-45ee-94a6-ffc7fe080187",
    "831c0e99-28fa-4250-80e0-16ed86d72906",
    "8f38015c-cfc7-4d2d-8806-b5f8221dd4c8",
    "8f47a262-3060-4306-897d-454099a56cde",
    "8f4d907b-38bd-4778-b362-eedf73f40624",
    "93fb3e97-a59a-40c6-8603-b7598d8ca9e4",
    "94708645-103b-487e-8664-1f077707cc87",
    "9ebd4e35-ea19-4baa-b8c1-c5f4512be7e7",
    "a47ceeda-18a5-4e38-b14d-5405c705ed8e",
    "a5ff12e1-e5be-4f8d-bd13-435c68663950",
    "a6c319ec-d74b-49b8-a40c-edb1ffe419a0",
    "ac2ed980-bfba-43ee-ba68-c87a8cdf0585",
    "b1e4042f-66f7-48de-9990-c24c92980b81",
    "b8ee96ae-f237-433d-8103-6b7ea9cc6d6c",
    "c2372e02-ed3e-4758-8f4b-de798e24b2ac",
    "c5e660fc-9c4b-4364-b1ab-b3e226abec3f",
    "c60dc7c0-a24c-4c6e-9b5c-717e5a7eba02",
    "d4d855e8-99e2-47f8-9ff0-5cfbb3e85c67",
    "d8f13962-4cc6-4186-805a-53fbf48d7de4",
    "d9227445-59c9-40ab-9197-9b63d3731bdf",
    "d9f6469f-b608-49d3-b999-86fd2f72862a",
    "fa93bcd3-8629-4acf-b252-4fdd9cf90333"
]


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
    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    email = generate_email(first_name, last_name)
    password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
    price_by_hour = random.randint(3, 50)
    instruments = []
    for _ in range(2):
        instruments.append(random.choice(instrumentList))

    musician = {
        "firstName": first_name,
        "lastName": last_name,
        "email": email,
        "password": password,
        "city_id": random.choice(city_ids),
        "price_by_hour": price_by_hour,
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
    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    email = generate_email(first_name, last_name)
    password = ''.join(random.choices(string.ascii_letters + string.digits, k=8))

    client = {
        "firstName": first_name,
        "lastName": last_name,
        "email": email,
        "password": password,
        "city_id": random.choice(city_ids),
        "userType": "Client",
        "phone": generate_random_phone_number()
    }

    newClient = User(**client) # Create new user object
    newClient.save() # Add and commit user object
    sample_users.append(newClient.toDict()) # Append generated user data

    print(f"{newClient.toDict()} object added successfully")


print("Mission Accomplished")
