class Repository(object):
  def __init__(self, adapter=None):
    self.client = adapter()

  def find_all(self, selector):
    return self.client.find_all(selector)
  
  def find(self, selector):
    return self.client.find(selector)
  
  def create(self, event):
    return self.client.create(event)
    
  def update(self, selector, event):
    return self.client.update(selector, event)
    
  def delete(self, selector):
    return self.client.delete(selector)
  
  def status(self):
    return self.client.status()