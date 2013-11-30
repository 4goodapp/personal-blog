Template.sidebarCategories.helpers({
	firstColumn: function() {
    var cats = Categories.find().fetch();
    return cats.slice(0,4);
  },
  secondColumn: function() {
    var cats = Categories.find().fetch();
    return cats.slice(5,9);
  }
});