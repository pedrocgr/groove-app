from fastapi import APIRouter, status, HTTPException
from src.schemas.album import AlbumGet, AlbumModel, AlbumDelete
from starlette.responses import JSONResponse
from src.service.impl.search_service import FiltersService
from src.service.impl.song_service import SongService
from src.schemas.search import SearchModel
from bson.objectid import ObjectId

router = APIRouter()


@router.get(
    "/search",
    response_model=SearchModel,
    response_class=JSONResponse,
    summary="Get all albums or musics by filters",
)
def get_all(name: str = None, year: int = None, genre: str = None):

    if len(name) == 1:
        name = None
    if len(genre) == 1:
        genre = None
    if year == 199:
        year = None

    album_get_response = FiltersService.get_filters(name, year, genre)
    print('********************')
    print(album_get_response)
    print('********************')
    for song in album_get_response['songs']:
        reviews = SongService.get_reviews(song['id'])
        print('--------------------')
        print(song['id'])
        print(reviews)
        print('--------------------')
        total = 0
        for rate in reviews:
            total += rate['rating']
        if len(reviews) > 0:
            song['average_rating'] = total / len(reviews)
        else:
            song['average_rating'] = 0
    return album_get_response
