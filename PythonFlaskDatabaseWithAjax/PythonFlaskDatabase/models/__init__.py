"""
Package for the models.
"""

from os import path
import json

class Customer(object):
    """A Customer object for use in the application views and repository."""
    def __init__(self, dict):
        """Initializes the customers object."""
        self.customerId = str(dict["_id"])
        if 'first_name' in dict:
            self.firstname = dict["first_name"]
        else:
            self.firstname = ""
        if 'last_name' in dict:
            self.lastname = dict["last_name"]
        else:
            self.lastname = ""
        if 'gender' in dict:
            self.gender = dict["gender"]
        else:
             self.gender = ""
        if 'age' in dict:
            self.age = int(dict["age"])
        else:
            self.age = None

        if 'address' in dict:
            if 'street' in dict['address']:
                self.street = dict['address']["street"]
            else:
                self.street = ""
            if 'city' in dict['address']:
                self.city = dict['address']["city"]
            else:
                self.city = ""
            if 'state' in dict['address']:
                self.state = dict['address']["state"]
            else:
                self.state = ""
        else:
            self.street = ""
            self.city = ""
            self.state = ""

        if 'balance' in dict:
            self.balance = '${:.2f}'.format(dict["balance"])
        else:
            self.balance = None

        if 'memberships' in dict:
            self.memberships = ""
            if(len(dict["memberships"]) > 1):
                for i, mem in enumerate(dict["memberships"]):
                    if i:
                       self.memberships += ", " + mem
                    else:
                        self.memberships += mem
            else:
                self.memberships = dict["memberships"][0]
        else:
            self.memberships = ""

   