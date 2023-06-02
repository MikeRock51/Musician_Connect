#!/usr/bin/python3
"""Handles processing and uploading profile pictures"""

import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
from api.v1.views import app_views
from models.user import User
from models import storage

UPLOAD_FOLDER = '/home/mike_rock/Desktop/dev2/Musician_Connect/static/images'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png', 'gif'}

app_views.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app_views.route('/users/profile/picture', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('download_file', name=filename))
