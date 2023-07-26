#!/usr/bin/python3
"""Base module of the application"""

from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, String, DateTime
from datetime import datetime
from uuid import uuid4
from models import storage
from copy import copy


Base = declarative_base()


class BaseModel():
    """
    Defines all common attributes that will be inheritted by other models
    """
    id = Column(String(60), nullable=False, primary_key=True)
    createdAt = Column(DateTime, nullable=False, default=datetime.utcnow())
    updatedAt = Column(DateTime, nullable=False, default=datetime.utcnow())

    def __init__(self, *args, **kwargs):
        """BaseModel object constructor"""
        # Allows for creating a new instance from a dictionary
        if kwargs:
            for key, value in kwargs.items():
                # Skips __class__ key, value if encountered
                if key != '__class__':
                    if key in ['updatedAt', 'createdAt']:
                        # Create a datetime object from an iso strring
                        setattr(self, key, datetime.fromisoformat(value))
                    else:
                        setattr(self, key, value)
        self.id = str(uuid4())
        self.createdAt = datetime.now()
        self.updatedAt = datetime.now()

    def __str__(self):
        """Returns a string representation of an instance"""
        return ("[{}] ({}) {}".format
            (type(self).__name__, self.id, self.__dict__))

    def save(self):
        """Saves the new instances to storage"""
        # Update updatedAt attribute to current datetime
        self.updatedAt = datetime.now()
        storage.new(self)
        storage.save()


    def toDict(self):
        """Generates a dictionary representation of an instance"""
        # Create a copy of instance
        instance = copy(self.__dict__)
        # Add a new attribute to store the type of self
        instance['__class__'] = type(self).__name__
        # Convert createdAt/updatedAt attributes to iso strings
        instance['createdAt'] = instance['createdAt'].isoformat()
        instance['updatedAt'] = instance['updatedAt'].isoformat()

        # Remove sqlalchemy-generated state attribute        
        if instance.get('_sa_instance_state'):
            del (instance['_sa_instance_state'])

        # Set user-specific attributes
        if type(self).__name__ == 'User':
            from models.city import City

            bookings = []

            # Add city name to the dictionary representation of a User
            instance['city'] = storage.get(City, instance['city_id']).name
            if self.userType.lower() == 'musician':
                instruments = []
                # Create a list of dictionary representations of instruments
                # played by a musician
                for instrument in self.instruments:
                    instruments.append(instrument.toDict())
                # Save instrument list to musician dictionary
                instance['instruments'] = instruments

                # Create a list of dictionary representation of musician bookings
                for booking in self.musicianBookings:
                    bookings.append(booking.toDict())
            else:
                # Create a list of dictionary representation of client bookings 
                for booking in self.clientBookings:
                    bookings.append(booking.toDict())
            # Save booking list to user dictionary
            instance['bookings'] = bookings

        # Set state-specific attributes
        if type(self).__name__ == 'State':
            cities = []

            # Create a list of dictionary representation of the cities of a state
            for city in self.cities:
                cities.append(city.toDict())

            # Save city list to dictionary, sorted by city name
            instance['cities'] = sorted(cities, key=lambda x: x['name'])

        return instance

    def delete(self):
        """Deletes the current instance freom storage"""
        storage.delete(self)
