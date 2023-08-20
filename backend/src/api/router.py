from fastapi import APIRouter
<<<<<<< HEAD
from src.api import items, reviews, songs
=======
from src.api import reviews, songs, albums
>>>>>>> main

api_router = APIRouter()
api_router.include_router(reviews.router, prefix="/reviews", tags=["reviews"])
api_router.include_router(songs.router, prefix="/songs", tags=["songs"])
<<<<<<< HEAD
=======
api_router.include_router(albums.router, prefix="/albums", tags=["albums"])
>>>>>>> main
