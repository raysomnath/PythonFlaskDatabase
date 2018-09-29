"""
Package for the models.
"""

from os import path
import json

class Customer(object):
    """A Customer object for use in the application views and repository."""
    def __init__(self, key=u'', text=u''):
        """Initializes the poll."""
        self.key = key
        self.text = text
        #self.choices = []
        #self.total_votes = None
