from src.schemas.response import HTTPResponses, HttpResponseModel
from src.schemas.song import SongCreateModel
from src.db.__init__ import database as db


class SongService:
<<<<<<< HEAD

    @staticmethod
    def get_song(song_id: str):
        song = db.get_by_id('musicas', song_id)
=======
    @staticmethod
    def get_songs():
        songs = db.get_all_items('musicas')
        return songs
    @staticmethod
    def get_song(song_id: str):
        song = db.get_by_id('songs', song_id)
>>>>>>> main
        print('*******************')
        print(song)
        print('*******************')
        return song


    @staticmethod
    def add_song(song: SongCreateModel):
<<<<<<< HEAD
=======
        added_song = db.add('songs', song)
        # song['popularity'] = 0
>>>>>>> main
        added_song = db.add('musicas', song)

        return added_song

    @staticmethod
    def edit_song(id: str, song: SongCreateModel):
<<<<<<< HEAD
        edited_song = db.edit('musicas', id, song)
=======
        edited_song = db.edit('songs', id, song)
>>>>>>> main
        print('*******************')
        print(edited_song)
        print('*******************')

        return edited_song

    @staticmethod
    def delete_song(id: str):
<<<<<<< HEAD
        deleted_song = db.delete('musicas', id)

        return deleted_song
=======
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
>>>>>>> main
