#!/usr/bin/python3
"""Defines RESTFUL API actions for users"""

from models import storage
from models.user import User
from api.v1.views import app_views
from flask import jsonify, make_response, request, abort, url_for
from models.instrument import Instrument
import bcrypt
from werkzeug.utils import secure_filename


def allowedFile(filename):
    """Checks is file format is supported"""
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}

    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validateFileSize(file):
    """Validates that uploaded file doesn't exceed the max size"""
    MAX_CONTENT_LENGTH = 16 * 1000 * 1000
    return file.content_length <= MAX_CONTENT_LENGTH 


@app_views.route('/users', strict_slashes=False)
def allUsers():
    """Returns a JSON formatted list of all users in database"""
    usersList = []
    allUsers = storage.all(User)

    for user in allUsers.values():
        usersList.append(user.toDict())

    return make_response(jsonify(usersList), 200)

@app_views.route('/users/type/<userType>', strict_slashes=False)
def getUserByType(userType):
    """Returns a JSON formatted list of all users of the requested type"""
    usersList = []
    allUsers = storage.all(User)

    for user in allUsers.values():
        if user.toDict()['userType'].lower() == userType.lower():
            usersList.append(user.toDict())

    return make_response(jsonify(usersList), 200)

@app_views.route('/users/<userId>', strict_slashes=False)
def getUserById(userId):
    """Retrieves a user from storage by ID"""
    user = storage.get(User, userId)

    if not user:
        abort(404)

    return make_response(jsonify(user.toDict()), 200)
    
@app_views.route('/users', methods=['POST'], strict_slashes=False)
def createUser():
    """Creates a new User"""
    userData = request.get_json()
    if not userData:
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    requiredKeys = ['firstName', 'lastName', 'email', 'city_id', 'userType', 'phone', 'password']

    for key in requiredKeys:
        if key not in userData:
            return make_response(jsonify({"error": f"Missing {key}"}), 400)

    if 'instruments' in userData:
        instruments = []
        for id in userData['instruments']:
            instruments.append(storage.get(Instrument, id))
        userData['instruments'] = instruments

    if 'profilePicture' in userData:
        dpFile = request.files['profilePicture']
        if dpFile and dpFile.filename != '':
            if not validateFileSize(dpFile):
                return make_response(jsonify({"error": "File too large"}), 400)
            if not allowedFile(dpFile.filename):
                return make_response(jsonifiy({"error": "Format not supported"}), 400)

        secureDpName = secure_filename(dpFile.filename)

        userData['profilePicture'] = secureDpName
        UPLOAD_FOLDER = f"{url_for('static')}/images"
        dpFile.save('static/images/', secureDpName)
        #dpFile.save(os.path.join(app_views.root_path, UPLOAD_FOLDER, secureDpName))

    hashedPassword = bcrypt.hashpw(userData.get('password').encode('utf-8'), bcrypt.gensalt())
    userData['password'] = str(hashedPassword, 'utf-8')

    newUser = User(**userData)
    newUser.save()

    return make_response(jsonify(newUser.toDict()), 201)

@app_views.route('/users/auth', methods=['POST'], strict_slashes=False)
def authenticateUser():
    """Verifies the user credentials"""
    authData = request.get_json()

    if not authData:
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    if 'email' not in authData:
        return make_response(jsonify({"error": "Missing Email"}), 400)
    if 'password' not in authData:
        return make_response(jsonify({"error": "Missing Password"}), 400)

    user = storage.getEmailUser(authData.get('email'))

    if not user:
        abort(404)

    dbPassword = user.password.encode('utf-8')
    authPassword = authData.get('password').encode('utf-8')

    if bcrypt.checkpw(authPassword, dbPassword):
        return make_response(jsonify(user.toDict()), 200)
    
    return make_response(jsonify({"error": "Incorrect password"}), 401)

@app_views.route('/users/<user_id>', methods=['PUT'], strict_slashes=False)
def updateUser(user_id):
    """Updates the specified user"""
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    userData = request.get_json()

    if not userData:
        return make_response(jsonify({"error": "Not a JSON"}), 400)

    ignoredKeys = ['createdAt', 'updatedAt', 'id', 'userType']

    for key, value in userData.items():
        if key not in ignoredKeys:
            if key == 'profilePicture':
                dpFile = request.files['profilePicture']
            if dpFile and dpFile.filename != '':
                if not validateFileSize(dpFile):
                    return make_response(jsonify({"error": "File too large"}), 400)
                if not allowedFile(dpFile.filename):
                    return make_response(jsonifiy({"error": "Format not supported"}), 400)

                secureDpName = secure_filename(dpFile.filename)
                setattr(user, key, secureDpName)
                UPLOAD_FOLDER = f"{url_for('static')}/images"
                dpFile.save(os.path.join(app_views.root_path, UPLOAD_FOLDER, secureDpName))

            setattr(user, key, value)

    user.save()

    return make_response(jsonify(user.toDict()), 200)

@app_views.route('/users/<user_id>', methods=['DELETE'], strict_slashes=False)
def deleteUser(user_id):
    """Deletes the specified user from storage"""
    user = storage.get(User, user_id)
    if not user:
        abort(404)

    storage.delete(user)
    return make_response(jsonify({}), 200)

@app_views.route('/instruments', strict_slashes=False)
def fetchUserInstruments():
    """Retrives a list of all instrument object from storage"""
    instruments = storage.all(Instrument)
    instrumentList = []

    for instrument in instruments.values():
        instrumentList.append(instrument.toDict())

    return make_response(jsonify(instrumentList), 200)
