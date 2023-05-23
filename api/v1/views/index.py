#!/usr/bin/python3
"""Index"""

from api.v1.views import app_views
from flask import jsonify
from models import storage


@app_views.route('/status')
def statusOK():
    """Returns a JSON formatted OK status"""

    return jsonify({"status": "OK"})

@app_views.route('/stats')
def getStats():
    """Returns a stat of each objects in storage"""
    classes = storage.allModels()

    for key, value in classes.items():
        classes[key] = storage.count(value)

    return jsonify(classes)
