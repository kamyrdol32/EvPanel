import json


def test_website_get(client, app):
    url = "/api/v1/website/get"
    response = client.get(url)
    assert response.status_code == 200

def test_website_refresh(client, app):
    url = "/api/v1/website/refresh"
    response = client.get(url)
    assert response.status_code == 200
