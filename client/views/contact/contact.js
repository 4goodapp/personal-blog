Template.contact.rendered = function() {
	$('.navbar li.active').removeClass('active');
	$('.navbar li.contact').addClass('active');
  $('#author').focus();
}

Template.contact.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $author = $(e.target).find('[name=author]');
    var $email = $(e.target).find('[name=email]');
    var $body = $(e.target).find('[name=body]');    
    var message = {
      author: $author.val(),
      email: $email.val(),
      body: $body.val()
    };

    Meteor.call('addMessage', message, function(error, messageId) {
      if (error){
        throwError(error.reason);
      } 
      else {
        $author.val('');
        $email.val('');
        $body.val('');
      }
    });
  }
});