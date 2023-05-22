#!/usr/bin/python3
"""Defines the user model"""

from models import storage
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    """The User model"""
    __tablename__ = "users"

    userType = Column(String(20), nullable=False)
    firstName = Column(String(128), nullable=False)
    lastName = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    state_id = Column(String(60), nullable=False, ForeignKey('states.id'))
    city_id = Column(String(60), ForeignKey('cities.id'), nullable=False)
    reviews = relationship('Review', backref='user', cascade='all, delete')
    if userType == "Musician":
        alias = Column(String(128), nullable=True)
        instruments = relationship('Instrument', backref='players', cascade='all, delete')
        price_by_hour = Column(Integer, nullable=False, default=0)
