var firstPostId = '';
var catIds = [];

// Fixture data 

//INSERT CATEGORIES
if(Categories.find().count() === 0)
{
  //the category name should not have more than 15 chars, otherwise the sidebar categories
  //section has the layout messed up. If you really want to have categories with longer names
  //set 8 columns for the left side and 3 columns for the right side in the masterPage template
  var catNames = ['javascript', 'meteor', 'css', 'general', 'web development', 'app', 'review', 'interview', 'node', 'mongo', 'nosql'];
  for(var i = 0; i <= catNames.length - 1; i++)
  {
    var catId = Categories.insert({
                  name: catNames[i],
                  count: 0
                });
    catIds.push(catId);
  }
}

//INSERT POSTS
if (Posts.find().count() === 0) { 
  var now = new Date().getTime();
  var userId = '';
  var user = '';
  if(Meteor.users.find().count() === 0) {
    Accounts.createUser({username: "admin", password : "admin", profile: { name: 'Mr. Admin' }});
  }
  user = Meteor.users.findOne();
  

  for (var i = 1; i <= 110; i++) {
    //let posts have between 1 and 3 categories
    var randomNumberOfCats = Math.floor((Math.random()*3)+1);
    var selectedCategoryIds = [];
    //add random categories
    for(var j = 1; j <= randomNumberOfCats; j++)
    {
      var random = Math.floor((Math.random()*catIds.length-1));
      //if the categorie has already been added, don't added anymore
      if(selectedCategoryIds.indexOf(catIds[random]) < 0) {
        selectedCategoryIds.push(catIds[random]);
      }
    }
    //get the first post id so we can add comments to it later
    if(i==1){
      firstPostId = Posts.insert({
        title: 'Long title post, with a number at the end #' + i,
        author: user.profile.name,
        userId: user._id,
        categories: selectedCategoryIds,
        shortContent: 'Science cuts two ways, of course; its products can be used for both good and evil. But there\'s no turning back from science. The early warnings about technological dangers also come from science.',
        content: '<img src="http://placehold.it/900x300" class="img-responsive"> <hr> <p class="lead">Science cuts two ways, of course; its products can be used for both good and evil. But there\'s no turning back from science. The early warnings about technological dangers also come from science.</p> <p>You know, being a test pilot isn\'t always the healthiest business in the world.</p> <p>Cookie jelly beans soufflé icing. Gummi bears tootsie roll powder chupa chups cheesecake chocolate jelly-o lollipop lollipop. Halvah applicake chupa chups. Marshmallow chocolate jujubes icing lollipop gummi bears chupa chups pudding bonbon. Jelly beans jelly soufflé jujubes. Sesame snaps lollipop icing donut lemon drops soufflé.</p> <p>Donut caramels gingerbread. Sweet roll macaroon pastry cotton candy oat cake sesame snaps biscuit lemon drops dessert. Candy canes carrot cake danish carrot cake soufflé jelly chocolate cake muffin. Topping brownie donut. Oat cake marzipan dragée cheesecake. Donut chocolate cake jujubes tart dragée toffee.</p> <p>Tilefish electric knifefish salmon shark southern Dolly Varden. Pacific argentine tope golden shiner ilisha barreleye loosejaw catla, dogteeth tetra catfish tenpounder nase scup Ragfish brotula." Codlet brook lamprey pleco, Japanese eel convict cichlid titan triggerfish, plownose chimaera topminnow Black scalyfin. Walleye pollock, blue shark Sacramento blackfish prickleback airbreathing catfish yellowfin cutthroat trout, goby southern sandfish. North Pacific daggertooth dorab cepalin weever flying gurnard.</p> <p><strong>Placeholder text by:</strong></p> <ul> <li><a href="http://spaceipsum.com/">Space Ipsum</a></li> <li><a href="http://cupcakeipsum.com/">Cupcake Ipsum</a></li> <li><a href="http://tunaipsum.com/">Tuna Ipsum</a></li> </ul>',
        submitted: now - i * 3600 * 1000,
        commentsCount: 30
      });
    }
    else{
      Posts.insert({
        title: 'Long title post, with a number at the end #' + i,
        author: user.profile.name,
        userId: user._id,
        categories: selectedCategoryIds,
        shortContent: 'Science cuts two ways, of course; its products can be used for both good and evil. But there\'s no turning back from science. The early warnings about technological dangers also come from science.',
        content: '<img src="http://placehold.it/900x300" class="img-responsive"> <hr> <p class="lead">Science cuts two ways, of course; its products can be used for both good and evil. But there\'s no turning back from science. The early warnings about technological dangers also come from science.</p> <p>You know, being a test pilot isn\'t always the healthiest business in the world.</p> <p>Cookie jelly beans soufflé icing. Gummi bears tootsie roll powder chupa chups cheesecake chocolate jelly-o lollipop lollipop. Halvah applicake chupa chups. Marshmallow chocolate jujubes icing lollipop gummi bears chupa chups pudding bonbon. Jelly beans jelly soufflé jujubes. Sesame snaps lollipop icing donut lemon drops soufflé.</p> <p>Donut caramels gingerbread. Sweet roll macaroon pastry cotton candy oat cake sesame snaps biscuit lemon drops dessert. Candy canes carrot cake danish carrot cake soufflé jelly chocolate cake muffin. Topping brownie donut. Oat cake marzipan dragée cheesecake. Donut chocolate cake jujubes tart dragée toffee.</p> <p>Tilefish electric knifefish salmon shark southern Dolly Varden. Pacific argentine tope golden shiner ilisha barreleye loosejaw catla, dogteeth tetra catfish tenpounder nase scup Ragfish brotula." Codlet brook lamprey pleco, Japanese eel convict cichlid titan triggerfish, plownose chimaera topminnow Black scalyfin. Walleye pollock, blue shark Sacramento blackfish prickleback airbreathing catfish yellowfin cutthroat trout, goby southern sandfish. North Pacific daggertooth dorab cepalin weever flying gurnard.</p> <p><strong>Placeholder text by:</strong></p> <ul> <li><a href="http://spaceipsum.com/">Space Ipsum</a></li> <li><a href="http://cupcakeipsum.com/">Cupcake Ipsum</a></li> <li><a href="http://tunaipsum.com/">Tuna Ipsum</a></li> </ul>',
        submitted: now - i * 3600 * 1000,
        commentsCount: 0
      });
    }
    
    //update the count of each category of this post
    for(var k = 1; k <= selectedCategoryIds.length; k++) {
      Categories.update(selectedCategoryIds[k], {$inc: {count: 1}});
    }
  }

  //INSERT COMMENTS
  for (var c = 1; c <= 30; c++) {
    Comments.insert({
      postId: firstPostId,
      author: 'Mike',
      body: 'Nice post! #' + c,
      submitted: now - c * 3600 * 1000
    });
  }

}