Session.set('currentAdminPostsPage', 0);

Template.adminPosts.rendered = function() {
	$('.navbar li.active').removeClass('active');
	$('.navbar li.admin').addClass('active');
}

Template.adminPosts.helpers({
	adminPosts: function() {
    return Posts.find({}, {sort: {submitted: -1}})
  },
  isNotFirstPage: function() {
    return !(Session.get('currentAdminPostsPage') == 0);
  },
  isNotLastPage: function() {
    var totalPages = Math.round(Number(Session.getNonReactive('postsCount')/20));
    return !(Session.get('currentAdminPostsPage') == totalPages);
  }
});

Template.adminPosts.events({
  'click .previous-page': function(e) {
    e.preventDefault();
    var totalPages = Math.round(Number(Session.getNonReactive('postsCount')/20));
    var currentAdminPostsPage = totalPages;
    if(Session.get('currentAdminPostsPage') < totalPages)
    {
      currentAdminPostsPage = Session.get('currentAdminPostsPage')+1;
    }
    Session.set('currentAdminPostsPage', currentAdminPostsPage);
    $(window).scrollTop(0);
  },
  'click .next-page': function(e) {
    e.preventDefault();
    var currentAdminPostsPage = 0;
    if(Session.get('currentAdminPostsPage') > 1)
    {
      currentAdminPostsPage = Session.get('currentAdminPostsPage')-1;
    }
    Session.set('currentAdminPostsPage', currentAdminPostsPage);
    $(window).scrollTop(0);
  }
});
