let username;
let loggedIn;

var cookies = document.cookie.split(";");
for (var i = 0; i < cookies.length; i++) {
  var cookie = cookies[i].trim();
  var cookieParts = cookie.split("=");
  var cookieName = cookieParts[0];
  var cookieValue = cookieParts[1];

  if(cookieName === 'loggedIn'){
    loggedIn = cookieValue
  }

  if(cookieName === 'username'){
    username = cookieValue
  }
}

if(loggedIn){
  window.location.href = "/frontend-login-page/views/site/html/index.html";
}