#!/bin/bash
set -e

cd /code
pip install -r requirements.txt
python -u server.py
