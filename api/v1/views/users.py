#!/usr/bin/python3
"""Defines RESTFUL API actions for users"""

from models import storage
from models.user import User
from api.v1.views import app_views
from flask import jsonify, make_response


@app_views.route('/users')
def allUsers():
    """Returns a JSON formatted list of all users in database"""
    usersList = []
    allUsers = storage.all(User)

    for user in allUsers.values():
        usersList.append(user.toDict())

    return jsonify(usersList)
