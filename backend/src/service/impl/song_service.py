from src.schemas.response import HTTPResponses, HttpResponseModel
from src.schemas.song import SongCreateModel
from src.db.__init__ import database as db
from src.service.impl.review_service import ReviewService


class SongService:
    @staticmethod
    def get_songs():
        songs = db.get_all_items('musicas')
        return songs
    @staticmethod
    def get_song(song_id: str):
        song = db.get_by_id('songs', song_id)
        print('*******************')
        print(song)
        print('*******************')
        return song


    @staticmethod
    def add_song(song: SongCreateModel):
        added_song = db.add('songs', song)
        # song['popularity'] = 0
        added_song = db.add('musicas', song)

        return added_song

    @staticmethod
    def edit_song(id: str, song: SongCreateModel):
        edited_song = db.edit('songs', id, song)
        print('*******************')
        print(edited_song)
        print('*******************')

        return edited_song

    @staticmethod
    def delete_song(id: str):
        deleted_song = db.delete('songs', id)

        return deleted_song

    @staticmethod
    def get_highlighted():
        highlighted = db.get_all_items('musicas')
        # higlhted is a list of dict
        # i want to sort this list by popularity
        for song in highlighted:
            song['id'] = str(song['_id'])
            del song['_id']
        highlighted.sort(key=lambda x: x['popularity'], reverse=True)[:10]
        print("!!!!!!!!!!!!!!!!!!!!!")
        print(highlighted)
        print("!!!!!!!!!!!!!!!!!!!!!")
        return highlighted
    
    @staticmethod
    def get_top_rated_songs(limit: int):
        reviews = ReviewService.get_reviews()
        
        grouped_reviews = {}
        for review in reviews:
            if review['song'] not in grouped_reviews:
                grouped_reviews[review['song']] = {'avg_rating': 0, 'count': 0}

            grouped_reviews[review['song']]['avg_rating'] += review['rating']
            grouped_reviews[review['song']]['count'] += 1

        for song in grouped_reviews:
            grouped_reviews[song]['avg_rating'] = grouped_reviews[song]['avg_rating'] / grouped_reviews[song]['count']

        # top_rated_songs = sorted(grouped_reviews, key=lambda x: x['avg_rating'], reverse=True)[:limit]
        top_rated_songs = sorted(grouped_reviews.items(), key=lambda x: x[1]['avg_rating'], reverse=True)[:limit]
        #top_song_names = [song[0] for song in top_rated_songs]
        result = [{"song": song[0], "average_rating": song[1]['avg_rating']} for song in top_rated_songs]
        print("***********************************")
        print(result)
        print("***********************************")

        return result
