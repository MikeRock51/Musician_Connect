#!/usr/bin/python3
"""Defines RESFUL API actions for Reviews"""

from models import storage
from models.review import Review
from models.user import User
from models.booking import Booking
from api.v1.views import app_views
from flask import jsonify, make_response, abort, request


@app_views.route('/users/<user_type>/<user_id>/reviews', strict_slashes=False)
def fetchUserReviews(user_id, user_type):
    """Retrieves all reviews about the specified user"""
    if user_type.lower() not in ['client', 'musician']:
        return make_response(jsonify({"error": "Invalid User Type"}), 400)

    user = storage.get(User, user_id)

    if not user:
        abort(404)

    if user_type.lower() == 'client':
        reviews = user.clientReviews
    else:
        reviews = user.musicianReviews

    reviewList = []

    for review in reviews:
        reviewList.append(review.toDict())

    return make_response(jsonify(reviewList), 200)

@app_views.route('/reviews', strict_slashes=False)
def allReviews():
    """Retrieves a list of all reviews in storage"""
    reviews = storage.all(Review)
    reviewList = []

    for review in reviews.values():
        reviewList.append(review.toDict())

    return make_response(jsonify(reviewList), 200)

@app_views.route('/reviews/<review_id>', strict_slashes=False)
def fetchReview(review_id):
    """Retrieves the review with the specified review id"""
    review = storage.get(Review, review_id)

    if not review:
        abort(404)

    return make_response(jsonify(review.toDict()), 200)

@app_views.route('/reviews/<review_id>', methods=['PUT'], strict_slashes=False)
def updateReview(review_id):
    """Updates the review with the specified id"""
    review = storage.get(Review, review_id)

    if not review:
        abort(404)

    reviewData = request.get_json()

    if not reviewData:
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    allowedKeys = ['title', 'text', 'rating']

    for key, value in reviewData.items():
        if key in allowedKeys:
            setattr(review, key, value)

    review.save()

    return make_response(jsonify(review.toDict()), 200)

@app_views.route('/reviews/<review_id>', methods=['DELETE'], strict_slashes=False)
def deleteReview(review_id):
    """Deletes the review with the specified Id"""
    review = storage.get(Review, review_id)

    if not review:
        abort(404)

    storage.delete(review)

    return make_response(jsonify({}), 200)

@app_views.route('/reviews', methods=['POST'], strict_slashes=False)
def createReview():
    """Creates a new review object in storage"""
    reviewData = request.get_json()

    if not reviewData:
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    requiredKeys = ['title', 'text', 'client_id', 'musician_id', 'booking_id']
    for key in requiredKeys:
        if key not in reviewData: 
            return make_response(jsonify({"error": f"Missing {key}"}), 400)
    review = Review(**reviewData)
    review.save()

    return make_response(jsonify(review.toDict()), 201)
