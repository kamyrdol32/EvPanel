import os


def test_production_config(app):
    app.config.from_object("backend.src.config.ProductionConfig")
    assert not app.config["DEBUG"]
    assert not app.config["TESTING"]
    assert app.config["SQLALCHEMY_DATABASE_URI"] == os.environ.get(
        "SQLALCHEMY_DATABASE_URI"
    )


def test_development_config(app):
    app.config.from_object("backend.src.config.DevelopmentConfig")
    assert app.config["DEBUG"]
    assert app.config["TESTING"]
    assert app.config["SQLALCHEMY_DATABASE_URI"] == os.environ.get(
        "SQLALCHEMY_DATABASE_URI"
    )


def test_testing_config(app):
    app.config.from_object("backend.src.config.TestingConfig")
    assert app.config["DEBUG"]
    assert app.config["TESTING"]
