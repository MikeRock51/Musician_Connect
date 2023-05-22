#!/usr/bin/python3
"""Defines the booking model"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship


class Booking(BaseModel, Base):
    """The Booking model"""
    __tablename__ = "bookings"

    event_type = Column(String(128), nullable=False)
    event_date = Column(DateTime, nullable=False)
    event_address = Column(String(128), nullable=False)
    state_id = Column(String(60), ForeignKey('states.id'), nullable=False)
    city_id = Column(String(60), ForeignKey('cities.id'), nullable=False)
    client_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    musician_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    completed = Column(Boolean, nullable=False, default=False)
