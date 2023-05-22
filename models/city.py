#!/usr/bin/python3
"""Defines the City model"""

from models import storage
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey


class City(BaseModel, Base):
    """The Review model"""
    __tablename__ = "cities"

    name = Column(String(128), nullable=False)
    state_id = Column(String(60), nullable=False, ForeginKey('states.id'))
