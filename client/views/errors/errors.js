Template.errors.helpers({
  errors: function() {
  	if(Session.get('errorsClear') != null && Session.get('errorsClear') == true) {
  		return null;
  	}
    return Errors.find();
  }
});

Template.error.rendered = function() {
  var error = this.data;
  Meteor.defer(function() {
    Errors.update(error._id, {$set: {seen: true}});
  });
};