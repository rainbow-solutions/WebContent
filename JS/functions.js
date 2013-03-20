function login(result){
	if (result == true) window.location = "main.html";
	else
		document.getElementById("LoginError").style.visibility = "visible";
}

function register(){
	window.location = "register.html";
}