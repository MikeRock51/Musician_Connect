#!/usr/bin/python3
"""Defines the user model"""

from models.base_model import BaseModel, Base
from models.review import Review
from models.booking import Booking
from sqlalchemy import Column, String, ForeignKey, Table, Integer
from sqlalchemy.orm import relationship

defaultImage = "https://cdn-icons-png.flaticon.com/512/4123/4123763.png"

# Association table to represent a many to many relationship between
# a musician user and the instruments they play
musicianInstruments = Table('musicianInstruments', Base.metadata,
                            Column('user_id', String(60), ForeignKey(
                                'users.id'), nullable=False, primary_key=True),
                            Column('instrument_id', String(60), ForeignKey(
                                'instruments.id'), nullable=False,
                                primary_key=True), extend_existing=True)


class User(BaseModel, Base):
    """The User model"""
    __tablename__ = "users"

    userType = Column(String(20), nullable=False)  # Client or Musician
    firstName = Column(String(128), nullable=False)
    lastName = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False, unique=True)
    phone = Column(String(60), nullable=False, unique=True)
    password = Column(String(128), nullable=False)
    profilePicture = Column(String(1024), nullable=False,
                            default=defaultImage)
    description = Column(String(1024), nullable=True)
    city_id = Column(String(60), ForeignKey('cities.id'), nullable=False)
    rating = Column(Integer, nullable=False, default=5)
    # Stores a list of reviews by a client
    clientReviews = relationship(
        'Review', backref='client', cascade='all, delete',
        foreign_keys=[Review.client_id])
    # Stores a list of reviews by a musician
    musicianReviews = relationship(
        'Review', backref='musician', cascade='all, delete',
        foreign_keys=[Review.musician_id])
    # Stores a list of bookings by a client
    clientBookings = relationship('Booking', foreign_keys=[Booking.client_id])
    # Stores a list of bookings by a musician
    musicianBookings = relationship(
        'Booking', foreign_keys=[Booking.musician_id])
    alias = Column(String(128), nullable=True)
    # Stores a list of instruments played by a musician
    # and sets a reverse list of players in the instruments table
    instruments = relationship('Instrument',
                               secondary='musicianInstruments',
                               backref='players', cascade='all, delete',
                               viewonly=False)
    price_by_hour = Column(Integer, nullable=False, default=0)
