"""
Repository of polls that stores data in a MongoDB database.
"""
from PythonFlaskDatabase import app
from bson.objectid import ObjectId, InvalidId
from pymongo import MongoClient

from . import Customer

client = MongoClient("mongodb://127.0.0.1:27017") #host uri
db = client.test #Select the database
todos = db.customers #Select the collection name


#def _customer_from_doc(doc):
#    """Creates a poll object from the MongoDB poll document."""
#    return Customer(str(doc['_id']), doc['text'])

#def _choice_from_doc(doc):
#    """Creates a choice object from the MongoDB choice subdocument."""
#    return Choice(str(doc['id']), doc['text'], doc['votes'])
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
        self.database = self.client[settings['MONGODB_DATABASE']]
        self.collection = self.database[settings['MONGODB_COLLECTION']]

    def get_customers(self):

        #myclient = pymongo.MongoClient("mongodb://127.0.0.1:27017")
        #mydb = myclient["test"]
        #mycol = mydb['customers']
        #test = self.collection.find()
        #return self.collection.find()
        return todos.find()
       