// sign
var signName = document.getElementById("Name");
var signEmail = document.getElementById("Email");
var signPassword = document.getElementById("Password");
// login
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
//  url
var path = location.pathname.split('/');
var pathUrl = '';
for (var i = 0; i < path.length - 1; i++) {
    pathUrl += '/' + path[i];
}
console.log(pathUrl);

// to say welcome in home page
var username = localStorage.getItem('userName')
if (username) {
    document.getElementById('userName').innerHTML =  username
}
var signContainer = [];

if (localStorage.getItem("user") !== null) {
    signContainer = JSON.parse(localStorage.getItem("user"));
}

// sign up
function signUp() {
    var signUp = {
        name: signName.value,
        email: signEmail.value,
        password: signPassword.value
    }
    // check empety
    if (isEmpty() == false) {
          
        document.getElementById("exist").innerHTML = '<span class="text-danger ">All inputs is required</span>';
        clearFormSign();
        return false;
    }
    // check Email
    if (isEmailExist() == false) {
        document.getElementById("exist").innerHTML = '<span class="text-danger ">Email Already Exists</span>';
        // clearFormSign() ;
        return false;
    }
    // add new user
    else {
        console.log(signContainer.push(signUp));
        console.log(signContainer.length);
        
        localStorage.setItem("user", JSON.stringify(signContainer));
        document.getElementById("exist").innerHTML =  '<span class="text-success m-3">Success</span>';
        clearFormSign();
    }

}

// check empty sign
function isEmpty() {
    if (signName.value == "" || signEmail.value == "" || signPassword.value == "") {
        return false;
    }
    else {
        return true;
    }
}

// check exist mail 
function isEmailExist() {
    for (var i = 0; i < signContainer.length; i++) {
        if (signContainer[i].email == signEmail.value) {
            return false;
        }
    }
}

// clear
function clearFormSign() {
    signName.value = null;
    signEmail.value = null;
    signPassword.value = null;
}
function clearFormLogin() {
    loginEmail.value = null;
    loginPassword.value = null;
}

// check empty login
function isEmptyLogin() {
    if (loginEmail.value == "" || loginPassword.value == "") {
        return false;
    }
    else {
        return true;
    }
}

// login
function login() {
    if (isEmptyLogin() == false) {
        document.getElementById("correct").innerHTML ='<span class="text-danger">All inputs is required</span>';
        clearFormLogin();
        return false;
    }
    console.log("Go");
    console.log(signContainer.length);

    var logPass = loginPassword.value;
    var logEmail = loginEmail.value;
    if(signContainer.length == 0){
        document.getElementById("correct").innerHTML = `<span class="text-danger">Dont Have an account ,please Sign up</span>`;

    }
    for (var i = 0; i < signContainer.length; i++) {
        console.log("Entered");
        if (signContainer[i].email == logEmail && signContainer[i].password == logPass) {
            console.log("Entered if");

            localStorage.setItem("userName", signContainer[i].name);
            window.location.href = 'login.html';
        }
        else {
            console.log("incrroct");

            document.getElementById("correct").innerHTML = `<span class="text-danger">Incorrect Email or Password</span>`;
        }
    }
}

function logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('userName')
}