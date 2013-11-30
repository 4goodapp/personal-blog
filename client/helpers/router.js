Router.configure({
  layoutTemplate: 'masterPage'
});

Router.map(function () {
  this.route('postsList', {
    path: '/',
    template: 'postsList',
    before: function () {
      clearAllErrors();
      var handle = Meteor.subscribe("posts", Session.get('currentPostsPage'));
      if(handle.ready()){
        NProgress.done();
      }
      else {
        NProgress.start();
        this.stop();
      }
    }
  });

  this.route('post', {
    path: '/post/:_id',
    template: 'postPage',
    before: function () {
      clearAllErrors();
      Session.set('currentPostId', this.params._id);
      var handlePost = Meteor.subscribe('singlePost', this.params._id);
      var handleComments = Meteor.subscribe('comments', this.params._id, Session.get('currentCommentsPage')); 
      if(handlePost.ready() && handleComments.ready()){
        NProgress.done();
      }
      else {
        NProgress.start();
        this.stop();
      }
    },
    load: function(){
      $(window).scrollTop(0);
      Session.set('currentCommentsPage', 0);
    }
  });

  this.route('category', {
    path: '/category/:_name',
    template: 'category',
    before: function () {
      clearAllErrors();
      var page = Session.get('currentPostsInCategoryPage');
      var category = Categories.findOne({name:this.params._name});
      Session.set('currentCategoryId', category._id);
      if(category.count > 12) {
        Session.set('totalPagesCategory', Math.round(Number(category.count/12)));
      }
      else{
        Session.set('totalPagesCategory', 0);
      }
      
      var handle = Meteor.subscribe('postsInCategory', category._id, page);
      if(handle.ready()){
        NProgress.done();
      }
      else {
        NProgress.start();
        this.stop();
      }
    },
    load: function() {
      Session.set('currentPostsInCategoryPage', 0);
    }
  });

  this.route('about', {
    path: '/about',
    template: 'about',
    before: function () {
      clearAllErrors();
    }
  });

  this.route('contact', {
    path: '/contact',
    template: 'contact',
    before: function () {
      clearAllErrors();
    }
  });

  this.route('adminNewPost', {
    path: '/adminNewPost',
    template: 'adminNewPost',
    before: function () {
      clearAllErrors();
      if(!Meteor.user()){
        this.render('login');
        this.stop();
      }
    },
    action: function (){
      this.render();
    }
  });

  this.route('adminEditPost', {
    path: '/adminEditPost/:_id',
    template: 'adminEditPost',
    before: function () {
      clearAllErrors();
      Session.set('currentEditPostId', this.params._id);
      var handlePost = Meteor.subscribe('singlePost', this.params._id);
      if(handlePost.ready()){
        NProgress.done();
      }
      else {
        NProgress.start();
        this.stop();
      }
    },
    load: function(){
      $(window).scrollTop(0);
    }
  });

  this.route('adminPosts', {
    path: '/adminPosts/',
    template: 'adminPosts',
    before: function () {
      clearAllErrors();
      if(!Meteor.user()){
        this.render('login');
        this.stop();
      }
      else {
        var handle = Meteor.subscribe("adminPosts", Session.get('currentAdminPostsPage'));
        if(handle.ready()){
          NProgress.done();
        }
        else {
          NProgress.start();
          this.stop();
        }
      }
    },
    action: function (){
      this.render();
    }
  });

  this.route('adminComments', {
    path: '/adminComments',
    template: 'adminComments',
    before: function () {
      clearAllErrors();
      if(!Meteor.user()){
        this.render('login');
        this.stop();
      }
    },
    action: function (){
      this.render();
    }
  });

  this.route('adminMessages', {
    path: '/adminMessages',
    template: 'messagesList',
    before: function () {
      clearAllErrors();
      var page = Session.get('currentMessagesPage');
      var handle = Meteor.subscribe('messages', page);
      if(handle.ready()){
        var messages = Messages.find();
        if(messages.count > 10) {
          Session.set('totalPagesMessages', Math.round(Number(messages.count/10)));
        }
        else
        {
          Session.set('totalPagesMessages', 0);
        }   
        NProgress.done();
      }
      else {
        NProgress.start();
        this.stop();
      }
    },
    load: function() {
      Session.set('currentMessagesPage', 0);
    }
  });

  this.route('message', {
    path: '/message/:_id',
    template: 'singleMessage',
    before: function () {
      clearAllErrors();
      Session.set('currentMessageId', this.params._id);
      var handle = Meteor.subscribe('singleMessage', this.params._id);
      if(handle.ready()){
        NProgress.done();
      }
      else {
        NProgress.start();
        this.stop();
      }
    },
    load: function(){
      $(window).scrollTop(0);
    }
  });

  this.route('adminAccountSettings', {
    path: '/adminAccountSettings',
    template: 'adminAccountSettings',
    before: function () {
      clearAllErrors();
      if(!Meteor.user()){
        this.render('login');
        this.stop();
      }
    },
    action: function (){
      this.render();
    }
  });

  this.route('login', {
    path: '/login',
    template: 'login',
    before: function () {
      clearAllErrors();
    }
  });
});