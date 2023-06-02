#!/usr/bin/python3
"""Module for processing user profile pictures"""

from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER = '/home/mike_rock/Desktop/dev2/Musician_Connect/static/images'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}

def allowedFile(filename):
    """Checks is file format is supported"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def processDP(file):
    """Returns a secure file name"""
    if file and allowedFile(file.filename):
        safeFileName = secure_filename(file.filename)
        return os.path.join(UPLOAD_FOLDER, safeFileName)
