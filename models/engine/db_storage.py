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
