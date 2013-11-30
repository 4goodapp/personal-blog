Categories = new Meteor.Collection('categories');

Categories.allow({
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