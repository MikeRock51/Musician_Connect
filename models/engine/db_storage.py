#!/usr/bin/python3
"""The application db storage module"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from os import getenv


class DBStorage:
    """Defines the storage class"""
    __engine = None
    __session = None

    def __init__(self):
        user = getenv('MCC_SQL_USER')
        host = getenv('MCC_SQL_HOST')
        pwd = getenv('MCC_SQL_PWD')
        db = getenv('MCC_SQL_DB')
        self.__engine = create_engine(
            "mysql+mysqldb://{}:{}@{}/{}"
            .format(user, pwd, host, db), pool_pre_ping=True)

    def reload(self):
        """Creates all table in the database and establishes a new session"""
        allModels = self.allModels() # Import models
        from models.base_model import Base

        # Creates all tables defined in Base if they don't yet exist
        Base.metadata.create_all(self.__engine)

        # Start a database session
        session_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        # Create a scoped session to prevent interference between sessions
        self.__session = scoped_session(session_factory)

    def allModels(self):
        """Imports and returns all application models"""
        from models.user import User, musicianInstruments
        from models.review import Review
        from models.city import City
        from models.state import State
        from models.booking import Booking
        from models.instrument import Instrument

        return {
                'User': User,
                'Review': Review,
                'City': City,
                'State': State,
                'Booking': Booking,
                'Instrument': Instrument,
                }

    def all(self, obj=None):
        """Fetches all objects from the database"""
        classes = self.allModels() # Import models
        
        objects = {}

        # Retrive objects of type obj if obj is not None
        if obj:
            if obj in [classes['Instrument'], classes['State']]:
                # If Instrument or State is requested, sort by name
                queryResult = self.__session.query(obj).order_by(obj.name).all()
            elif obj == classes['User']:
                # If User is requested, sort by firstName
                queryResult = self.__session.query(obj).order_by(obj.firstName).all()
            else:
                # When objects that don't require sorting is requested
                queryResult = self.__session.query(obj).all()
            # Save each object from query result in objects with <className.id> as key
            for result in queryResult:
                key = "{}.{}".format(result.__class__.__name__, result.id)
                objects[key] = result
        else:
            # If no object type was specified, retrieve all objects from database
            for className in classes.values():
                queryResult = self.__session.query(className).all()
                # For every object type, save each object from query result
                # in objects with <className.id> as key
                for result in queryResult:
                    key = "{}.{}".format(result.__class__.__name__, result.id)
                    objects[key] = result

        return objects

    def new(self, obj):
        """Adds obj to the current session"""
        self.__session.add(obj)

    def save(self):
        """Commits all changes to the current database session"""
        self.__session.commit()


    def delete(self, obj=None):
        """Deletes obj from the current database session"""
        if obj:
            self.__session.delete(obj)
            self.save()

    def get(self, cls, id):
        """Returns an instance of the object with given id"""
        classes = self.allModels() # Import all models

        # Check if cls is not a supported type
        if cls not in classes.values():
            return None

        # Retrieve all instances of cls
        allInstances = self.all(cls)
        # Filter and return the requested instance
        for instance in allInstances.values():
            if instance.id == id:
                return instance

    def getEmailUser(self, email):
        """Returns an instance of the user with the given email"""
        User = self.allModels()['User'] # Import User model

        # Retrieve all users
        users = self.all(User)
        # Filter and return the user with the requested email
        for user in users.values():
            if user.email == email:
                return user

    def count(self, cls):
        """Returns the number of instances of an object in storage"""
        classes = self.allModels() # Import all models

        # Check if cls is not a supported type
        if cls not in classes.values():
            return None

        return len(self.all(cls)) 

    def close(self):
        """Removes the current session"""
        self.__session.remove()
