from fastapi.testclient import TestClient
from src.db import database as db
from datetime import datetime, timezone
from unittest.mock import patch, MagicMock
from src.service.impl.song_service import SongService
from src.service.impl.review_service import ReviewService
from src.main import app

def test_get_song(client: TestClient):
    with patch.object(db, "get_all_items") as mock_get_all_items:
        mock_get_all_items.return_value = [
            {
                "id": "teste",
                "title": "Test Song",
                "genre": "Pop",
                "artist": "Test Artist",
                "release_year": 2023,
                "popularity": 10,
            }
        ]

        response = client.get("/songs")

    assert response.status_code == 200
    assert response.json() == { 'songs': [   
            {
                "id": "teste",
                "title": "Test Song",
                "genre": "Pop",
                "artist": "Test Artist",
                "release_year": 2023,
                "popularity": 10,
            }, 
        ]
    }
def test_get_song_by_id(client: TestClient):
    song_id = 1
    with patch.object(db, "get_item_by_id") as mock_get_item_by_id:
        # Mock the response from the database
        mock_get_item_by_id.return_value = {
            "id": song_id,
            "title": "Test Song",
            "artist": "Test Artist",
            "release_year": 2023,
            "gender": "Pop",
            "available_on": {
                "Spotify": "https://spotify.com/test",
                "Apple Music": "https://apple.com/test",
            },
            "timestamp": datetime(2023, 8, 15, 12, 0, 0, tzinfo=timezone.utc),
        }

        # Mock the available_on links for the song
        with patch.object(db, "get_available_on_for_song") as mock_get_available_on:
            mock_get_available_on.return_value = {
                "Spotify": "https://spotify.com/test",
                "Apple Music": "https://apple.com/test",
            }

            response = client.get(f"/songs/{song_id}")

    assert response.status_code == 200
    assert response.json() == {
        "id": song_id,
        "title": "Test Song",
        "artist": "Test Artist",
        "release_year": 2023,
        "gender": "Pop",
        "available_on": {
            "Spotify": "https://spotify.com/test",
            "Apple Music": "https://apple.com/test",
        },
        "timestamp": "2023-08-15T12:00:00Z",
    }
    
"""     
def test_get_top_rated_songs(client: TestClient):
    # Iremos supor que temos 5 músicas no banco de dados, cada uma com uma avaliação média.
    mock_top_rated_songs = ["Song1", "Song2", "Song3", "Song4", "Song5"]

    with patch.object(db, "get_top_rated_songs") as mock_get_top_rated:
        # A função mock retornará a lista de músicas mais bem avaliadas.
        mock_get_top_rated.return_value = mock_top_rated_songs

        # Iremos realizar a requisição para a rota que retorna as músicas mais bem avaliadas.
        response = client.get("songs/songs/top-rated")

    # Print debugging information
    print(f"Response Status: {response.status_code}")
    print(f"Response Content: {response.content.decode('utf-8')}")

    # Verificamos se a resposta está correta.
    assert response.status_code == 200
    assert response.json() == mock_top_rated_songs """
    
    
""" def test_get_top_rated_songs_from_reviews(client: TestClient):
    # Mock data: reviews for three songs with their ratings.
    mock_reviews = [
        {"song": "Song1", "rating": 4},
        {"song": "Song1", "rating": 5},
        {"song": "Song1", "rating": 4},
        {"song": "Song2", "rating": 5},
        {"song": "Song2", "rating": 5},
        {"song": "Song2", "rating": 4},
        {"song": "Song3", "rating": 1},
        {"song": "Song3", "rating": 2}
    ]

    # Expected top-rated songs ordered by their average rating (based on the above reviews).
    expected_top_rated_songs = ["Song2", "Song1", "Song3"]

    with patch.object(db, "get_top_rated_songs") as mock_get_top_rated:
        # The mock database will return the top-rated songs based on the reviews
        mock_get_top_rated.return_value = expected_top_rated_songs

        # We request the top-rated songs.
        response = client.get("songs/songs/top-rated")

        # Validate the response
        assert response.status_code == 200
        assert response.json() == expected_top_rated_songs """

def test_get_top_rated_songs(client: TestClient):
    # Mock data for reviews
    mock_reviews = [
        {
            "title": "Review 1",
            "description": "Description 1",
            "rating": 5,
            "author": "Author 1",
            "song": "Song 1",
        },
        {
            "title": "Review 2",
            "description": "Description 2",
            "rating": 4,
            "author": "Author 2",
            "song": "Song 1",
        },
        {
            "title": "Review 3",
            "description": "Description 3",
            "rating": 3,
            "author": "Author 3",
            "song": "Song 2",
        },
    ]

    # Mock expected top-rated songs based on the mock_reviews
    expected_top_rated_songs = [
        {"song": "Song 1", "average_rating": 4.5},
        {"song": "Song 2", "average_rating": 3}
    ]
    client = TestClient(app)
    ReviewService.get_reviews = MagicMock(return_value=mock_reviews)  # Patch the method used to fetch reviews
    # Patch the method used to fetch reviews (assuming `get_all_items` fetches reviews)
        
    # Making a request to the API endpoint that fetches top rated songs
    response = client.get("songs/songs_r/top-rated")

    # Assert that the response status is 200 (OK) and the returned data matches the expected top rated songs
    print(response.json())
    print("-----------------------------------------")
    assert response.status_code == 200
    assert response.json() == {'songs': expected_top_rated_songs}
