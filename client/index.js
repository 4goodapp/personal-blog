Meteor.subscribe('notifications');
Meteor.subscribe('categories');

Template.masterPage.helpers({
	postsCount: function() {
	 	getPostsCount();
	 	return Session.get('postsCount');
  	}
});

Template.masterPage.events({
  'click #logout': function(e) {
    	e.preventDefault();
    	Meteor.logout();
    	Router.go('/');
   },
   'click #add-post': function(e) {
    	e.preventDefault();
    	addPost();
   },
   'click #remove-post': function(e) {
    	e.preventDefault();
    	removePost();
   }
});

Template.masterPage.rendered = function() {
    //the color of the sidebar archive badge is set to match the item's colors
    var sidebarItem = $('.sidebar.list-group-item').first();
	var badge = sidebarItem.find('.sidebar.badge');
	sidebarItem.hover(
		function() {
			badge.css('background-color', '#FFFFFF');
			badge.css('color', '#ed1f24');
		},
		function() {
			badge.css('background-color', '#555555');
			badge.css('color', '#FFFFFF');
		}
	);
	//update the posts count if posts are added or removed
	Posts.find().observe({
	    added: getPostsCount,
	    removed: getPostsCount
	});
}

//set the posts count in a session variable
function getPostsCount() {
	Meteor.call('getPostsCount', function (err, count) {
		Session.set('postsCount', count);
    });
}




