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
        """Creates all table in the database"""
        from models.user import User
        from models.review import Review
        from models.city import City
        from models.state import State
        from models.booking import Booking
        from models.instrument import Instrument
        from models.base_model import Base

        Base.metadata.create_all(self.__engine)

        session_factory = sessionmaker(bind=self.__engine, expire_on_commit=False)
        self.__session = scoped_session(session_factory)


    def allModels(self):
        """Returns all application models"""
        pass

    def all(self, obj=None):
        """Fetches all objects from the database"""
        from models.user import User
        from models.review import Review
        from models.city import City
        from models.state import State
        from models.booking import Booking
        from models.instrument import Instrument
        from models.base_model import Base

        objects = {}

        if obj:
            queryResult = self.__session.query(obj).all()
            for result in queryResult:
                key = "{}.{}".format(result.__class__.__name__, result.id)
                objects[key] = result
        else:
            for className in [User, State, Instrument]:
                queryResult = self.__session.query(className).all()
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

    def close(self):
        """Removes the current session"""
        self.__session.remove()
