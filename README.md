# EvPanel

This web application is a personal project aimed at acquiring new programming knowledge. Its sole functionality currently allows for managing resumes sent to different companies.


## Authors

| Author | Backend | Frontend |
| :---: | :---: | :---: |
| **Kamil Żegleń** ([kamyrdol32](https://github.com/kamyrdol32))  | ![100%](https://progress-bar.dev/100)  | ![100%](https://progress-bar.dev/100)  |

## Technologies used:
  - **Python**:
      - Flask,
      - Flask Mail,
      - Flask-JWT-Extended
      - Flask-SQLAlchemy
      - Flask-CORS
  - **JavaScript**:
      - React,
  - **SQL**
  - **HTML**
  - **CSS**:
    - Tailwindcss,

## Installation
### Requirements
  - **Docker & Docker Compose**
  
### Environment Variables
To run this project, you will need to add the following environment file on main directory:


**.env.backend**
```bash

# Project
PROJECT_NAME="EvPanel"
PROJECT_VERSION="0.1.0"
PROJECT_DESCRIPTION=""
PROJECT_AUTHOR="Kamil Żegleń"

# Poetry
POETRY_VERSION="1.4.0"

# Flask
TESTING=True
DEBUG=True
FLASK_ENV="development"
SECRET_KEY=""
JSON_SORT_KEYS=False

# SQLALCHEMY
SQLALCHEMY_DATABASE_URI=""
SQLALCHEMY_TRACK_MODIFICATIONS=False
SQLALCHEMY_POOL_SIZE=50000
SQLALCHEMY_MAX_OVERFLOW=50000

# JWT
JWT_SECRET_KEY=""
JWT_TOKEN_LOCATION=["cookies"]
JWT_COOKIE_CSRF_PROTECT=True
JWT_COOKIE_SECURE=False
JWT_ACCESS_TOKEN_EXPIRES=timedelta(minutes=15)

# CORS
CORS_HEADERS="Content-Type"

# Email
MAIL_SERVER="smtp.gmail.com"
MAIL_PORT=465
MAIL_USERNAME=""
MAIL_PASSWORD=""
MAIL_USE_TLS=False
MAIL_USE_SSL=True
MAIL_DEFAULT_SENDER=""
MAIL_DEBUG=True
MAIL_SUPPRESS_SEND=False
```

**.env.frontend**
```bash
VITE_I18NEXUS_API_KEY=""
```

### Instruction
To deploy this project run project

```bash
docker-compose up
```

## Demo:
<http://evpanel.kamilzeglen.pl/>
    
## Pictures:
### Login page
![Login page](https://i.imgur.com/5dPnLlI.png)
### Register page
![Register page](https://i.imgur.com/oOXUi2Y.png)
### Job page
![Job page](https://i.imgur.com/vLk1P79.png)
### Dark mode page
![Dark mode page](https://i.imgur.com/vqlpqWT.png)
