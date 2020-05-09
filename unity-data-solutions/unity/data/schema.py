from marshmallow import Schema, fields, validate, pre_load, post_dump
from stringcase import camelcase, snakecase

class EventSchema(Schema):
  # TODO: add date formatter to Marshmallow to inject timezone (ends at ...Z currently)
  DATETIME_FORMAT = '%Y-%m-%dT%H:%M:%S'
  
  _id = fields.Str()
  event_type = fields.Str(validate=validate.OneOf(["USER_CREATE", "LOGIN"]))
  event_body = fields.Dict()
  date_time = fields.DateTime()
  
  @pre_load
  def to_snakecase(self, data, **kwargs):
    snake_case_object = dict()
    
    for key, value in data.items():  
      if isinstance(value, dict):
        value = {snakecase(sub_key): sub_val for sub_key, sub_val in value.items() }
        
      snake_case_object[snakecase(key)] = value

    return snake_case_object
        
    
  @post_dump
  def to_camelcase(self, data, **kwargs):
    camel_case_object = dict()
    
    for key, value in data.items():  
      if isinstance(value, dict):
        value = {camelcase(sub_key): sub_val for sub_key, sub_val in value.items() }
        
      camel_case_object[camelcase(key)] = value

    return camel_case_object