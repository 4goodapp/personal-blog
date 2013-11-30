Template.messagesList.helpers({
  messages: function() {
    return Messages.find({}, {sort: {submitted:-1}});
  },
  isNotFirstPage: function() {
    return !(Session.get('currentMessagesPage') == 0);
  },
  isNotLastPage: function() {
    var totalPages = Session.getNonReactive('totalPagesMessages');
    return !(Session.get('currentMessagesPage') == totalPages);
  }
});

Template.messagesList.events({
   'click .previous-page': function(e) {
    e.preventDefault();
    var totalPages = Session.getNonReactive('totalPagesMessages');
    var currentMessagesPage = totalPages;
    if(Session.get('currentMessagesPage') < totalPages)
    {
      currentMessagesPage = Session.get('currentMessagesPage')+1;
    }
    Session.set('currentMessagesPage', currentMessagesPage);
  },
  'click .next-page': function(e) {
    e.preventDefault();
    var currentMessagesPage = 0;
    if(Session.get('currentMessagesPage') > 1)
    {
      currentMessagesPage = Session.get('currentMessagesPage')-1;
    }
    Session.set('currentMessagesPage', currentMessagesPage);
  }
});