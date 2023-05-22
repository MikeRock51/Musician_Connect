#!/usr/bin/python3
"""Defines the review model"""

from models import storage
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Review(BaseModel, Base):
    """The Review model"""
    __tablename__ = "reviews"

    title = Column(String(128), nullable=False)
    text = Column(String(1024), nullable=False)
    email = Column(String(128), nullable=False)
    user_id = Column(String(60), nullable=False, ForeignKey('states.id'))
    rating = Column(Integer, nullable=False, default=1)
