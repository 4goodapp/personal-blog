Template.category.rendered = function() {
    $('.navbar li.active').removeClass('active');
 }

Template.category.helpers({
	postsInCategory: function() {
        var categoryId = Session.get('currentCategoryId');
        return Posts.find({categories: {$in:[categoryId]}}, {sort: {submitted: -1}});
    },
	isNotFirstPage: function() {
		return !(Session.get('currentPostsInCategoryPage') == 0);
	},
	isNotLastPage: function() {
		var totalPages = Session.getNonReactive('totalPagesCategory');
		return !(Session.get('currentPostsInCategoryPage') == totalPages);
	}
});

Template.category.events({
	'click .previous-page': function(e) {
		e.preventDefault();	
		var totalPages = Session.getNonReactive('totalPagesCategory');
		var currentPostsInCategoryPage = totalPages;
		if(Session.get('currentPostsInCategoryPage') < totalPages)
		{
		  currentPostsInCategoryPage = Session.get('currentPostsInCategoryPage')+1;
		}
		Session.set('currentPostsInCategoryPage', currentPostsInCategoryPage);
	},
	'click .next-page': function(e) {
		e.preventDefault();
		var currentPostsInCategoryPage = 0;
		if(Session.get('currentPostsInCategoryPage') > 1)
		{
		  currentPostsInCategoryPage = Session.get('currentPostsInCategoryPage')-1;
		}
		Session.set('currentPostsInCategoryPage', currentPostsInCategoryPage);
	}
});