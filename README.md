# Introduction

Odin backend and frontend restoration to show map with sar image overlay and lighthouse location/ ship location on map.

![odin](https://user-images.githubusercontent.com/46402033/226178529-63302bf7-e9b1-401c-8c4f-e4732a8891ec.png)

# Installation
The project uses mapbox-gl so in order to access the map you need your access token.
Please visit https://account.mapbox.com/ and register to creat a token.

Use the token as environment variable in odin-ui. 
```
cd odin-ui
```
Find the .env file and paste the token in env variable REACT_APP_API_KEY. Also, make sure the port for backend is correct.
Point REACT_APP_BACKEND_URL to correct url where odin-api is running.

The frontend server is a Node project using typescript and React. It needs node (v18) installed and can be run with

```
cd odin-ui
npm install
npm start
```

The backend is a python FastAPI backend. It needs an empty python 3.11 environment (like conda, pyenv or poetry) and can be set up and started with

```
cd odin-api
pip install -r requirements.txt
uvicorn main:app --reload
```

# Production deployment plan
The application can be deployed in ubuntu/linux server in following ways.
## Serving front end (odin-ui)

Build the project using 
```
npm run build
```
Install nginx in the server.
```
apt-get install nginx
```
Copy the build to the location from where the static files are served in nginx (/etc/nginx/sites-available/)

## Serving backend (odin-api)
Backend can be run in server using simple docker container.
Example dockerfile:
```
FROM python:3.11.1-slim
RUN mkdir /app
WORKDIR /app
ADD . /app/
COPY requirements.txt .
RUN pip install -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```
Build docker image:
```
docker build -t odin .
```
Run docker image:
```
docker run --name=odin-api -d -p 8000:8000 odin
```
