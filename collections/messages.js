Messages = new Meteor.Collection('messages');

Messages.allow({
  insert: function () {
    return false;
	},
	remove: function (){
	    return false;    
	},
	update: function() {
	    return false;    
	}
}); 

Meteor.methods({
  addMessage: function(args) {
    if (!args.author)
      throw new Meteor.Error(401, "Please add your name.");

    if (args.author.length < 2)
      throw new Meteor.Error(401, "Please add a name with at least 2 characters.");    

    if (!args.email)
      throw new Meteor.Error(401, "Please add your email.");

    if(!validateEmail(args.email))
      throw new Meteor.Error(401, "Please add a valid email.");

    if (!args.body)
      throw new Meteor.Error(422, 'Please write a message.');

    if (args.body.length < 10)
      throw new Meteor.Error(401, "Please write a message of at least 10 characters."); 


    message = _.extend(_.pick(args, 'author', 'email', 'body'), {
      submitted: new Date().getTime()
    });

	//create the message, save the id
    message._id = Messages.insert(message);

    //now create a notification, informing the user that there is a new message
    createMessageNotification(message);

    return message._id;
  },
  removeMessage: function (messageId) {
      var user = Meteor.user();
      if (!user){
            throw new Meteor.Error(401, "You need to login to remove a message");
        }
      Messages.remove(messageId);
      removeMessageNotification(messageId);
    }
});