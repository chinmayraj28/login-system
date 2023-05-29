var logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", function(){

    swal({
        title: "Logged Out!",
        text: `Successfully logged out!\nYou will be redirected in a few seconds.`,
        type: "error",
        closeOnEsc: true,
        closeOnClickOutside: false,
        timer: 3000
    })

    setTimeout(() => {      
        var date = new Date();
        date.setTime(date.getTime() - (24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = `email=; expires=${expires}; path=/`
        document.cookie = `username=; expires=${expires}; path=/`
        document.cookie = `password=; expires=${expires}; path=/`
        document.cookie = `loggedIn=; expires=${expires}; path=/`
        window.location.href = "../index.html"
    }, 3000); 
});