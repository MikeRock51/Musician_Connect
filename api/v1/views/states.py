#!/usr/bin/python3
"""Defines RESTFUL API actions for states"""

from models import storage
from models.state import State
from flask import request, make_response, jsonify, abort
from api.v1.views import app_views


@app_views.route('/states', strict_slashes=False)
def fetchStates():
    """Retrieves all states from storage"""
    allStates = storage.all(State)
    statesList = []

    for state in allStates.values():
        statesList.append(state.toDict())

    return make_response(jsonify(statesList), 200)

@app_views.route('/states/<state_id>', strict_slashes=False)
def fetchAState(state_id):
    """Retrieves the state with the specified state id"""
    state = storage.get(State, state_id)
    
    if not state:
        abort(404)

    return make_response(jsonify(state.toDict()), 200)

@app_views.route('/states', methods=['POST'], strict_slashes=False)
def createState():
    """Creates a new state in storage"""
    stateData = request.get_json()

    if not stateData:
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    if 'name' not in stateData:
        return make_response(jsonify({"error": "Missing State name"}), 400)
    
    state = State(**stateData)
    state.save()

    return make_response(jsonify(state.toDict()), 201)

@app_views.route('/states/<state_id>', methods=['PUT'], strict_slashes=False)
def updateState(state_id):
    """Updates the state with the specified id"""
    state = storage.get(State, state_id)

    if not state:
        abort(404)

    stateData = request.get_json()

    if not stateData:
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    ignoredKeys = ['id', 'createdAt', 'updatedAt']

    for key, value in stateData.items():
        if key not in ignoredKeys:
            setattr(state, key, value)

    state.save()

    return make_response(jsonify(state.toDict()), 200)

@app_views.route('/states/<state_id>', methods=['DELETE'], strict_slashes=False)
def deleteState(state_id):
    """Deletes the state with the specified id"""
    state = storage.get(State, state_id)

    if not state:
        abort(404)

    storage.delete(state)

    return make_response(jsonify({}), 200)
