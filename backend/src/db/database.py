from typing import List, Dict
from uuid import uuid4
from pymongo import MongoClient, errors
from pymongo.collection import Collection, IndexModel
from src.config.config import env
from typing import Dict

from logging import INFO, WARNING, getLogger
from bson.objectid import ObjectId
logger = getLogger('uvicorn')

class Database():

    ID_LENGTH = 8

    def __init__(self):
        self.db = None
        self.connect()

    def connect(self):
        try:
            mongo_connection = MongoClient(env.DB_URL)

            logger.setLevel(INFO)

            self.db = mongo_connection[env.DB_NAME]

            print("--------------------")
            logger.info("MongoDB connected!")
            logger.info(
                f"Server Version: {mongo_connection.server_info()['version']}")
            print("--------------------")

        except errors.ServerSelectionTimeoutError as err:

            mongo_connection = None
            logger.setLevel(WARNING)
            logger.info(f"MongoDB connection error! {err}")

    def close_connection(self):
        print("--------------------")
        logger.info("MongoDB connection closed!")
        print("--------------------")
        self.db.client.close()

    def get_db(self):
        return self.db

    def create_collection(
        self,
        name: str,
        indexes: List[IndexModel] = [],
        validation_schema: Dict = {}
    ) -> Collection:
        """
        Create a collection

        Parameters
        - name : str
            The name of the collection to create
        - indexes : List[IndexModel]
            The indexes to create in the collection
        - validation_schema : dict
            The validation schema used to validate data inserted into the
            collection. It should be a dictionary representing a JSON Schema

        Returns
        - pymongo.collection.Collection
            The created collection

        Raises
        - TypeError: If indexes is not a list of pymongo.IndexModel

        """

        collection_options = {"validator": {"$jsonSchema": validation_schema}}

        collection: Collection = self.db.create_collection(
            name,
            **collection_options
        )

        collection.create_indexes(indexes)

        logger.info(f"Collection {name} created!")

        return collection

    def drop_collection(self, name) -> bool:
        """
        Drop a collection

        Parameters
        - name : str
            The name of the collection to drop

        Returns
        - bool
            True if the collection was dropped successfully, False otherwise

        """

        if name in self.db.list_collection_names():
            self.db.drop_collection(name)
            logger.info(f"Collection {name} dropped!")
            return True

        return False

    def get_all_items(self, collection_name: str) -> list:
        """
        Get all items from a collection

        Parameters:
        - collection_name: str
            The name of the collection

        Returns:
        - list
            A list of all items in the collection

        """

        collection: Collection = self.db[collection_name]

        items = list(collection.find())
        for itm in items:
            itm["id"] = str(itm["_id"])
        print(items)
        return items

    def get_by_name(self, collection_name: str, item_name: str) -> dict:
        """
        Retrieve an item by its ID from a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item will be stored
        - item_id: str
            The ID of the item to retrieve

        Returns:
        - dict or None:
            The item if found, None otherwise

        """
        collection: Collection = self.db[collection_name]

        item = collection.find_one({"title": str(item_name)}, {"_id": 0})
        return item

    def get_item_by_id(self, collection_name: str, item_id: str) -> dict:
        """
        Retrieve an item by its ID from a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item will be stored
        - item_id: str
            The ID of the item to retrieve

        Returns:
        - dict or None:
            The item if found, None otherwise

        """
        collection: Collection = self.db[collection_name]

        item = collection.find_one({"id": str(item_id)}, {"_id": 0})
        return item

    def insert_item(self, collection_name: str, item: dict) -> dict:
        """
        Insert an item into a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item will be stored
        - item: dict
            The item to insert

        Returns:
        - dict:
            The inserted item

        """
        # TODO: test if this method works

        item["id"] = str(uuid4())[:self.ID_LENGTH]

        collection: Collection = self.db[collection_name]

        item_id = collection.insert_one(item).inserted_id
        return {
            "id": str(item_id),
            **item
        }

    def get_by_id(self, collection_name: str, item_id: str) -> dict:
        """
        Retrieve an item by its ID from a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item will be stored
        - item_id: str
            The ID of the item to retrieve

        Returns:
        - dict or None:
            The item if found, None otherwise

        """
        collection: Collection = self.db[collection_name]
        print("------------")
        print(collection)
        print(item_id)
        item_id = ObjectId(item_id)
        print("------------")
        # Convert the item_id to ObjectId
        # object_id = ObjectId(item_id)
        item = collection.find_one({"_id": item_id})
        # del item["_id"] 
        return item

    def add(self, collection_name: str, item: dict) -> dict:
        """
        Insert an item into a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item will be stored
        - item: dict
            The item to insert

        Returns:
        - dict:
            The inserted item

        """

        collection: Collection = self.db[collection_name]
        print("------------")
        item = dict(item)
        print(collection)
        print(item)
        print("------------")
        item_id = collection.insert_one(item).inserted_id
        item["_id"] = str(item["_id"])
        return {
            "id": str(item_id),
            **item
        }

    def edit(self, collection_name: str, item_id: str, item: dict) -> dict:
        collection: Collection = self.db[collection_name]

        print("------------")
        print(collection)
        print(item_id)
        print(item)
        print("------------")

        # Convert the item to a dictionary if it's an instance of SongCreateModel
        # if isinstance(item, SongCreateModel):
        item = dict(item)

        item_id = collection.update_one({"_id": item_id}, {"$set": item})

        # item["_id"] = str(item["_id"])

        return {
            **item
        }

    def delete(self, collection_name: str, item_id: str) -> dict:
        collection: Collection = self.db[collection_name]

        print("------------")
        print(collection)
        print(item_id)
        print("------------")

        item = collection.delete_one({"title": item_id})
        if item.deleted_count == 0:
            return {
                "id": None
            }

        return {
            'id': item_id
        }

    # TODO: implement update_item method
    # def update_item(self, collection_name: str, item_id: str, item: dict) -> dict:
        """
        Update an item in a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item is stored
        - item_id: str
            The ID of the item to update
        - item: dict
            New item data

        Returns:
        - dict:
            The updated item

        """

    # TODO: implement delete_item method
    # def delete_item(self, collection_name: str, item_id: str) -> list:
        """
        Delete an item of a collection

        Parameters:
        - collection_name: str
            The name of the collection where the item is stored
        - item_id: str
            The ID of the item to delete

        Returns:
        - list:
            A list of all items in the collection.

        """

    def get_reviews_by_song_id(self, song_id: str) -> list:
        """
        Get all reviews of a song

        Parameters:
        - song_id: str
            The ID of the song

        Returns:
        - list:
            A list of all reviews of the song

        """

        reviews = self.db.get_all_items('reviews')

        return [review for review in reviews if review['song_id'] == song_id]
    def get_available_on_for_song(self, song_id: str) -> Dict[str, str]:
        """
        Retrieve music links for a song

        Parameters:
        - song_id: str
            The ID of the song for which to retrieve the music links

        Returns:
        - dict:
            A dictionary containing music links for the song

        """

        # Simulate fetching music links for the song
        # Replace these with your actual logic to fetch the links from the database
        song_links = {
            "Spotify": f"https://spotify.com/song/{song_id}",
            "Apple Music": f"https://apple.com/song/{song_id}",
        }

        return song_links
    

    def get_top_rated_songs(self, collection_name: str, limit: int = 5):
        """Fetch top-rated songs ordered by their average rating."""
        print("get_top_rated_songs")
        collection: Collection = self.db['reviews']
        all_reviews = list(collection.find({}, {"_id": 0}))
        print(all_reviews)

        return result
