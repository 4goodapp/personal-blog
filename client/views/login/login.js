Template.login.rendered = function() {
  $('.navbar li.active').removeClass('active');
  $('#username').focus();
}

Template.login.events({
    'submit #login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var username = t.find('#username').value
        , password = t.find('#password').value;

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(username, password, function(err){
        if (err)
        {
          // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed. 

        }
        else
        {
            Router.go('/')
        }
      });
         return false; 
      },
      'click #btn-cancel' : function(e){
        e.preventDefault();     
        Router.go('/')
      }
});

