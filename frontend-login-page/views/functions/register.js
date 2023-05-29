const form = document.getElementById("myForm2");

form.addEventListener("submit", function(event) {
    event.preventDefault(); 

    const username = document.getElementById("rusername").value;
    const email = document.getElementById("remail").value;
    const password = document.getElementById("password").value;

fetch(`http://localhost:3000/api/createaccount/${email}/${username}/${password}`)
  .then(response => {
      if(response.status === 404){
        swal("Error!", "Email Already Exists! Login Instead!", "error");
      } else if(response.status === 401){
        swal("Error!", "Username Already Exists, Try Another Username!", "error");
      } else if(response.status === 200){
        swal({
          title: "Success!",
          text: `Account Created Successfully!\nYou will be redirected in a few seconds.`,
          type: "success",
          closeOnEsc: true,
          closeOnClickOutside: false,
          timer: 3000
        })
        setTimeout(() => {
          window.location.href = "../views/login.html"
        }, 3000); 
      } else {
        swal("Error!", "Something Went Wrong!", "error");
      }
  })
  .then(data => {
    if(!data) return;
  })
  .catch(error => {
    console.error('Error:', error);
  });
})