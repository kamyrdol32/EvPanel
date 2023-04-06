import os

import pytest

from backend.src.app import app as current_app


@pytest.fixture
def app():
    app = current_app()

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("SQLALCHEMY_DATABASE_URI")

    return app
