#!/usr/bin/python3
"""Defines the State model"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class State(BaseModel, Base):
    """The Review model"""
    __tablename__ = "states"

    name = Column(String(128), nullable=False)
    # One to many relationship between a state and it's cities
    cities = relationship('City', backref='state', cascade='all, delete')
