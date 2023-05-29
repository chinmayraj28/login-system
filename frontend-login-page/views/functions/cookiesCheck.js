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
  const elements = document.querySelectorAll(".login-card")
    const elementsO = document.querySelectorAll(".after-stuff")

    elements.forEach(function(element) {
      element.style.display = "none";
    });

    elementsO.forEach(function(element) {
      element.style.display = "block";
      document.getElementById('logo').innerHTML = `Welcome back ${username}!`
      document.getElementById('logoutButton').style.display = 'block';
    });
}

