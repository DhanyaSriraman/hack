from email import header
from flask import Flask, request, render_template
from flask_cors import CORS, cross_origin

import os



TEMPLATES_AUTO_RELOAD = True
use_reloader=True
app = Flask(__name__,static_folder="D:/shna/build",static_url_path='/')
app.debug = True
app.config["DEBUG"] = True
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config.update(
    TEMPLATES_AUTO_RELOAD=True
)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'



@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/')
def index():
    return app.send_static_file('index.html')

# def calculate_jaccard_similarity(query, sentence):
#     query_tokens = set(nltk.word_tokenize(query.lower()))
#     sentence_tokens = set(nltk.word_tokenize(sentence.lower()))
#     intersection = query_tokens.intersection(sentence_tokens)
#     union = query_tokens.union(sentence_tokens)
#     return len(intersection) / len(union)
@app.route("/api", methods=['POST'])
@cross_origin()
def get_bot_response():
    
    print("in bot")
# Encode 'Law' column
    data = request.get_json() 
    query = data.get('msg', '')  # Extract the JSON data from the request body
    return query

if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)
