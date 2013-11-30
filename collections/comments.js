Comments = new Meteor.Collection('comments');

Meteor.methods({
  addComment: function(args) {
    var post = Posts.findOne(args.relatedItemId);
    if (!args.author)
      throw new Meteor.Error(401, "Please add your name.");

    if (args.author.length < 2)
      throw new Meteor.Error(401, "Please add a name with at least 2 characters.");    

    if (!args.email)
      throw new Meteor.Error(401, "Please add your email.");

    if(!validateEmail(args.email))
      throw new Meteor.Error(401, "Please add a valid email.");

    if (!args.body)
      throw new Meteor.Error(422, 'Please write a comment.');

    if (args.body.length < 2)
      throw new Meteor.Error(401, "Please write a comment of at least 2 characters."); 

    if (!args.postId)
    	throw new Meteor.Error(422, 'You must comment on a post.');

    comment = _.extend(_.pick(args, 'postId', 'author', 'email', 'body'), {
      submitted: new Date().getTime()
    });

    //update the post with the number of comments
	  Posts.update(comment.postId, {$inc: {commentsCount: 1}});

	  //create the comment, save the id
    comment._id = Comments.insert(comment);

    //now create a notification, informing the user that there's been a comment
    createCommentNotification(comment);

    return comment._id;
  },
  removeComment: function (commentId, postId) {
      var user = Meteor.user();
      if (!user){
            throw new Meteor.Error(401, "You need to login to remove a comment");
        }
      Comments.remove(commentId);
      Posts.update(postId, {$inc: {commentsCount: -1}});
    }

});