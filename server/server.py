import json

from flask import Flask, request
import requests

app = Flask(__name__)


@app.route('/api/table')
def table():
    with open('current_table_info.json') as f:
        curr_table_info = json.load(f)

    return json.dumps(curr_table_info['table'])


app.run(host='0.0.0.0', port=8080, debug=True)
