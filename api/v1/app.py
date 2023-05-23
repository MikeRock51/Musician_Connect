#!/usr/bin/python3
"""Flask Application"""

from flask import Flask, make_response, jsonify
from models import storage
from flask_cors import CORS
from api.v1.views import app_views


app = Flask(__name__)
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})


@app.teardown_appcontext
def tearDown(self):
    """Removes the current SQLAlchemy Session"""
    storage.close()


@app.errorhandler(404)
def notFound(err):
    """Returns a json formatted 404 error"""
    return make_response(jsonify({'error': 'Not Found'}), 404)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=7000, threaded=True)
