#!/usr/bin/python3
"""Base module of the application"""

from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, String, Integer, ForeigKey, DateTime
from datetime import datetime
from uuid import uuid4


base = declarative_base()


class BaseModel():
    """
    Defines all common attributes that will be inheritted by other models
    """
    id = Column(String(60), nullable=False, primary_key=True)
    createdAt = Column(Datetime, nullable=False, default=datetime.utcnow())
    updatedAt = Column(Datetime, nullable=False, default=datetime.utcnow())

    def __init__(self, *args, **kwargs):
        """BaseModel object constructor"""
        if kwargs:
            for key, value in kwargs.items():
                if key != '__class__':
                    if key in ['updatedAt', 'createdAt']:
                        setattr(self, key, datetime.fromisoformat(value))
                    else:
                        setattr(self, key, value)
        self.id = str(uuid4)
        self.createdAt = datetime.now()
        seld.updatedAt = datetime.now()

        def __str__(self):
            return ("[{}] ({}) {}".format
                (type(self).__name__, self.id, self.__dict__))
