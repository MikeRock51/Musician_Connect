#!/usr/bin/python3
"""Defines RESTFUL API actions for users"""

from models import storage
from models.user import User
from api.v1.views import app_views
from flask import jsonify, make_response


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
