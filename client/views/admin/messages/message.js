Template.message.helpers({
  submittedText: function() {
    return timeConverter(new Date(this.submitted));
  }
});

Template.message.events({
  'click .delete-message': function(event) {
	event.preventDefault();
	var del = confirm('Are you sure you want to delete this message?');
    if(del) {
      Meteor.call('removeMessage', this._id, function (error){
	    if(error){
	      throwError(error.reason);
	    }
	  });
    }
  }
});