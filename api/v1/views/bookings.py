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

@app_views.route('/bookings', strict_slashes=False)
def fetchAllBookings():
    """Retrieves all bookings in storage"""
    bookings = storage.all(Booking)
    bookingList = []

    for booking in bookings.values():
        bookingList.append(booking.toDict())


    return make_response(jsonify(bookingList), 200)

@app_views.route('/bookings/completed', strict_slashes=False)
def fetchCompletedBookings():
    """Retrieves a list of completed bookings"""
    bookings = storage.all(Booking)
    bookingList = []

    for booking in bookings.values():
        if booking.completed:
            bookingList.append(booking.toDict())


    return make_response(jsonify(bookingList), 200)


@app_views.route('/bookings/<booking_id>', strict_slashes=False)
def fetchBooking(booking_id):
    """Retrieves the booking with the specified id"""
    booking = storage.get(Booking, booking_id)

    if not booking:
        abort(404)

    return make_response(jsonify(booking.toDict()), 200)

@app_views.route('/bookings/<booking_id>', methods=['PUT'], strict_slashes=False)
def updateBooking(booking_id):
    """Updates the booking with the specified id"""
    booking = storage.get(Booking, booking_id)

    if not booking:
        abort(404)

    bookingData = request.get_json()

    if not bookingData:
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    ignoredKeys = ['id', 'createdAt', 'updateAt']

    for key, value in bookingData.items():
        if key not in ignoredKeys:
            setattr(booking, key, value)

    booking.save()

    return make_response(jsonify(booking.toDict()), 200)

@app_views.route('/bookings', methods=['POST'], strict_slashes=False)
def createBooking():
    """Creates a new booking in storage"""
    bookingData = request.get_json()

    if not bookingData:
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    requiredKeys = ['event_type', 'event_date', 'event_address', 'city_id', 'client_id', 'musician_id']

    for key in requiredKeys:
        if key not in bookingData:
            return make_response(jsonify({"error": f"Missing {key}"}), 400)

    booking = Booking(**bookingData)
    booking.save()

    return make_response(jsonify(booking.toDict()), 201)
