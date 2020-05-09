class InvalidRequest(Exception):
  status = 500

  def __init__(self, payload=None):
    Exception.__init__(self)
    self.payload = payload

  def to_dict(self):
    fields = dict(self.payload or ())
    return {'error': fields, 'message': 'UNKNOWN_ERROR'}

class InvalidSchema(Exception):
  status = 400

  def __init__(self, payload=None):
    Exception.__init__(self)
    self.payload = payload

  def to_dict(self):
    fields = dict(self.payload or ())
    return {'fields': fields, 'message': 'REQUEST_SCHEMA_INVALID'}