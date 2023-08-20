from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class SongModel(BaseModel):
<<<<<<< HEAD
=======
    id: str
>>>>>>> main
    title: str
    genre: str
    artist: str
    release_year: int
    popularity: int

class SongGet(BaseModel):
<<<<<<< HEAD
    name: str
=======
    id: str
    title: str
>>>>>>> main
    genre: str
    artist: str
    release_year: int
    popularity: int

class SongCreateModel(BaseModel):
    id: str
    title: str
    genre: str
    artist: str
    release_year: int
    popularity: int

class SongList(BaseModel):
<<<<<<< HEAD
    songs: list[SongGet]      # Mudando de musics para songs

class SongDelete(BaseModel):
    id: str
    
class SongNameList(BaseModel):
    songs: list[str]            # Mudando de musics para songs
=======
    songs: list[SongGet]

class SongDelete(BaseModel):
    id: str
>>>>>>> main
