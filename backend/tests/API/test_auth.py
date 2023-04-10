import json


def test_register_user(client, app):
    response = client.post(
        "/api/v1/auth/user/register",
        data=json.dumps(
            dict(
                email="test@test.pl",
                username="test",
                password="123456",
                confirmPassword="123456",
            )
        ),
        content_type="application/json",
    )
    data = json.loads(response.data.decode())
    assert response.status_code == 200


# def test_login_user(client):
#     url = "/api/v1/auth/user/login"
#     params = {
#         "email": "test@test.pl",
#         "password": "123456",
#     }
#     response = client.get(url)
#     print(response.data)
#     assert response.status_code == 200


def test_logout_user(client):
    url = "/api/v1/auth/logout"
    response = client.get(url)
    assert response.status_code == 200
