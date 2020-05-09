from marshmallow.exceptions import ValidationError

from unity.middleware import InvalidSchema
from unity.data import Repository
from unity.data.events import EventRepository
from unity.data.schema import EventSchema


class EventService(object):
  def __init__(self, event_client=Repository(adapter=EventRepository)):
    self.event_client = event_client

  def find_events(self, data):
      events  = self.event_client.find_all()
      return events

  def find_event_type(self, data):
    floor_time = data['floor_time']
    event_type = data['event_type']
    print(event_type)
    events  = self.event_client.find_all({'event_type': event_type})
    return [self.dump(event) for event in events]

  def report_usage(self):
    logins = self.event_client.find_all({'event_type': 'LOGIN'})
    creates  = self.event_client.find_all({'event_type': 'USER_CREATE'})
    
    usage = dict()
    usage['logins'] = [self.dump(login) for login in logins]
    usage['creates'] = [self.dump(create) for create in creates]
    
    return usage

  def create_event(self, event_object):
    event = self.load(event_object)

    self.event_client.create(event)
    
    return self.dump(event)
  
  # Utils
  def load(self, data):
    try:
      return EventSchema().load(data)
    except ValidationError as err:
      raise InvalidSchema(err.messages)
      
  def dump(self, data):
    return EventSchema().dump(data)
  
  def health_check(self):
    return self.event_client.status()