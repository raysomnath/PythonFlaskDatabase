from datetime import datetime

from flask import Flask, render_template, request, redirect, url_for

from PythonFlaskDatabase import app
from PythonFlaskDatabase.models.factory import create_repository
from PythonFlaskDatabase.settings import REPOSITORY_NAME, REPOSITORY_SETTINGS

from bson import objectid
from pymongo import MongoClient
import json

repository = create_repository(REPOSITORY_NAME, REPOSITORY_SETTINGS)


title = "TODO sample application with Flask and MongoDB"
heading = "TODO Reminder with Flask and MongoDB"




@app.route('/')
@app.route('/home')
def home():
    """Renders a sample page."""
    
    return render_template(
        "results.html",
        title="Customer data",
        records = repository.get_customers(),
        )