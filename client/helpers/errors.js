// Local (client-only) collection
Errors = new Meteor.Collection(null);

throwError = function(message) {
	Session.set('errorsClear', false);
	Errors.insert({message: message, seen: false})
	$('html, body').animate({
	  scrollTop: 0
	}, 300);
}

clearErrors = function() {
    Errors.remove({seen: true});
}

clearAllErrors = function() {
	Session.set('errorsClear', true);
	Errors.remove();
}
