// Black box entity User
function User(i, l, p){
	var id=i, login=l, password=p;

	function id() {
		return id;
	}
	function login() {
		return login;
	}
	function password() {
		return text;
	}

	return {
		getId:id,
		getLogin:login,
		setPassword:password
	}
}