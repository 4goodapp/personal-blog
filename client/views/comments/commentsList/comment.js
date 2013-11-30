Template.comment.helpers({
  submittedText: function() {
    return timeConverter(new Date(this.submitted));
  }
});

Template.comment.events({
  'click .delete-comment': function(event) {
	event.preventDefault();
	var del = confirm('Are you sure you want to delete this comment?');
    if(del) {
      Meteor.call('removeComment', this._id, this.postId, function (error){
	    if(error){
	      throwError(error.reason);
	    }
	  });
    }
  }
});