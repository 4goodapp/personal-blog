var post = '';
var totalPages = '';

Template.postPage.rendered = function() {
    $('.navbar li.active').removeClass('active');
  }


Template.postPage.helpers({
  currentPost: function() {
  	post = Posts.findOne(Session.get('currentPostId'));
    totalPages = Math.round(Number(post.commentsCount/10));
    return post;
  },
  submittedText: function() {
    return timeConverter(new Date(this.submitted));
  },
  currentPostCategories: function() {
  	return Categories.find({_id: {$in: post.categories}});
  },
  comments: function() {
    return Comments.find({postId: this._id}, {sort: {submitted:-1}});
  },
  isNotFirstPage: function() {
    return !(Session.get('currentCommentsPage') == 0);
  },
  isNotLastPage: function() {
    return !(Session.get('currentCommentsPage') == totalPages);
  }
});

Template.postPage.events({
  'click #commentsCount':function(e,tmpl) {
      e.preventDefault();
      $('html, body').animate({
          scrollTop: $("#comments").offset().top - 72
      }, 300);
   },
   'click .previous-page': function(e) {
    e.preventDefault();
    var currentCommentsPage = totalPages;
    if(Session.get('currentCommentsPage') < totalPages)
    {
      currentCommentsPage = Session.get('currentCommentsPage')+1;
    }
    Session.set('currentCommentsPage', currentCommentsPage);
  },
  'click .next-page': function(e) {
    e.preventDefault();
    var currentCommentsPage = 0;
    if(Session.get('currentCommentsPage') > 1)
    {
      currentCommentsPage = Session.get('currentCommentsPage')-1;
    }
    Session.set('currentCommentsPage', currentCommentsPage);
  }
});