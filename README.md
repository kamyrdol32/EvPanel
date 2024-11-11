# EvPanel

This web application is a personal project aimed at acquiring new programming knowledge. Its sole functionality currently allows for managing resumes sent to different companies.


## Authors

| Author | Backend | Frontend |
| :---: | :---: | :---: |
| **Kamil Żegleń** ([kamyrdol32](https://github.com/kamyrdol32))  | 100% | 100% |

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
To run this project, you will need to add the following environment file on backend directory:

_**.env**_
```bash
SECRET_KEY=""
SQLALCHEMY_DATABASE_URI=""
JWT_SECRET_KEY=""
MAIL_USERNAME=""
MAIL_PASSWORD=""
```

and frontend directory:

**.env**
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
