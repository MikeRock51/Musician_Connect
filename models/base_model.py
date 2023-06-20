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
        if kwargs:
            for key, value in kwargs.items():
                if key != '__class__':
                    if key in ['updatedAt', 'createdAt']:
                        setattr(self, key, datetime.fromisoformat(value))
                    else:
                        setattr(self, key, value)
        self.id = str(uuid4())
        self.createdAt = datetime.now()
        self.updatedAt = datetime.now()

    def __str__(self):
        return ("[{}] ({}) {}".format
            (type(self).__name__, self.id, self.__dict__))

    def save(self):
        """Updates the updated_at attribute with current datetime"""
        self.updatedAt = datetime.now()
        storage.new(self)
        storage.save()


    def toDict(self):
        """Generates a dictionary representation of an instance"""
        instance = copy(self.__dict__)
        instance['__class__'] = type(self).__name__
        instance['createdAt'] = instance['createdAt'].isoformat()
        instance['updatedAt'] = instance['updatedAt'].isoformat()
        
        if instance.get('_sa_instance_state'):
            del (instance['_sa_instance_state'])

        if type(self).__name__ == 'User':
            from models.city import City

            bookings = []

            instance['city'] = storage.get(City, instance['city_id']).name
            if self.userType.lower() == 'musician':
                instruments = []
                for instrument in self.instruments:
                    instruments.append(instrument.toDict())
                instance['instruments'] = instruments

                for booking in self.musicianBookings:
                    bookings.append(booking.toDict())
            else:
                for booking in self.clientBookings:
                    bookings.append(booking.toDict())
            instance['bookings'] = bookings

        if type(self).__name__ == 'State':
            cities = []

            for city in self.cities:
                cities.append(city.toDict())

            instance['cities'] = sorted(cities, key=lambda x: x['name'])

        return instance

    def delete(self):
        """Deletes the current instance freom storage"""
        storage.delete(self)
