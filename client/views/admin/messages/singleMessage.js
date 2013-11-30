Template.singleMessage.helpers({
  message: function() {
    var messageId = Session.get('currentMessageId');
    var message = Messages.findOne(messageId);
    return message;
  },
  submittedText: function() {
    var messageId = Session.get('currentMessageId');
    var message = Messages.findOne(messageId);
    return timeConverter(new Date(message.submitted));
  }
});

Template.singleMessage.events({
  'click .delete-message': function(event) {
	event.preventDefault();
	var del = confirm('Are you sure you want to delete this message?');
    if(del) {
      Meteor.call('removeMessage', Session.get('currentMessageId'), function (error){
	    if(error){
	      throwError(error.reason);
	    }
      Router.go('/');
	  });
    }
  }
});