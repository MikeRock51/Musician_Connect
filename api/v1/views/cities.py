#!/usr/bin/python3
"""Defines RESTFUL API actions for cities"""

from models import storage
from models.state import State
from models.city import City
from flask import request, make_response, jsonify, abort
from api.v1.views import app_views


@app_views.route('/states/<state_id>/cities', strict_slashes=False)
def fetchStateCities(state_id):
    """Retrieves all cities in the state with the specified id"""
    state = storage.get(State, state_id)
    stateCities = []

    if not state:
        abort(404)

    cities = state.cities

    for city in cities:
        stateCities.append(city.toDict())

    return make_response(jsonify(stateCities), 200)

@app_views.route('/cities/<city_id>', strict_slashes=False)
def fetchCity(city_id):
    """Retrieves the city with the specified id"""
    city = storage.get(City, city_id)

    if not city:
        abort(404)

    return make_response(jsonify(city.toDict()), 200)

@app_views.route('/cities/<city_id>', methods=['PUT'], strict_slashes=False)
def updateCity(city_id):
    """Updates the city with the specified city Id"""
    city = storage.get(City, city_id)

    if not city:
        abort(404)

    cityData = request.get_json()

    if not cityData:
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    
    ignoredKeys = ['createdAt', 'id', 'updatedAt']

    for key, value in cityData.items():
        if key not in ignoredKeys:
            setattr(city, key, value)

    city.save()

    return make_response(jsonify(city.toDict()), 200)

@app_views.route('/states/<state_id>/cities', methods=['POST'], strict_slashes=False)
def createCity(state_id):
    """Creates a new city in storage under the state with the specified Id"""
    state = storage.get(State, state_id)

    if not state:
        abort(404)

    cityData = request.get_json()

    if not cityData:
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    if 'name' not in cityData:
        return make_response(jsonify({"error": "Missing City Name"}), 400)

    cityData['state_id'] = state.id

    city = City(**cityData)
    city.save()

    return make_response(jsonify(city.toDict()), 201)

@app_views.route('/cities/<city_id>', methods=['DELETE'], strict_slashes=False)
def deleteCity(city_id):
    """Deletes the city with the specified city id"""
    city = storage.get(City, city_id)

    if not city:
        abort(404)

    storage.delete(city)

    return make_response(jsonify({}), 200)
