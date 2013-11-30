Session.set('currentPostsPage', 0);

Template.postsList.rendered = function() {
    $('.navbar li.active').removeClass('active');
    $('.navbar li.home').addClass('active');
  }

Template.postsList.helpers({
	posts: function() {
    return Posts.find({}, {sort: {submitted: -1}})
  },
  isNotFirstPage: function() {
    return !(Session.get('currentPostsPage') == 0);
  },
  isNotLastPage: function() {
    var totalPages = Math.round(Number(Session.getNonReactive('postsCount')/6));
    return !(Session.get('currentPostsPage') == totalPages);
  }
});

Template.postsList.events({
  'click .previous-page': function(e) {
    e.preventDefault();
    var totalPages = Math.round(Number(Session.getNonReactive('postsCount')/6));
    var currentPostsPage = totalPages;
    if(Session.get('currentPostsPage') < totalPages)
    {
      currentPostsPage = Session.get('currentPostsPage')+1;
    }
    Session.set('currentPostsPage', currentPostsPage);
  },
  'click .next-page': function(e) {
    e.preventDefault();
    var currentPostsPage = 0;
    if(Session.get('currentPostsPage') > 1)
    {
      currentPostsPage = Session.get('currentPostsPage')-1;
    }
    Session.set('currentPostsPage', currentPostsPage);
  }
});