#!/usr/bin/python3
"""Defines the user model"""

from models import storage
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Table, Integer
from sqlalchemy.orm import relationship


musicianInstruments = Table('musicianInstruments', Base.metadata,
                            Column('user_id', String(60), ForeignKey(
                                'users.id'), nullable=False, primary_key=True),
                            Column('instrument_id', String(60), ForeignKey(
                                'instruments.id'), nullable=False, primary_key=True))


class User(BaseModel, Base):
    """The User model"""
    __tablename__ = "users"

    userType = Column(String(20), nullable=False)
    firstName = Column(String(128), nullable=False)
    lastName = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
    password = Column(String(128), nullable=False)
    state_id = Column(String(60), ForeignKey('states.id'), nullable=False)
    city_id = Column(String(60), ForeignKey('cities.id'), nullable=False)
    reviews = relationship('Review', backref='user', cascade='all, delete')
    if userType == "Musician":
        alias = Column(String(128), nullable=True)
        instruments = relationship(
            'Instrument', secondary='musicianInstruments', backref='players', viewonly=False)
        price_by_hour = Column(Integer, nullable=False, default=0)
