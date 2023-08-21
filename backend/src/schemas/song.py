from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class SongModel(BaseModel):
    id: str
    title: str
    genre: str
    artist: str
    release_year: int
    popularity: int

class SongGet(BaseModel):
    id: str
    title: str
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
    songs: list[SongGet]      # Mudando de musics para songs

class SongDelete(BaseModel):
    id: str
    
class SongDelete(BaseModel):
    id: str

class SongTopRated(BaseModel):
    song: str
    average_rating: float
    
class GetSongsTopRated(BaseModel):
    songs: list[SongTopRated]
