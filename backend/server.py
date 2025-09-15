from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})
logging.basicConfig(level=logging.DEBUG)

client = MongoClient('mongodb://localhost:27017/')
db = client['casino']

# check if user has account, if so is password correct, otherwise create account
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    emailString = data['email']
    passwordString = data['password']
    user = db['login'].find({ 'email': emailString })
    if len(user) == 0:
        db['login'].insert_one({ 'email': emailString, 'password': passwordString })
        db['credits'].insert_one({ 'email': emailString, 'credits': 100})
        return jsonify(message='Account created'), 200
    else:
        if user[0]['password'] != passwordString:
            return jsonify(message='Wrong password'), 400
        else:
            return jsonify(message="Successful login"), 200

# get number of credits
@app.route('/getCredits', methods=['POST'])
def getCredits():
    data = request.json
    emailString = data['email']
    user = db['credits'].find({ 'email': emailString })
    if (len(user) > 0):
        return jsonify(user[0]['credits']), 200
    else:
        return jsonify(message='Could not find user'), 500
    
# set number of credits
@app.route('/setCredits', methods=['POST'])
def setCredits():
    data = request.json
    emailString = data['email']
    newCredits = data['credits']
    user = db['credits'].find({ 'email': emailString })
    if (len(user)) > 0:
        db['credits'].update_one({'email': emailString}, {'credits': newCredits}, upsert=True)
        return jsonify(message="Credits updated"), 200
    else:
        return jsonify(message='Issue updating credits'), 500


if __name__ == '__main__':
    app.run(debug=True)
