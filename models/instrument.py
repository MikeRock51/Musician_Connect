#!/usr/bin/python3
"""Defines the Instrument model"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Instrument(BaseModel, Base):
    """The Instrument model"""
    __tablename__ = "instruments"

    name = Column(String(128), nullable=False)
    family = Column(String(128), nullable=False)
