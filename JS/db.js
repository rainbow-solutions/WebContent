document.write("<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js'></script>");
document.write("<script type='text/javascript' src='http://static.stackmob.com/js/stackmob-js-0.8.0-bundled-min.js'></script>");

function dbinit(){
	StackMob.init({
	    appName: "isports_10",
	    clientSubdomain: "infoedvinfotechcom",
	    publicKey: "3949c6ad-30d1-4e77-8b10-a426d38cd21e",
	    apiVersion: 0
	});
}