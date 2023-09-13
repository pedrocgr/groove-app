import pytest
from fastapi.testclient import TestClient
from typing import Generator
from src.main import app
from unittest.mock import patch


@pytest.fixture(autouse=True)
def db(mongodb):
    with patch("src.db.database", mongodb):
        yield


@pytest.fixture(scope="function")
def client() -> Generator:
    """
    Create a test client for the FastAPI app.
    """
    with TestClient(app) as c:
        yield c


@pytest.fixture
def context():
    """
    Variable to store context data between steps.
    Note: remember to always return the context variable at the end of the each steps.
    """
    b = {}
    yield b
