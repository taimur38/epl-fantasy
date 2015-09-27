from datetime import datetime
import json
import requests
from flask import Flask

app = Flask(__name__)

url_template = 'http://live.premierleague.com/syndicationdata/competitionId=8/seasonId=2015/matchDayId={matchDay}/league-table.json'
with open('schedule.json', 'r') as f:
    parsed = json.load(f)
    schedule = [datetime.strptime(date_string, '%d %B %Y') for date_string in parsed]


def get_current():
    current = datetime.now()
    for index, date in enumerate(schedule):
        if date > current:
            return index


@app.route('/api/table')
def table():
    week = get_current()
    rsp = requests.get(url_template.format(matchDay=week))
    return rsp.text



app.run(host='0.0.0.0', debug=True)
