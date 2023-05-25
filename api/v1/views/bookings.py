#!/usr/bin/python3
"""Defines RESTFUL API actions for bookings"""

from models import storage
from models.booking import Booking
from models,user import User
from api.v1.views import app_views
from flask import make_response, jsonify, abort, request


@app_views.route('/users/<user_id>/bookings', strict_slashes=False)
def fetchUserBookings(user_id):
    """Retrieves all the bookings a user was involved in"""

