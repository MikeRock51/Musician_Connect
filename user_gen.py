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
    "0a6a0943-5092-4ae3-965a-335d7041e0ff",
    "11632736-87b6-4c6c-bd4f-912ec5c536f9",
    "17805f08-5dc0-4c8a-8952-2e651882fd2b",
    "19b502a7-35d7-4fd2-aeca-ddc6c0b08623",
    "1d355418-e442-413a-9fd3-a6c19320fbf1",
    "21969262-7c83-43fd-b26a-f6cee2e5a9c1",
    "279a76de-804f-45c3-933a-641ca5c6142e",
    "30982a5a-b37c-413c-a188-e73613b55bfc",
    "32cd9303-d6aa-4fc9-9e36-361df0783174",
    "364630ab-c4e1-4713-9da7-e07cb60a408d",
    "3ab28dd7-3956-42ba-a97f-5ed8a827b89b",
    "49340988-f37c-46a1-bfa7-0dee3cad5bc1",
    "4aff15f8-4d57-42fd-a9b9-c6550df19225",
    "56e77a67-7879-4cac-8b7a-9b0569a34444",
    "5b91bfd8-c72b-44ff-98fc-2052ba7e639e",
    "67725924-1e09-493a-bcff-cd8848f1e5da",
    "67dbd406-6f1e-4dd4-992d-cbf1c8429781",
    "68c14ec9-1b45-49df-a54f-b420c0020c1d",
    "71ea9262-a281-47dd-9852-aaa34132dc48",
    "7dd2cc47-187c-4443-b143-cd06d70fd07a",
    "7f1c0dad-c482-436a-9b1f-f44c37ac19ba",
    "831a880f-1d76-4b4b-9b93-387487ee2390",
    "835bf822-aada-4606-b8d4-de5a57ccca89",
    "87a58faa-9f1a-4cfa-9212-d37fbe375e23",
    "8ae4bab3-5c9c-47e6-956f-f2633b76117a",
    "8e8481f3-37ee-4fc2-8193-d3b5fb5c7ebb",
    "8fb9f212-bd13-49ba-8fa2-324b84c705ef",
    "90e5748a-e2b6-4661-97f5-4f23f7e48934",
    "910dfd7d-9907-46e5-9006-806cb2f6c801",
    "9949979e-05f6-427e-ad89-1395d4c9b58a",
    "9bf79f3e-0e87-415a-ab68-803666b371c9",
    "9f71912d-b0a0-43ec-abde-c801ec7013bd",
    "a2805e49-f81c-40a8-aea7-e99a9cfaae72",
    "a6364e92-0348-4682-8b27-95369e3dee5f",
    "a71a17f4-ec0b-4b69-8fe4-e1c4fcba3a4f",
    "a9c948b8-8f0b-4214-b462-3c7f04c0867d",
    "b29da7a5-581f-465e-bc8c-0d2443e2b85b",
    "b83bab64-78f9-4c1c-8872-496aa8c948ea",
    "b86b38d9-d488-4e20-9b6f-f90c700d53f9",
    "b9b95086-6e19-461d-be65-d4d98786e4fb",
    "bab2615d-05e4-4af1-ae8f-2f205b32dc23",
    "bc612204-6c6d-4b14-800c-0e488a48d944",
    "bdf5ad82-9c41-4e6f-ae8a-a0ef8107e25a",
    "c426aa98-de3a-48cb-bbdd-6fb888eb645c",
    "c547f886-6444-442b-8bbd-03cae9e173d2",
    "c7d9ed0b-fe85-4018-a153-a33fb55d332c",
    "ca7eb70b-4724-4d6a-a718-4aa14d4668e4",
    "d45c01f0-8c7a-47b6-9da9-6fc67c6fbaac",
    "d56db3b2-75b3-409d-b965-64af1eeaad87",
    "e1321dab-be6d-4826-aebc-0827d0e23185",
    "e1e73faf-d6b5-4719-8355-7d587697c6c8",
    "e2f16ee2-01fc-4dd2-a6e0-d13063e8dffd",
    "ee4e7f84-21df-4713-9ff3-e32727c3e838",
    "f126aff0-905f-4e8c-8ddc-5579a97611dc",
    "f454b39d-64b1-491e-93f4-cbf128babc77",
    "f93d21cb-30b4-4f4c-896e-466280c29094"
]

# Generate random email address
def generate_email(first_name, last_name):
    domain = random.choice(["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"])
    username = first_name.lower() + last_name.lower() + ''.join(random.choices(string.digits, k=4))
    return f"{username}@{domain}"

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
        "userType": "Musician"
    }

    sample_users.append(musician) # Append generated user data
    newMusician = User(**musician) # Create new user object
    newMusician.save() # Add and commit user object

    print(f"{newMusician.toDict()} object added successfully")

# Generate sample client data
for _ in range(50):
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
        "userType": "Client"
    }

    newClient = User(**client) # Create new user object
    newClient.save() # Add and commit user object
    sample_users.append(newClient.toDict()) # Append generated user data

    print(f"{newClient.toDict()} object added successfully")


print("Mission Accomplished")
