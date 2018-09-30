"""
Repository of polls that stores data in a MongoDB database.
"""
#from PythonFlaskDatabase import app
from bson.objectid import ObjectId, InvalidId
from pymongo import MongoClient

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
        #return docs.find()       
        return customerList