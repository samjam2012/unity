from werkzeug.exceptions import HTTPException
from flask import json, request
from app import app
from app.utils.middleware import InvalidSchema
from app.api.events import EventService

@app.route("/", methods=["GET"])
def index():
  return "Event service is up"

@app.route("/ping", methods=["GET"])
def ping():
  stats = EventService().health_check()
  return res(stats)

@app.route("/events", methods=['POST'])
# @type_validator
def insert():
  raw_event_json = json.loads(request.data)

  event = EventService().create_event(raw_event_json)
  
  return res(event)

@app.route("/events/range", methods=['POST'])
def get_type_in_range():
  raw_event_json = json.loads(request.data)
    
  events = EventService().find_event_type(raw_event_json)
  
  return res(events)

@app.route("/events/usage", methods=['GET'])
def get_usage():    
  usage_object = EventService().report_usage()

  return res(usage_object)

@app.errorhandler(HTTPException)
def handle_exception(error):
  return error

@app.errorhandler(InvalidSchema)
def handle_invalid_request(error):
  response = error.to_dict()
  return res(response, error.status)

def res(payload, status=200):
    return (json.dumps(payload), status, {'content-type': 'application/json'})