Template.adminPostItem.helpers({
  submittedText: function() {
    return timeConverter(new Date(this.submitted));
  }
});

Template.adminPosts.events({
  'click .delete-post': function(event) {
	event.preventDefault();
	var del = confirm('Are you sure you want to delete this post?');
    if(del) {
      Meteor.call('removePost', this._id, function (error){
	    if(error){
	      throwError(error.reason);
	    }
	  });
    }
  }
});