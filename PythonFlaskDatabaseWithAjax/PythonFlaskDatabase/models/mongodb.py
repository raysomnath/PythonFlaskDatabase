"""
Repository of polls that stores data in a MongoDB database.
"""
#from PythonFlaskDatabase import app
from bson.objectid import ObjectId, InvalidId
from pymongo import MongoClient
import json


from . import Customer

def _customer_from_doc(docs):
    """Creates a customer object list from the MongoDB customer document."""
    customerList = []
    for doc in docs.find():
        customerList.append(Customer(doc))
    return customerList



class Repository(object):

    """MongoDB repository."""
    def __init__(self, settings):
        
        """Initializes the repository with the specified settings dict.
        Required settings are:
         - MONGODB_HOST
         - MONGODB_DATABASE
         - MONGODB_COLLECTION
        """
        self.name = 'MongoDB'
        self.host = settings['MONGODB_HOST']
        self.client = MongoClient(self.host)
        self.database = settings['MONGODB_DATABASE']
        self.collection = settings['MONGODB_COLLECTION']

    def get_customers(self):
        # Gets the customer data from database
        client = self.client			
        db = client[self.database]
        docs = db[self.collection]
        customerList = _customer_from_doc(docs)
        return customerList

    def add_customer(self, data):
        client = self.client			
        db = client[self.database]
        docs = db[self.collection]
        custId = docs.insert_one(data)
        return custId.inserted_id
    
    def delete_customer(self, data):
        client = self.client			
        db = client[self.database]
        docs = db[self.collection]

        deleteResult = docs.delete_one( {'_id': ObjectId( data.get("custId"))} )
       
        result = {
                    "acknowledged" : deleteResult.acknowledged,
                    "deleted_count" : deleteResult.deleted_count
                 }

        return result

    
    def edit_customer(self, data):
        client = self.client			
        db = client[self.database]
        docs = db[self.collection]

        myquery =   { 
                        "_id" : ObjectId(data.get("custId"))
                    }

        newValues = { 
                        "$set" :
                                {
                                    "first_name"	: data.get("first_name"),
                                    "last_name"	    : data.get("last_name"),
                                    "age"			: data.get("age"),
                                    "gender"		: data.get("gender"),
                                    "balance"		: data.get("balance"),
                                    "memberships"	: data.get("memberships"),
                                    "address"       : data.get("address")
                                }
                    }
        updateResult = docs.update_one(myquery,newValues)

        result = {
                    "matchedRecords" : updateResult.matched_count,
                    "modifiedCount" : updateResult.modified_count
                 }

        return result