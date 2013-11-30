unixTimeConverter = function(UNIX_timestamp){
 var a = new Date(UNIX_timestamp*1000);
 var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
     var year = a.getFullYear();
     var month = months[a.getMonth()];
     var date = a.getDate();
     var hour = a.getHours();
     var min = a.getMinutes();
     var sec = a.getSeconds();
     var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
     return time;
};

timeConverter = function(date){
 var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
     var year = date.getFullYear();
     var month = months[date.getMonth()];
     var day = date.getDate().toString();
     if(day.length == 1) { day = '0' + day; }
     var hour = date.getHours().toString();
     if(hour.length == 1) { hour = '0' + hour; }
     var min = date.getMinutes().toString();
     if(min.length == 1) { min = '0' + min; }
     //var sec = date.getSeconds().toString();
     //if(sec.length == 1) { sec = '0' + sec; }
     //var time = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
     var time = day + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
     return time;
 };

validateEmail = function(email){        
    var emailPattern = /^[a-zA-Z0-9._]+[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;  
    return emailPattern.test(email);   
};

timeAgo = function(date) {
     var now = new Date();
     var timeDifference = new Date(now - date);
     timeDifference = timeDifference / 1000 / 60;
     if(timeDifference > 24 * 60 * 31 * 365) {
          var years = Math.round(timeDifference/24*60*31*365);
          var text = '';
          if(years > 1) {
            text = ' years ago';
          }
          else
          {
            text = ' year ago';
          }
          return years + text;
     }
     else if(timeDifference > 24 * 60 * 31) {
          var months = Math.round(timeDifference/24*60*31);
          var text = '';
          if(months > 1) {
            text = ' months ago';
          }
          else
          {
            text = ' month ago';
          }
          return months + text;
     }
     else if(timeDifference > 24 * 60) {
          var days = Math.round(timeDifference/24*60);
          var text = '';
          if(days > 1) {
            text = ' days ago';
          }
          else
          {
            text = ' day ago';
          }
          return days + text;
     }
     else if(timeDifference > 60)
     {
          var hours = Math.round(timeDifference/60);
          var text = '';
          if(hours > 1) {
            text = ' hours ago';
          }
          else
          {
            text = ' hour ago';
          }
          return hours + text;
     }
     else if(timeDifference > 1 && timeDifference < 60)
     {
          var minutes = Math.round(timeDifference);
          var text = '';
          if(minutes > 1) {
            text = ' minutes ago';
          }
          else
          {
            text = ' minute ago';
          }
          return minutes + text;
     }
     else
     {
          var seconds = Math.round(timeDifference*60);
          var text = '';
          if(seconds > 1) {
            text = ' seconds ago';
          }
          else
          {
            text = ' second ago';
          }
          return seconds + text;
     }
};