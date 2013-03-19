document.write("<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js'></script>");
document.write("<script type='text/javascript' src='http://static.stackmob.com/js/stackmob-js-0.8.0-bundled-min.js'></script>");
document.write("<script type='text/javascript' src='http://static.stackmob.com/js/backbone-0.9.2-min.js'></script>");

function dbinit(){
	StackMob.init({
	    appName: "isports_10",
	    clientSubdomain: "infoedvinfotechcom",
	    publicKey: "3949c6ad-30d1-4e77-8b10-a426d38cd21e",
	    apiVersion: 0
	});
}

function create_user(username, password){
	var User = StackMob.Model.extend({ schemaName: 'user' });
	var user = new User({ username: username ,password: password });
	user.create();
}

function dblogin(username, password, callback){
	var user = new StackMob.User({ username: username ,password: password });
	user.login(false, {
	success: function(model) {
	console.debug("Login Done:");
	callback(true);
	},
	error: function(model, response) {
	        console.debug(response);
	        callback(false);
	    }
	});
}

function isAdmin(username, callback){
	var user = new StackMob.User({ username: username});
	user.fetch({
	success: function(model) {
	if(model.get('administrator') == true){
		console.debug('isAdmin');
		callback(true);
		}
	else {
		console.debug('noAdmin');
		callback(false);
	}
	},
	error: function(model, response) {
	        console.debug(response);
	    }
	});
}

function isuserloggedin(callback){
	if (StackMob.isLoggedIn())
		callback(true);
	else 
		callback(false);
	}

function logout(callback){
	var user = new StackMob.User({ username: StackMob.getLoggedInUser()});
	user.logout({
	success: function(model) {
	        callback(true);
	    },
	error: function(model, response){
		console.debug(response);
		callback(false);
	}
	});
	}

function username(){
	if (StackMob.isLoggedIn()){
	var user = new StackMob.User({ username: StackMob.getLoggedInUser()});
	user.fetch({
		success: function(model){
			alert(model.get("username"));
			}}); 
		}
		else alert("No user login");
	}