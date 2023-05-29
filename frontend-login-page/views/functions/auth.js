const form = document.getElementById("myForm");

form.addEventListener("submit", function(event) {
  event.preventDefault(); 
  
  //Authentication
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`http://localhost:3000/api/login/${email}/${password}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      if(response.status === 404){
        swal("Error!", "User not found!", "error");
      } else if(response.status === 401){
        swal("Error!", "Incorrect password!", "error");
      }
    }
  })
  .then(data => {
    if(!data) return
      //store cookie
      var date = new Date();
      date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
      var expires = "expires=" + date.toUTCString();
      document.cookie = `email=${email}; expires=${expires}; path=/`
      document.cookie = `username=${data.username}; expires=${expires}; path=/`
      document.cookie = `password=${password}; expires=${expires}; path=/`
      document.cookie = `loggedIn=true; expires=${expires}; path=/`

      swal({
        title: "Success!",
        text: `Welcome ${data.username}! You have logged in successfully!\nYou will be redirected in a few seconds.`,
        type: "success",
        closeOnEsc: true,
        closeOnClickOutside: false,
        timer: 3000
      })
      setTimeout(() => {
        const elements = document.querySelectorAll(".login-card")
        const elementsO = document.querySelectorAll(".after-stuff")

        elements.forEach(function(element) {
          element.style.display = "none";
        });

        elementsO.forEach(function(element) {
          element.style.display = "block";
          document.getElementById('logo').innerHTML = `Welcome ${data.username}`
          document.getElementById('logoutButton').style.display = 'block';
        });
        
      }, 3000); 
  })
  .catch(error => {
    console.error('Error:', error);
  });

});