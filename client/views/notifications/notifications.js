Template.notifications.helpers({
  notifications: function() {
    return Notifications.find({read: false}, {sort: {submitted:-1}});
  },
  notificationCount: function(){
    return Notifications.find({read: false}).count();
  }
});

Template.notification.helpers({
  unixTime: function(){
      return this.submitted / 1000;
  },
  isComment: function() {
    if(this.type == 'comment')
    {
      return true
    }
    return false;
  },
  isMessage: function() {
    if(this.type == 'message')
    {
      return true
    }
    return false;
  }
});

Template.notification.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
});