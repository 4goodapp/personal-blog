######################################
# Personal blog platform             #
######################################
# Author: Lorin Bute                 #
# Twitter: www.twitter.com/LorinBute #
# Release date: 1st of December 2013 #
######################################

I wanted a simple blog to write about software development but I wanted full control over it so I built my own using Meteor. It is not finished yet but it's functional now. I also built it so I can learn Meteor and I think it's a good project to check if you are learning Meteor as well.

I'm using: bootstrap 3, iron-router, font-awesome, chosen, livestamp, moment and tinymce.

When you run the app, it seeds some posts, comments and categories. You can find the seeding information in /server/fixtures.js.

To login with the admin account (username: admin, password: admin) click the copyright symbol in the footer. That will direct you to the login page. To change the account credentials go to /server/fixtures.js and change the account info seed.


Features:
1. List of posts (paginated, 6 per page).
2. Post page (with paginated comments, 10 per page).
3. Posts in categories (tags): posts can be inserted in categories and posts can be filtered by a category.
4. About section.
5. Contact section.
6. Notifications (when someone comments or sends a message through the contact form).
7. Admin section: add new post, edit/delete posts, manage messages, manage comments (comming soon), accounts settings (comming soon).

Missing features (to be implemented soon):
1. Search the whole blog.
2. Search in the admin list of posts (look for a specific post to edit or delete).
3. Search for comments (in the admin section) that contain a specific text or a link.
4. Reply to comments.
5. Threaded comments.
6. Manage comments in the admin section.
7. Manage your account.

I'd like some contributers if anyone is interested. 
Anyone is free to use it no matter the purpose.



