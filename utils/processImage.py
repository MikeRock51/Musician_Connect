#!/usr/bin/python3
"""Module for processing user profile pictures"""

from werkzeug.utils import secure_filename
import os


def allowedFile(filename):
    """Checks is file format is supported"""
    ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}

    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validateFileSize(file):
    """Validates that uploaded file doesn't exceed the max size"""
    MAX_CONTENT_LENGTH = 16 * 1000 * 1000
    return file.content_length <= MAX_CONTENT_LENGTH 

def processDP(file):
    """Returns a secure file name"""
    if file and allowedFile(file.filename):
        safeFileName = secure_filename(file.filename)
        file.save(os.path.join(UPLOAD_FOLDER, safeFileName)
        return os.path.join(UPLOAD_FOLDER, safeFileName)
