#!/usr/bin/python3
"""Defines RESTFUL API actions for bookings"""

from models import storage
from models.booking import Booking
from models.user import User
from api.v1.views import app_views
from flask import make_response, jsonify, abort, request


@app_views.route('/users/<user_type>/<user_id>/bookings', strict_slashes=False)
def fetchUserBookings(user_id, user_type):
    """
        Retrieves all the bookings a user was involved in
        based of user id and user type
    """
    if user_type.lower() not in ['musician', 'client']:
        return make_response(jsonify({"error": "Invalid User type"}), 400)

    user = storage.get(User, user_id)

    if not user:
        abort(404)

    userReviews = []

    if user_type == 'musician':
        reviews = user.musicianBookings
    else: 
        reviews = user.clientBookings

    for review in reviews:
        userReviews.append(Booking(review).toDict())

    return make_response(jsonify(userReviews), 200)
