import requests

from flask import jsonify, request
from flask_cors import cross_origin
from flask_openapi3 import APIBlueprint

from ..app import db
from ..models import Websites

websites_blueprint = APIBlueprint("website", __name__, url_prefix="/website")


@websites_blueprint.get("/get")
@cross_origin()
def get_websites():
    refresh_websites()
    websites = Websites.query.all()
    Data = []

    for website in websites:
        Data.append(
            {
                "id": website.id,
                "name": website.name,
                "url": website.url,
                "status": website.status,
            }
        )

    return jsonify(Data), 200


def refresh_websites():
    print("Refresing websites")
    website = Websites.query.all()
    Data = []

    for website in website:
        try:
            if website.endpoint == 'localhost':
                website.status = "Online"
                print("Online " + str(website.name))
            if website.endpoint:
                response = requests.get(website.endpoint)
                if response.status_code == 200:
                    website.status = "Online"
                    print("Online " + str(website.name))
                else:
                    website.status = response.status_code
                    print("Offline " + str(website.name))

            else:
                website.status = "Unknown"

        except Exception as error:
            website.status = error
            print(error)

        db.session.add(website)
        db.session.commit()

    return True