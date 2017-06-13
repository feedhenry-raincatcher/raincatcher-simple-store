const Topics = require('fh-wfm-mediator/lib/topics');
module.exports = function decorate(Class) {
  Class.prototype.listen = function(topicPrefix, mediator) {
    this.topics = new Topics(mediator);
    this.mediator = mediator;
    this.topics
      .prefix('wfm' + topicPrefix)
      .entity(this.datasetId)
      .on('create', this.create.bind(this))
      .on('read', this.read.bind(this))
      .on('update', this.update.bind(this))
      .on('delete', this.delete.bind(this))
      .on('list', this.list.bind(this));
  };

  Class.prototype.unsubscribe = function() {
    this.topics.unsubscribeAll();
  };
};