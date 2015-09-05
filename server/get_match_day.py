import json
import requests

with open('current_table_info.json') as f:
    curr_info = json.load(f)


url_template = 'http://live.premierleague.com/syndicationdata/competitionId=8/seasonId=2015/matchDayId={matchDay}/league-table.json'

rsp1 = requests.get(url_template.format(matchDay=curr_info['match_day']))
rsp2 = requests.get(url_template.format(matchDay=(curr_info['match_day'] + 1)))


if rsp1.text != rsp2.text:
    print('updating current match day to', cur_match)
    curr_info['match_day'] += 1
    curr_info['table'] = json.loads(rsp2.text)
    with open('current_table_info.json') as f:
        json.dump(curr_info, f)
