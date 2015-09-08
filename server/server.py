import requests
from flask import Flask

app = Flask(__name__)

url_template = 'http://live.premierleague.com/syndicationdata/competitionId=8/seasonId=2015/matchDayId=38/league-table.json'

@app.route('/api/table')
def table():
    rsp = requests.get(url_template)
    return rsp.text


app.run(host='0.0.0.0', debug=True)
