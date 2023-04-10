import pytest

from ..src import create_app, db


@pytest.fixture()
def app():
    app = create_app("Testing")

    # other setup can go here

    with app.app_context():
        db.create_all()
        yield app

        # clean up / reset resources here

        db.drop_all()


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def runner(app):
    return app.test_cli_runner()
