from datetime import datetime

from flask import Flask, render_template, request, redirect, url_for

from PythonFlaskDatabase import app
from PythonFlaskDatabase.models.factory import create_repository
from PythonFlaskDatabase.settings import REPOSITORY_NAME, REPOSITORY_SETTINGS

from bson import objectid
from pymongo import MongoClient
import json

repository = create_repository(REPOSITORY_NAME, REPOSITORY_SETTINGS)

@app.route('/')
@app.route('/home')
def home():
    
    """Renders all customers from database."""
    return render_template("results.html",
        year=datetime.now().year,
        title="Customer data",
        records = repository.get_customers(),)

@app.route('/addCustomer',methods=['GET', 'POST'])
def addCustomer():
    """Renders a add customer page."""
    if request.method == 'GET':
        return render_template("addCustomer.html",
        title="Add Customer",
        year=datetime.now().year,
        records = repository.get_customers())
    elif request.method == 'POST':
        data = request.get_json()
        result = repository.add_customer(data)
        return (json.dumps({"result":str(result)}))

@app.route('/deleteCustomer',methods=['POST'])
def deleteCustomer():
    """deletes customer."""
    if request.method == 'POST':
        data = request.get_json()
        result = repository.delete_customer(data)
        return (json.dumps({ "result": result }))

@app.route('/editCustomer',methods=['POST'])
def editCustomer():
    """Edit a customer and returns the results of the operation."""
    if request.method == 'POST':
        data = request.get_json()
        result = repository.edit_customer(data)
        return (json.dumps({ "result" : result }))