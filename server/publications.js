Meteor.publish('posts', function(page) {
    var skip = page * 6;
    return Posts.find({}, {sort: {submitted: -1}, skip: skip, limit: 6});
});

Meteor.publish('postsInCategory', function(categoryId, page) {
    var skip = page * 12;
    return Posts.find({categories: {$in:[categoryId]}}, {sort: {submitted: -1}, skip: skip, limit: 12});
});


Meteor.publish('singlePost', function(id) {
  return id && Posts.find(id);
});

Meteor.publish('categories', function() {
  return Categories.find({}, {sort: {count:-1}});
});

Meteor.publish('comments', function(postId, page) {
    var skip = page * 10;
    return Comments.find({postId: postId}, {sort: {submitted: -1}, skip: skip, limit: 10});
});

Meteor.publish('notifications', function() {
  return Notifications.find();
});

Meteor.publish('adminPosts', function(page) {
    var skip = page * 20;
    return Posts.find({}, {sort: {submitted: -1}, skip: skip, limit: 20});
});

Meteor.publish('messages', function(page) {
    var skip = page * 10;
    return Messages.find({}, {sort: {submitted: -1}, skip: skip, limit: 10});
});

Meteor.publish('singleMessage', function(id) {
  return id && Messages.find(id);
});

















// var Future = Npm.require('fibers/future');

// Meteor.publish('postsWithLatency', function(page){
// 	var future = new Future();
// 	console.log('about to setTimeout and publish');
// 	Meteor.setTimeout(function(){
// 		console.log('in setTimeout');
// 		var skip = page * 6;
// 		var cursor = Posts.find({}, {sort: {submitted: -1}, skip: skip, limit: 6});
// 		future.return(cursor);
// 	}, 2000);

// 	return future.wait();
// });