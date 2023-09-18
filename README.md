# React App with Vite

this is an app using react and vanilla JS.

## Usage

To run the reactc app in you browser in dev mode, run:

```bash
npm run dev
```

# Flask server

In order to run python code in a react app, we need to host the python code on its own flask server.

## Features

This contains the parsing code, and the API implementation that the frontend can call to run the script on user-inputted code

## Usage

To use the flask server for development and debugging i believe you need to run these commands in the terminal for dependencies and whatnot:

```bash
pip3 install python-dotenv
pip3 install flask-cors
pip3 install Flask
source .venv/bin/activate
export FLASK_APP=server.py
flask run --debug
```

and in vite.config.js you might need to change the proxy to your own IP address

(updated)
