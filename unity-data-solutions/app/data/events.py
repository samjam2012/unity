import os
from pymongo import MongoClient
from app.utils import humanbytes

COLLECTION_NAME = 'unity'

class EventRepository(object):
  def __init__(self):
    uri = os.environ.get('MONGO_URI')
    self.db = MongoClient(uri).unity

  def find_all(self, selector):
    return self.db.events.find(selector)
 
  def find(self, selector):
    return self.db.events.find_one(selector)
 
  def create(self, event):
    return self.db.events.insert_one(event)

  def update(self, selector, event):
    return self.db.events.replace_one(selector, event).modified_count
 
  def delete(self, selector):
    return self.db.events.delete_one(selector).deleted_count

  def status(self):
    report = self.db.command('dbstats')
    server_status = self.db.command('serverStatus')
    events = self.db.command('collStats','events')
    
    opcounters = server_status['opcounters']
    
    parsedReport = {
      'ok': report['ok'],
      'database': str(report['db']),
      'collections': {
        'events': {
          'count': events['count'],
          'size': humanbytes(events['size'])
        }
      },
      'objects': report['objects'],
      'indexes': report['indexes'],
      'metrics': {
        'connections': server_status['connections'],
        'opcounters': {
          'insert': opcounters['insert'],
          'query': opcounters['query'],
          'update': opcounters['update'],
          'delete': opcounters['delete']
          },
        'usage': {
          'ratio': format(report['dataSize'] / report['storageSize'], ".2%"),
          'used': humanbytes(report['dataSize']),
          'total': humanbytes(report['storageSize'])
        }
      },
    }
    
    return parsedReport
    