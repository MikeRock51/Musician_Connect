#!/usr/bin/python3
"""Defines the user model"""

from models.base_model import BaseModel, Base
from models.review import Review
from models.booking import Booking
from sqlalchemy import Column, String, ForeignKey, Table, Integer
from sqlalchemy.orm import relationship

defaultImage= "https://cdn-icons-png.flaticon.com/512/4123/4123763.png"

musicianInstruments = Table('musicianInstruments', Base.metadata,
                            Column('user_id', String(60), ForeignKey(
                                'users.id'), nullable=False, primary_key=True),
                            Column('instrument_id', String(60), ForeignKey(
                                'instruments.id'), nullable=False, primary_key=True), extend_existing=True)


class User(BaseModel, Base):
    """The User model"""
    __tablename__ = "users"

    userType = Column(String(20), nullable=False)
    firstName = Column(String(128), nullable=False)
    lastName = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
    phone = Column(String(60), nullable=False)
    password = Column(String(128), nullable=False)
    profilePicture = Column(String(1024), nullable=False,
            default=defaultImage)
    description = Column(String(1024), nullable=True)
    city_id = Column(String(60), ForeignKey('cities.id'), nullable=False)
    clientReviews = relationship(
        'Review', backref='client', cascade='all, delete', foreign_keys=[Review.client_id])
    musicianReviews = relationship(
        'Review', backref='musician', cascade='all, delete', foreign_keys=[Review.musician_id])
    clientBookings = relationship('Booking', foreign_keys=[Booking.client_id])
    musicianBookings = relationship(
        'Booking', foreign_keys=[Booking.musician_id])
    alias = Column(String(128), nullable=True)
    instruments = relationship('Instrument',
                               secondary='musicianInstruments', backref='players', cascade='all, delete', viewonly=False)
    price_by_hour = Column(Integer, nullable=False, default=0)
