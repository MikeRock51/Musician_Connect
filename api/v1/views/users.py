#!/usr/bin/python3
"""Defines RESTFUL API actions for users"""

from models import storage
from models.user import User
from api.v1.views import app_views
from flask import jsonify, make_response, request, abort


@app_views.route('/users', strict_slashes=False)
def allUsers():
    """Returns a JSON formatted list of all users in database"""
    usersList = []
    allUsers = storage.all(User)

    for user in allUsers.values():
        usersList.append(user.toDict())

    return jsonify(usersList)

@app_views.route('/users/type/<userType>', strict_slashes=False)
def getUserByType(userType):
    """Returns a JSON formatted list of all users of the requested type"""
    usersList = []
    allUsers = storage.all(User)

    for user in allUsers.values():
        if user.toDict()['userType'].lower() == userType.lower():
            usersList.append(user.toDict())

    return jsonify(usersList)

@app_views.route('/users/<userId>', strict_slashes=False)
def getUserById(userId):
    """Retrieves a user from storage by ID"""
    return jsonify(storage.get(User, userId).toDict())

@app_views.route('/users', methods=['POST'], strict_slashes=False)
def createUser():
    """Creates a new User"""
    userData = request.get_json()
    if not userData:
        abort(400, description="Not a JSON")

    if 'firstName' not in userData:
        return make_response(jsonify({"error": "Missing First Name"}), 400)
    if 'lastName' not in userData:
        return make_response(jsonify({"error": "Missing Last Name"}), 400)
    if 'email' not in userData:
        return make_response(jsonify({"error": "Missing Email"}), 400)
    if 'password' not in userData:
        return make_response(jsonify({"error": "Missing Password"}), 400)
    if 'city_id' not in userData:
        return make_response(jsonify({"error": "Missing City Id"}), 400)
    if 'userType' not in userData:
        return make_response(jsonify({"error": "Missing userType"}), 400)

    newUser = User(**userData)
    newUser.save()

    return make_response(jsonify(newUser.toDict()), 201)

@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
def updateUser(user_id):
    """Updates the specified user"""
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    userData = request.get_json()

    if not userData:
        abort(400, description="Not a JSON")

    ignoredKeys = ['createdAt', 'updatedAt', 'id', 'userType']

    for key, value in userData.items():
        if key not in ignoredKeys:
            setattr(user, key, value)

    user.save()

    return make_response(jsonify(user.toDict()), 200)
