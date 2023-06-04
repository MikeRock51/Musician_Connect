#!/usr/bin/python3
"""A script to generate data and store in database"""

from os import getenv
from models.user import User
from models.instrument import Instrument
from models.city import City
from models.state import State
from models import storage

user = getenv('MCC_SQL_USER')
host = getenv('MCC_SQL_HOST')
pwd = getenv('MCC_SQL_PWD')
db = getenv('MCC_SQL_DB')


abuja = State(name='Abuja')
abuja.save()

print('All States created successfully')

cities = ['Abaji', 'Apo District', 'Asokoro', 'Bwari', 'Central Business District', 'Dakibiyu', 'Dakwo District', 'Dei-Dei', 'Duboyi', 'Durumi', 'Dutse-Alhaji', 'Gaduwa', 'Galadimawa', 'Garki 1', 'Garki 2', 'Gudu', 'Guzape District', 'Gwagwa', 'Gwagwalada', 'Gwarinpa', 'Idu Industrial', 'Jabi', 'Jahi', 'Jikwoyi', 'Jiwa', 'Kabusa', 'Kado', 'Karmo', 'Karshi', 'Karu', 'Katampe', 'Kaura', 'Kpeyegyi', 'Kubwa', 'Kuchigoro', 'Kuje', 'Kurudu', 'Kwali', 'Lokogoma', 'Lugbe District', 'Mabushi', 'Maitama', 'Mararaba', 'Masaka', 'Mbora', 'Mpape', 'Nyanya', 'Okanje', 'Orozo', 'Pyakasa', 'Sabo Gida', 'Utako', 'Wumba', 'Wuse', 'Wuse 2', 'Wuye']

for city in cities:
    newCity = City(name=city, state_id=abuja.id)
    newCity.save()

print('All Cities created successfully')

instruments = {
    'Strings': ['Violin', 'Cello', 'Double Bass', 'Viola', 'Harp', 'Mandolin'],
    'Woodwinds': ['Flute', 'Clarinet', 'Saxophone', 'Oboe', 'Bassoon', 'Piccolo'],
    'Brass': ['Trumpet', 'Trombone', 'French Horn', 'Tuba', 'Cornet', 'Euphonium'],
    'Percussion': ['Drums', 'Xylophone', 'Marimba', 'Timpani', 'Glockenspiel', 'Vibraphone', 'Celesta', 'Tambourine', 'Clapper', 'Wood Block'],
    'Keyboards': ['Piano', 'Organ', 'Synthesizer', 'Harpsichord', 'Accordion', 'Celesta'],
    'Guitars': ['Acoustic Guitar', 'Electric Guitar', 'Bass Guitar', 'Classical Guitar', 'Ukelele'],
    'Electronic': ['Synthesizer', 'Sampler', 'Drum Machine', 'Digital Piano', 'Theremin', 'Music Production'],
    'Vocals': ['Soprano', 'Alto', 'Tenor', 'Baritone', 'Bass'],
    'Traditional': ['Djembe', 'Sitar', 'Didgeridoo', 'Bagpipes', 'Erhu', 'Shakuhachi', 'Talking Drum', 'Bata'],
    'Group': ['Orchestra', 'Band', 'Choir', 'Opera Group', 'Dance Group']
}

for key, value in instruments.items():
    for instrument in value:
        newInstrument = Instrument(name=instrument, family=key)
        newInstrument.save()
      
print('All Instruments created successfully')
print('Mission Accomplished')
