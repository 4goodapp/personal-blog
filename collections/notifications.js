Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  insert: function () {
    return false;
  },
  remove: function (){
      return false;    
  },
  update: function () {
    return true;
  }
});

removeMessageNotification = function (messageId) {
    var notification = Notifications.findOne({relatedItemId: messageId});
    if(notification) {
      Notifications.remove(notification._id);
    }
};

createCommentNotification = function(comment) {
    Notifications.insert({
      relatedItemId: comment.postId,
      type: 'comment',
      author: comment.author,
      submitted: new Date().getTime(),
      read: false
    });
};

createMessageNotification = function(message) {
    Notifications.insert({
      relatedItemId: message._id,
      type: 'message',
      author: message.author,
      submitted: new Date().getTime(),
      read: false
    });
};
