#!/usr/bin/python3
"""Defines the review model"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Integer


class Review(BaseModel, Base):
    """The Review model"""
    __tablename__ = "reviews"

    title = Column(String(128), nullable=False)
    text = Column(String(1024), nullable=False)
    client_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    musician_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    booking_id = Column(String(60), ForeignKey('bookings.id'), nullable=False)
    rating = Column(Integer, nullable=False, default=1)
