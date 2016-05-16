import json
import operator

import requests

with open("userPicks.json") as f:
    users = json.load(f)

url = 'http://live.premierleague.com/syndicationdata/competitionId=8/seasonId=2015/matchDayId=38/league-table.json'

rsp = requests.get(url)

standings = rsp.json()['Data']
positions = {x['TeamCode']: x['Position'] for x in standings}

# order teams by most surprising

d = dict()
for u in users:
    for p in u['picks']:
        c = p['code']
        delta = abs(positions[c] - p['position'])
        d[c] = d.get(c, 0) + delta

s = sorted(d.items(), key=operator.itemgetter(1))

print("================")
print("total difference")
print("================")

for t, p in s:
    print(t + ": " + str(float(p)/12))


print("================")
print(" net difference ")
print("================")


d = dict()
for u in users:
    for p in u['picks']:
        c = p['code']
        delta = positions[c] - p['position']
        d[c] = d.get(c, 0) + delta

s = sorted(d.items(), key=operator.itemgetter(1))

for t, p in s:
    print(t + ": " + str(float(p)/12))
