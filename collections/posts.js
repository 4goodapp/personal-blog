Posts = new Meteor.Collection('posts');

Posts.allow({
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
    getPostsCount: function () {
        return Posts.find().count();
    },
    insertPost: function (post) {
    	var user = Meteor.user();
    	if (!user){
            throw new Meteor.Error(401, "You need to login to add a new post");
        }
        if(post.title == '') {
            throw new Meteor.Error(422, "You need to add a title");
        }

        if(post.submitted == '') {
            post.submitted = new Date().getTime();
        }

        if(post.shortContent == '') {
            throw new Meteor.Error(422, "You need to add an excerpt");
        }

        if(post.content == '') {
            throw new Meteor.Error(422, "You need to add the content");
        }
		var newId =  Posts.insert({
    				      title: post.title,
    				      author: user.profile.name,
    				      userId: user._id,
    				      shortContent: post.shortContent,
    				      content: post.content,
    				      submitted: post.submitted,
                          categories: post.categories,
    				      commentsCount: 0
    				    });
        //update the count of each category of this post
        if(newId != null && post.categories != null) {
            for(var i = 0; i < post.categories.length; i++) {
              Categories.update(post.categories[i], {$inc: {count: 1}});
            }
        }
        return newId;
    },
    editPost: function (post) {
        var user = Meteor.user();
        if (!user){
            throw new Meteor.Error(401, "You need to login to add new posts");
        }
        if(post._id == '') {
            throw new Meteor.Error(422, "You need to edit an existing post");
        }
        if(post.title == '') {
            throw new Meteor.Error(422, "You need to add a title");
        }

        if(post.submitted == '') {
            post.submitted = new Date().getTime();
        }

        if(post.shortContent == '') {
            throw new Meteor.Error(422, "You need to add an excerpt");
        }

        if(post.content == '') {
            throw new Meteor.Error(422, "You need to add the content");
        }

        var currentPost = Posts.findOne(post._id);
        if(currentPost) {
            console.log(currentPost.categories + ' == ' + post.categories + '? ' + currentPost.categories != post.categories);
            if(currentPost.categories != post.categories) {
                //decrease the count of each category of the currentPost
                if(currentPost.categories != null) {
                    for(var i = 0; i < currentPost.categories.length; i++) {
                      Categories.update(currentPost.categories[i], {$inc: {count: -1}});
                    }
                }
                //increase the count of the new categories
                if(post.categories != null){
                    for(var i = 0; i < post.categories.length; i++) {
                      Categories.update(post.categories[i], {$inc: {count: 1}});
                    }
                }
            }

            Posts.update(currentPost._id, {$set: {  
                                                    title: post.title, 
                                                    submitted: post.submitted,
                                                    shortContent: post.shortContent,
                                                    content: post.content,
                                                    categories: post.categories
                                                }
                                          });
        }
    },
    removePost: function (postId) {
    	var user = Meteor.user();
    	if (!user){
            throw new Meteor.Error(401, "You need to login to remove a post");
        }
    	var post = Posts.findOne(postId);
    	Posts.remove(postId);
        //update the count of each category of this post
        for(var i = 0; i < post.categories.length; i++) {
          Categories.update(post.categories[i], {$inc: {count: -1}});
        }
    }
});