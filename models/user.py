#!/usr/bin/python3
"""Defines the user model"""

from models import storage
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
    """The User model"""
    __tablename__ = "users"

    userType = Column(String(20), nullable=False)
    firstName = Column(String(128), nullable=False)
    lastName = Column(String(128), nullable=False)
    if userType == "Musician":
        alias = Column(String(128), nullable=True)
        instruments = 
