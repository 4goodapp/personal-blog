Template.submitComment.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $author = $(e.target).find('[name=author]');
    var $email = $(e.target).find('[name=email]');
    var $body = $(e.target).find('[name=body]');    
    var comment = {
      author: $author.val(),
      email: $email.val(),
      body: $body.val(),
      postId: template.data._id
    };

    Meteor.call('addComment', comment, function(error, commentId) {
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