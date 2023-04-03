from flask import jsonify
from flask_openapi3 import APIBlueprint

from ..app import db
from ..models import Websites

websites_blueprint = APIBlueprint("website", __name__, url_prefix="/website")


@websites_blueprint.get("/get")
def get_websites():

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


def check_websites(requests=None):
    websites = Websites.query.all()
    for website in websites:
        try:
            requests.get(website.endpoint)
            website.status = "Online"
        except:
            website.status = "Offline"

        db.session.commit()