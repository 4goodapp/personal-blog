var selectedCategories = [];
Template.adminEditPost.rendered = function() {
	$('.navbar li.active').removeClass('active');
	$('.navbar li.admin').addClass('active');
	$('#title').focus();
	tinymce.init({
    	selector: "#excerpt",
    	skin: "light",
    	height: 200,
    	menubar : false,
    	statusbar : false,
    	plugins: "code",
    	toolbar: "undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent strikethrough underline subscript superscript blockquote code"
 	});
 	tinymce.init({
    	selector: "#content",
    	skin: "light",
    	height: 400,
    	menubar : false,
    	statusbar : false,
    	plugins: "link, image, code, table, hr",
    	toolbar: "undo redo | formatselect fontselect fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent strikethrough underline subscript superscript table  blockquote code hr link image"
 	});

 	var postId = Session.get('currentEditPostId');
 	var post = Posts.findOne(postId);

 	Meteor.setTimeout(function(){
 		$('#title').val(post.title);

 		var date;
 		var jsDate = new Date(post.submitted);
 		date = jsDate.getDate() + '.' + (jsDate.getMonth() + 1) + '.' + jsDate.getFullYear() + ' ' + jsDate.getHours() + ':' + jsDate.getMinutes();
 		$('#date').val(date);

 		tinyMCE.get('excerpt').setContent(post.shortContent);
		tinyMCE.get('content').setContent(post.content);

 		$("#ddlCategories").val(post.categories).chosen({
 			max_selected_options: 3,
 			width: "100%",
 			search_contains: true,
 			single_backstroke_delete: false
 		});

 		selectedCategories = post.categories;

 		$('#ddlCategories').chosen().change(function(event){
			if(event.target == this){
		    	selectedCategories = $(this).val();
			}
		});
		$('#date').datetimepicker({
	        dateFormat: 'dd.mm.yy',
	        autoclose: true
	       });
 	}, 200);
}

Template.adminEditPost.events({
	'click #btnSubmit': function (event) {
		event.preventDefault();
		var title = $('#title').val();

		var date = $('#date').val();
		var dateSplit = date.split(' ');
		var dateNumbers = dateSplit[0].split('.');
		date = new Date(dateNumbers[1] + '/' + dateNumbers[0] + '/' + dateNumbers[2] + ' ' + dateSplit[1]);
		var categories = '';
		if(selectedCategories.hasOwnProperty('join')) {
			categories = selectedCategories.join(',');
		}
		else {
			categories = selectedCategories;
		}
		var shortContent = tinyMCE.get('excerpt').getContent();
		var content = tinyMCE.get('content').getContent();

		var post = {
			_id: Session.get('currentEditPostId'),
			title: title,
			submitted: date.getTime(),
			categories: categories,
			shortContent: shortContent,
			content: content
		};
		editPost(post);	
		Router.go('adminPosts');
	 }
});

Template.adminEditPost.helpers({
	author: function() {
	    return Meteor.user().profile.name;
  	},
  	categories: function() {
    return Categories.find({});
  }
});


function editPost(post) {
	Meteor.call('editPost', post, function (error, id){
		if(error){
			throwError(error.reason);
		}
	});
}
