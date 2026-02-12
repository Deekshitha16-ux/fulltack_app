console.log("this is js working")
var firebaseConfig = {
  apiKey: "AIzaSyATGHf_QTNkMxA0_FdZu8rGIBUV_gGVsV8",
  authDomain: "trial1-17777.firebaseapp.com",
  projectId: "trial1-17777",
  storageBucket: "trial1-17777.firebasestorage.app",
  messagingSenderId: "321262160614",
  appId: "1:321262160614:web:8f884e57b6e7de89c30927",
  measurementId: "G-56PXDZZ528"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const database = firebase.database()

function registor(){
     email = document.getElementById('email').value
    password = document.getElementById('passcode').value
    if(validate_email(email)==false  || validate_password(passcode)==false){ 
        alert("Email or Password is incorrect")
        return
    }
    auth.createUserWithEmailAndPassword(email,password)
    .then(function(){
        var user = auth.currentUser
        var database_ref = database.ref()
        var user_data = {
        email: email,
        password: password,
        last_login : Date.now()
        }
        database_ref.child('users/' + user.uid).update(user_data)   
        alert("User signed up")
    })
     .cath(function(error){
        var error_code = error.code
        var error_message = error.message
        alert(error_message)
    })
}


function login(){
    email = document.getElementById('email').value
    password = document.getElementById('passcode').value
    if(validate_email(email)==false  || validate_password(passcode)==false){ 
        alert("Email or Password is incorrect")
        return
    }
    auth.signInWithEmailAndPassword(email,password)
    .then(function(){
        var user = auth.currentUser
        var database_ref = database.ref()
        var user_data = {
            last_login : Date.now()
        }
        database_ref.child('users/' + user.uid).update(user_data)   
        alert("User Logged In")
    })
    .cath(function(error){
        var error_code = error.code
        var error_message = error.message
        alert(error_message)
    })
}
function validate_email(email){
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if(expression.test(email)==true){
        return true
    } else {
        return false
    }
    }
     function validate_password(passcode){
        if(passcode < 6){
            return false
        } else {
            true
        }
     }

     function validate_field(field){
        if(field == null){
            return false
        }
        if(field.length <= 0){
            return false
        } else {
            return true
        }
    }
